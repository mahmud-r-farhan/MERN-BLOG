import React, { useEffect } from 'react';
import { gsap } from 'gsap';

function About() {
  useEffect(() => {
    gsap.from('.about-content', {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: 'power3.out',
    });
  }, []);

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="about-content max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">About Our Blog Platform</h1>
        <p className="text-gray-600 mb-4">
          Welcome to our blog platform! We are passionate about sharing knowledge and insights on various topics.
          Our team of expert writers and contributors work hard to bring you high-quality content that informs,
          entertains, and inspires.
        </p>
        <p className="text-gray-600 mb-4">
          Whether you're here to learn something new, stay up-to-date with the latest trends, or simply enjoy
          great writing, we have something for everyone. Our diverse range of topics includes technology,
          lifestyle, culture, and much more.
        </p>
        <p className="text-gray-600">
          Thank you for being a part of our community. We hope you enjoy your time here and find value in the
          content we create. If you have any questions or suggestions, please don't hesitate to reach out to us.
        </p>
      </div>
    </div>
  );
}

export default About;

