import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Profile from "./pages/Profile";
import EditPost from "./pages/EditPost";
import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectedRoute";
import PostDetail from "./pages/PostDetail";
import "./App.css"; // Import CSS globally
import SinglePost from "./pages/SinglePost";

// your routes and components...


function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/post/:id" element={<SinglePost />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
               <Route path="/post/:id" element={<PostDetail />} />

                <Route path="/profile" element={
                    <ProtectedRoute><Profile /></ProtectedRoute>} />
                <Route path="/create" element={
                    <ProtectedRoute><CreatePost /></ProtectedRoute>} />
                <Route path="/edit/:id" element={
                    <ProtectedRoute><EditPost /></ProtectedRoute>} />
            </Routes>
        </Router>
    );
}

export default App;
