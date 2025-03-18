import React from "react";

const BlogCard = ({ blog, onEdit, onDelete }) => {
  return (
    <div className="p-4 border rounded shadow">
      <h3 className="text-xl font-semibold">{blog.topic}</h3>
      <p className="text-gray-700">{blog.content}</p>
      <div className="mt-2 flex gap-2">
        <button className="bg-blue-500 text-white px-3 py-1 rounded" onClick={() => onEdit(blog)}>Edit</button>
        <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={() => onDelete(blog.blogId)}>Delete</button>
      </div>
    </div>
  );
};

export default BlogCard;
