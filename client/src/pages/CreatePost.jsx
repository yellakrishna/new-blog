import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import "./../App.css";

const CreatePost = () => {
    const { user } = useContext(AuthContext);
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [file, setFile] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("username", user.username);
        data.append("title", title);
        data.append("desc", desc);
        if (file) data.append("file", file);

        try {
            await axios.post("/posts", data, {
                headers: {
                    token: localStorage.getItem("token"),
                },
            });
            alert("Post created successfully!");
            navigate("/");
        } catch (err) {
            console.log(err);
            alert(err.response.data || "Failed to create post.");
        }
    };

    return (
        <div className="create-post-container">
            <h2>Create New Post</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Description"
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    required
                />
                <input
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                />
                <button type="submit">Publish</button>
            </form>
        </div>
    );
};

export default CreatePost;
