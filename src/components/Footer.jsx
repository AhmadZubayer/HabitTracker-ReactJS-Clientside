import React from 'react';
import { Link } from 'react-router';
import { FaInstagram, FaFacebook, FaYoutube, FaLinkedin, FaGithub, FaPinterest } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-800 mt-20">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div>
            <div className="flex flex-col items-start mb-4">
              <img src="/mainlogo.png" alt="HabitTracker Logo" className="w-20 h-20 mb-2" />
              <h3 className="text-2xl font-bold">HabitTracker</h3>
            </div>
            <p>
              Building better habits, one day at a time. Track, achieve, and maintain your daily goals with ease.
            </p>
          </div>

          <div className="text-center">
            <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
            <div className="flex items-center justify-center gap-3">
              <Link to="/about" className="hover:text-[#1085F1] transition">About</Link>
              <span>•</span>
              <Link to="/contact" className="hover:text-[#1085F1] transition">Contact</Link>
              <span>•</span>
              <Link to="/privacy" className="hover:text-[#1085F1] transition">Privacy Policy</Link>
            </div>
          </div>

          <div className="text-center md:text-right">
            <h4 className="text-xl font-semibold mb-4">Follow Us</h4>
            <div className="flex gap-4 justify-center md:justify-end">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-[#1085F1] transition text-2xl"
              >
                <FaInstagram />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-[#1085F1] transition text-2xl"
              >
                <FaFacebook />
              </a>
              <a 
                href="https://x.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-[#1085F1] transition text-2xl"
              >
                <FaXTwitter />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-[#1085F1] transition text-2xl"
              >
                <FaYoutube />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-[#1085F1] transition text-2xl"
              >
                <FaLinkedin />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-300 mt-8 pt-6 text-center">
          <p>© 2025 HabitTracker. All rights reserved.</p>
          <p className="mt-2">
            This is a project of Web Development course, built by Ahmad Zubayer.
          </p>
          <div className="flex items-center justify-center gap-6 mt-3">
            <a 
              href="https://github.com/AhmadZubayer/HabitTracker-ReactJS-Clientside.git" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-[#1085F1] transition"
            >
              <FaGithub className="text-xl" />
              View Source Code
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
