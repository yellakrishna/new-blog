import { Link } from "react-router-dom";

const PostCard = ({ post }) => {
    return (
        <div style={{ margin: "20px 0", padding: "10px", border: "1px solid #ccc" }}>
            <h3>{post.title}</h3>
            <p>{post.desc}</p>
            <img src={post.photo} alt="post" style={{ width: "300px", display: "block", margin: "10px 0" }} />
            <Link to={`/post/${post._id}`}>Read More</Link>
        </div>
    );
};

export default PostCard;
