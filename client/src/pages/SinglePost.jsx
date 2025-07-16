import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const SinglePost = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const [post, setPost] = useState(null);
    const [comment, setComment] = useState("");

    const [selectedRating, setSelectedRating] = useState(post?.rating || 0);

    useEffect(() => {
        const fetchPost = async () => {
            const res = await axios.get(`http://localhost:5000/api/posts/${id}`);
            setPost(res.data);
        };
        fetchPost();
    }, [id]);

    const handleRating = async (newRating) => {
    setSelectedRating(newRating);
    await axios.put(`http://localhost:5000/api/posts/${id}/rating`, {
        rating: newRating,
    });
    const res = await axios.get(`http://localhost:5000/api/posts/${id}`);
    setPost(res.data);
    navigate("/");
};


    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        await axios.post(`http://localhost:5000/api/posts/${id}/comment`, {
            username: user.username,
            text: comment,
        });
        setComment("");
        const res = await axios.get(`http://localhost:5000/api/posts/${id}`);
        setPost(res.data);
    };

    if (!post) return <h2>Loading...</h2>;

    return (
   <div className="single-post-container">
    <div className="single-post-image">
        <img src={post.photo} alt="Post" />
    </div>

    <div className="single-post-details">
        <h2><span>Tittle: </span> {post.title}</h2>
        <p><span>Description: </span>{post.desc}</p>
        <p>Rating: {post.rating} ⭐</p>

        <div className="rating-stars">
            {[1, 2, 3, 4, 5].map((star) => (
                <span
                    key={star}
                    style={{
                        cursor: "pointer",
                        color: star <= selectedRating ? "orange" : "gray",
                        fontSize: "24px",
                    }}
                    onClick={() => handleRating(star)}
                >
                    ★
                </span>
            ))}
            <p>Selected Rating: {selectedRating}</p>
        </div>

        <h3>Comments:</h3>
        {post.comments.map((c, index) => (
            <div key={index}>
                <b>{c.username}:</b> {c.text}
            </div>
        ))}
        {user && (
            <form onSubmit={handleCommentSubmit}>
                <input
                    type="text"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Write a comment..."
                />
                <button type="submit">Comment</button>
            </form>
        )}
    </div>
</div>

    );
};

export default SinglePost;
