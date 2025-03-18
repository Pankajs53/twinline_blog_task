import React, { useEffect, useState } from "react";
import { fetchBlogs, createBlog, updateBlog, deleteBlog } from "../utils/blogApi"
import BlogList from "./Blog/BlogList"
import BlogForm from "./Blog/BlogForm"

const Dashboard = () => {
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState({ topic: "", content: "" });
  const [editBlog, setEditBlog] = useState(null);

  useEffect(() => {
    const getBlogs = async () => {
      const data = await fetchBlogs();
      setBlogs(data);
    };
    getBlogs();
  }, []);

  const handleCreate = async () => {
    if (!newBlog.topic || !newBlog.content) return;

    const createdBlog = await createBlog(newBlog);
    if (createdBlog) {
      setBlogs([...blogs, createdBlog]);
      setNewBlog({ topic: "", content: "" });
    }
  };

  const handleUpdate = async () => {
    if (!editBlog.topic || !editBlog.content) return;

    const success = await updateBlog(editBlog);
    if (success) {
      setBlogs(blogs.map((b) => (b.blogId === editBlog.blogId ? editBlog : b)));
      setEditBlog(null);
    }
  };

  const handleDelete = async (id) => {
    const success = await deleteBlog(id);
    if (success) {
      setBlogs(blogs.filter((b) => b.blogId !== id));
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">My Blogs</h2>

      {/* Blog List */}
      <BlogList blogs={blogs} onEdit={setEditBlog} onDelete={handleDelete} />

      {/* Blog Form */}
      <BlogForm 
        blog={editBlog || newBlog} 
        setBlog={editBlog ? setEditBlog : setNewBlog} 
        onSubmit={editBlog ? handleUpdate : handleCreate} 
        isEditing={!!editBlog} 
      />
    </div>
  );
};

export default Dashboard;
