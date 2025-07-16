import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axiosInstance";

const PostDetail = () => {
    const { id } = useParams();
    const [post, setPost] = useState({});

    useEffect(() => {
        const fetchPost = async () => {
            const res = await axios.get(`/posts/${id}`);
            setPost(res.data);
        };
        fetchPost();
    }, [id]);

    return (
        <div>
            <h1>{post.title}</h1>
            <img src={post.photo} alt="Post" width="400" />
            <p>{post.desc}</p>
            <p>Author: {post.username}</p>
        </div>
    );
};
export default PostDetail;
