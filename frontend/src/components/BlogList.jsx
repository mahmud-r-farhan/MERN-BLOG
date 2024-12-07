import React from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';

function BlogList({ blogs, deleteBlog }) {
  const handleDelete = (id) => {
    gsap.to(`#blog-${id}`, { 
      opacity: 0, 
      x: -100, 
      duration: 0.5, 
      onComplete: () => deleteBlog(id) 
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Blog Posts</h2>
      {blogs.length === 0 ? (
        <p>No blog posts yet.</p>
      ) : (
        <ul className="space-y-4">
          {blogs.map((blog) => (
            <li key={blog.id} id={`blog-${blog.id}`} className="bg-white shadow rounded-lg p-4">
              <h3 className="text-xl font-semibold">{blog.title}</h3>
              <p className="text-gray-600 mt-2">{blog.content.substring(0, 100)}...</p>
              <div className="mt-4 flex space-x-2">
                <Link to={`/admin/edit/${blog.id}`} className="text-blue-600 hover:underline">Edit</Link>
                <button onClick={() => handleDelete(blog.id)} className="text-red-600 hover:underline">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default BlogList;

