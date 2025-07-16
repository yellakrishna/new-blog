import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "../api/axiosInstance";
import { Link } from "react-router-dom";
import "./../App.css";

const Profile = () => {
    const { user } = useContext(AuthContext);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchMyPosts = async () => {
            try {
                const res = await axios.get("/posts");
                const myPosts = res.data.filter((post) => post.username === user.username);
                setPosts(myPosts);
            } catch (err) {
                console.log(err);
            }
        };
        fetchMyPosts();
    }, [user.username]);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/posts/${id}`, {
                headers: {
                    token: localStorage.getItem("token"),
                },
            });
            alert("Deleted successfully!");
            setPosts(posts.filter((p) => p._id !== id));
        } catch (err) {
            console.log(err);
            alert(err.response?.data || "Delete failed");
        }
    };

    return (
        <div className="profile-container">
            <h2 className="profile-title">My Posts</h2>

            {posts.length === 0 ? (
                <p className="empty-message">No posts yet. Start sharing your first post!</p>
            ) : (
                <div className="profile-grid">
                    {posts.map((post) => (
                        <div key={post._id} className="profile-post-card">
                            {post.photo && <img src={post.photo} alt="post" />}
                            <h4>{post.title}</h4>
                            <p>{post.desc}</p>
                            <div className="profile-post-actions">
                                <button onClick={() => handleDelete(post._id)}>Delete</button>
                                <Link to={`/edit/${post._id}`}>Edit</Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Profile;
