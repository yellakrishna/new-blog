import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../api/axiosInstance";
import { AuthContext } from "../context/AuthContext";
import "./../App.css";

const EditPost = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [photo, setPhoto] = useState("");

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await axios.get(`/posts/${id}`);
                setTitle(res.data.title);
                setDesc(res.data.desc);
                setPhoto(res.data.photo);
            } catch (err) {
                console.log(err);
            }
        };
        fetchPost();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/posts/${id}`, {
                title,
                desc,
                photo,
            }, {
                headers: {
                    token: localStorage.getItem("token"),
                },
            });
            alert("Updated successfully!");
            navigate("/profile");
        } catch (err) {
            console.log(err);
            alert(err.response.data || "Update failed");
        }
    };

    return (
        <div className="create-post-container">
            <h2>Edit Post</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                    required
                />
                <textarea
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    placeholder="Description"
                    required
                />
                <input
                    type="text"
                    value={photo}
                    onChange={(e) => setPhoto(e.target.value)}
                    placeholder="Image URL"
                />
                <button type="submit">Update</button>
            </form>
        </div>
    );
};

export default EditPost;
