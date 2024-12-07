import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { toast } from 'react-toastify';

function Home() {
  const [blogs, setBlogs] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await fetch('/api/blogs');
      const data = await response.json();
      setBlogs(data);
      animateBlogs();
    } catch (error) {
      toast.error('Failed to fetch blogs');
    }
  };

  const animateBlogs = () => {
    gsap.from('.blog-card', {
      opacity: 0,
      y: 50,
      stagger: 0.1,
      duration: 0.5,
      ease: 'back.out(1.7)',
    });
  };

  const filteredBlogs = () => {
    switch (filter) {
      case 'recent':
        return blogs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5);
      case 'popular':
        return blogs.sort((a, b) => b.views - a.views).slice(0, 5);
      default:
        return blogs;
    }
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome to Our Blog</h1>
      <div className="mb-4">
        <button 
          onClick={() => setFilter('all')} 
          className={`mr-2 px-4 py-2 rounded ${filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          All
        </button>
        <button 
          onClick={() => setFilter('recent')} 
          className={`mr-2 px-4 py-2 rounded ${filter === 'recent' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Recent
        </button>
        <button 
          onClick={() => setFilter('popular')} 
          className={`px-4 py-2 rounded ${filter === 'popular' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Popular
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBlogs().map((blog) => (
          <div key={blog.id} className="blog-card bg-white rounded-lg shadow-md overflow-hidden">
            <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{blog.title}</h2>
              <p className="text-gray-600 mb-4">{blog.content.substring(0, 100)}...</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">{new Date(blog.createdAt).toLocaleDateString()}</span>
                <span className="text-sm text-gray-500">{blog.views} views</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;

