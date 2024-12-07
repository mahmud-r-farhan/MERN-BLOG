import React from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';

function Header({ isAuthenticated, setIsAuthenticated }) {
  const handleLogout = () => {
    setIsAuthenticated(false);
    gsap.to('.nav-link', { y: -10, opacity: 0, stagger: 0.1, duration: 0.3, ease: 'back.in' });
  };

  React.useEffect(() => {
    gsap.from('.nav-link', { y: -50, opacity: 0, stagger: 0.1, duration: 0.5, ease: 'back.out' });
  }, []);

  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-6 py-3">
        <ul className="flex justify-between items-center">
          <li><Link to="/" className="nav-link text-xl font-bold text-gray-800 hover:text-gray-700">Blog Platform</Link></li>
          <div className="flex space-x-4">
            <li><Link to="/" className="nav-link text-gray-600 hover:text-gray-800">Home</Link></li>
            <li><Link to="/about" className="nav-link text-gray-600 hover:text-gray-800">About</Link></li>
            {isAuthenticated ? (
              <>
                <li><Link to="/admin" className="nav-link text-gray-600 hover:text-gray-800">Admin</Link></li>
                <li><button onClick={handleLogout} className="nav-link text-gray-600 hover:text-gray-800">Logout</button></li>
              </>
            ) : (
              <li><Link to="/login" className="nav-link text-gray-600 hover:text-gray-800">Login</Link></li>
            )}
          </div>
        </ul>
      </nav>
    </header>
  );
}

export default Header;

