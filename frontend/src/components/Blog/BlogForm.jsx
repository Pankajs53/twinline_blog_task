import React from "react";

const BlogForm = ({ blog, setBlog, onSubmit, isEditing }) => {
  return (
    <div className="mt-6 p-4 border rounded shadow">
      <h3 className="text-2xl font-bold mb-2">{isEditing ? "Edit Blog" : "Create New Blog"}</h3>
      <input
        type="text"
        className="w-full p-2 border rounded mb-2"
        placeholder="Topic"
        value={blog.topic}
        onChange={(e) => setBlog({ ...blog, topic: e.target.value })}
      />
      <textarea
        className="w-full p-2 border rounded mb-2"
        placeholder="Blog Content"
        value={blog.content}
        onChange={(e) => setBlog({ ...blog, content: e.target.value })}
      />
      <button
        className="w-full bg-green-500 text-white py-2 rounded"
        onClick={onSubmit}
      >
        {isEditing ? "Update Blog" : "Create Blog"}
      </button>
    </div>
  );
};

export default BlogForm;
