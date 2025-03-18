import React from "react";
import BlogCard from "./BlogCard";

const BlogList = ({ blogs, onEdit, onDelete }) => {
  return blogs.length === 0 ? (
    <div className="p-4 bg-yellow-100 border border-yellow-400 rounded">
      <p>No blogs found! Start by creating one.</p>
    </div>
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {blogs.map((blog) => (
        <BlogCard key={blog.blogId} blog={blog} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default BlogList;
