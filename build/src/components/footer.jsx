import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaGithub } from 'react-icons/fa';
import logo from '../img/fav.png';  // Replace with the actual path to your logo image

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
          {/* Logo Section */}
          <div className="flex items-center space-x-4 mb-4 sm:mb-0">
            <img src={logo} alt="Site Logo" className="h-12" />
            <h2 className="text-3xl font-semibold text-teal-400">PlanetPix</h2>
          </div>

          {/* Social Media Icons */}
          <div className="flex space-x-6">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl hover:text-teal-400 transition duration-300"
            >
              <FaFacebook />
            </a>
            <a
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl hover:text-teal-400 transition duration-300"
            >
              <FaTwitter />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl hover:text-teal-400 transition duration-300"
            >
              <FaInstagram />
            </a>
            <a
              href="https://github.com/sanni1244"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl hover:text-teal-400 transition duration-300"
            >
              <FaGithub />
            </a>
          </div>
        </div>

        {/* About Section */}
        <div className="mb-8 text-center">
          <p className="text-lg mb-4">Explore famous landmarks around the world! Learn while having fun and testing your knowledge.</p>
          <p className="text-sm text-gray-400">
            Discover historical wonders, iconic structures, and much more from the comfort of your screen.
          </p>
        </div>

        {/* Contact Info */}
        <div className="text-center mb-6">
          <p className="text-sm text-gray-400">Built with ❤️ by [Sanni Opeyemi]</p>
          <p className="text-sm text-gray-400">
            Contact us: <a href="mailto:youremail@example.com" className="text-teal-400 hover:text-teal-300">sanniopeyemiolayinka@gmail.com</a>
          </p>
        </div>

        {/* Copyright Section */}
        <div className="text-center">
          <p className="text-sm text-gray-400">&copy; 2024 Landmark Guessing Game. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
