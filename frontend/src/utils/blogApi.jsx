import axios from "axios";
import toast from "react-hot-toast";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const API_URL = `${BASE_URL}/blog`;


export const fetchBlogs = async () => {
  try {
    const response = await axios.get(`${API_URL}/all`, { withCredentials: true });
    return response.data;
  } catch (error) {
    toast.error("Failed to fetch blogs!");
    console.error("Error fetching blogs:", error);
    return [];
  }
};

export const createBlog = async (newBlog) => {
  try {
    const response = await axios.post(`${API_URL}/create`, newBlog, { withCredentials: true });
    toast.success("Blog Created!");
    return response.data["Created Blog"];
  } catch (error) {
    toast.error("Failed to create blog!");
    console.error("Error creating blog:", error);
    return null;
  }
};

export const updateBlog = async (blog) => {
  try {
    await axios.put(`${API_URL}/update/${blog.blogId}`, blog, { withCredentials: true });
    toast.success("Blog Updated!");
    return true;
  } catch (error) {
    toast.error("Failed to update blog!");
    console.error("Error updating blog:", error);
    return false;
  }
};

export const deleteBlog = async (id) => {
  try {
    await axios.delete(`${API_URL}/delete/${id}`, { withCredentials: true });
    toast.success("Blog Deleted!");
    return true;
  } catch (error) {
    toast.error("Failed to delete blog!");
    console.error("Error deleting blog:", error);
    return false;
  }
};
