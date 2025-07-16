const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        desc: { type: String, required: true },
        photo: { type: String, default: "" },
        username: { type: String, required: true },
        
        comments: [
            {
                username: String,
                text: String,
                createdAt: { type: Date, default: Date.now }
            }
        ],
        rating: { type: Number, default: 0 }
        
        
    },
  
    
    { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
