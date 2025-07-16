const router = require("express").Router();
const Post = require("../models/Post");
const verifyToken = require("../middleware/verifyToken");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;

// Cloudinary Configuration
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});

// Multer for File Upload
const storage = multer.memoryStorage();
const upload = multer({ storage });

// -------------------- CREATE POST --------------------
router.post("/", verifyToken, upload.single("file"), async (req, res) => {
    try {
        let photoUrl = "";

        if (req.file) {
            const bufferStr = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;
            const result = await cloudinary.uploader.upload(bufferStr);
            photoUrl = result.secure_url;
        }

        const newPost = new Post({
            username: req.body.username,
            title: req.body.title,
            desc: req.body.desc,
            photo: photoUrl,
        });

        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch (err) {
        res.status(500).json(err);
    }
});

// -------------------- GET ALL POSTS --------------------
router.get("/", async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 });
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json(err);
    }
});

// -------------------- GET SINGLE POST --------------------
router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json(err);
    }
});

// DELETE POST
router.delete("/:id", verifyToken, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.username === req.user.username) {
            await post.deleteOne();
            res.status(200).json("Post deleted successfully!");
        } else {
            res.status(401).json("You can delete only your own post");
        }
    } catch (err) {
        res.status(500).json(err.message);
    }
});

// UPDATE POST
router.put("/:id", verifyToken, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.username === req.user.username) {
            await post.updateOne({ $set: req.body });
            res.status(200).json("Post updated successfully!");
        } else {
            res.status(401).json("You can update only your own post");
        }
    } catch (err) {
        res.status(500).json(err.message);
    }
});

// Add Comment to Post
router.post("/:id/comment", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        post.comments.push({
            username: req.body.username,
            text: req.body.text,
        });
        const updatedPost = await post.save();
        res.status(200).json(updatedPost);
    } catch (err) {
        res.status(500).json(err);
    }
});


// Update Post Rating
router.put("/:id/rating", async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(
            req.params.id,
            { $set: { rating: req.body.rating } },
            { new: true }
        );
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put("/:id/rating", async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(
            req.params.id,
            { $set: { rating: req.body.rating } },
            { new: true }
        );
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json(err);
    }
});




module.exports = router;
