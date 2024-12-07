import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import BlogList from '../components/BlogList';
import CreateBlog from '../components/CreateBlog';
import EditBlog from '../components/EditBlog';

function AdminDashboard({ setIsAuthenticated }) {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await fetch('/api/admin/blogs');
      const data = await response.json();
      setBlogs(data);
    } catch (error) {
      toast.error('Failed to fetch blogs');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    toast.info('Logout successfully');
  };

  const addBlog = async (blog) => {
    try {
      const response = await fetch('/api/admin/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(blog),
      });
      if (response.ok) {
        const newBlog = await response.json();
        setBlogs([...blogs, newBlog]);
        toast.success('Blog post created successfully!');
      } else {
        throw new Error('Failed to create blog post');
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const deleteBlog = async (id) => {
    try {
      const response = await fetch(`/api/admin/blogs/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setBlogs(blogs.filter(blog => blog.id !== id));
        toast.success('Blog post deleted successfully!');
      } else {
        throw new Error('Failed to delete blog post');
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const updateBlog = async (id, updatedBlog) => {
    try {
      const response = await fetch(`/api/admin/blogs/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedBlog),
      });
      if (response.ok) {
        const updated = await response.json();
        setBlogs(blogs.map(blog => blog.id === id ? updated : blog));
        toast.success('Blog post updated successfully!');
      } else {
        throw new Error('Failed to update blog post');
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex bg-slate-700 h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h1 className="text-2xl font-semibold text-gray-800">Admin Dashboard</h1>
        </div>
        <nav className="mt-4">
          <Link to="/admin" className="block py-2 px-4 text-gray-700 hover:bg-gray-200">Blog List</Link>
          <Link to="/admin/create" className="block py-2 px-4 text-gray-700 hover:bg-gray-200">Create Blog</Link>
          <button onClick={handleLogout} className="block w-full text-left py-2 px-4 text-gray-700 hover:bg-gray-200">Logout</button>
        </nav>
      </aside>
      <main className="flex-1  p-8">
        <Routes>
          <Route path="/" element={<BlogList blogs={blogs} deleteBlog={deleteBlog} />} />
          <Route path="/create" element={<CreateBlog addBlog={addBlog} />} />
          <Route path="/edit/:id" element={<EditBlog blogs={blogs} updateBlog={updateBlog} />} />
        </Routes>
      </main>
    </div>
  );
}

export default AdminDashboard;

