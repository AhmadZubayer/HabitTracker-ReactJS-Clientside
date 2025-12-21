import React from 'react';
import { Link } from 'react-router';
import { FaInstagram, FaFacebook, FaYoutube, FaLinkedin, FaGithub, FaPinterest } from 'react-icons/fa';
import logo from '../assets/logo/logo.png';

const Footer = () => {
    return (
        <footer className="bg-gray-100 text-gray-800 mt-20">
            <div className="container mx-auto px-4 py-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                    <div>
                        <div className="flex flex-col items-start mb-4">
                            <img src={logo} alt="GreenNest Logo" className="w-20 h-20 mb-2" />
                            <h3 className="text-2xl font-bold">GreenNest</h3>
                        </div>
                        <p className="text-gray-600">
                            Nurture your space with healthy indoor plants. Your trusted partner for plant care and consultation.
                        </p>
                    </div>

                    <div className="text-center">
                        <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
                        <div className="flex items-center justify-center gap-3 text-gray-600">
                            <Link to="/about" className="hover:text-green-600 transition">About</Link>
                            <span>•</span>
                            <Link to="/contact" className="hover:text-green-600 transition">Contact</Link>
                            <span>•</span>
                            <Link to="/privacy" className="hover:text-green-600 transition">Privacy Policy</Link>
                        </div>
                    </div>

                    <div className="text-center md:text-right">
                        <h4 className="text-xl font-semibold mb-4">Follow Us</h4>
                        <div className="flex gap-4 justify-center md:justify-end">
                            <a 
                                href="https://instagram.com" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="hover:text-green-600 transition text-2xl"
                            >
                                <FaInstagram />
                            </a>
                            <a 
                                href="https://facebook.com" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="hover:text-green-600 transition text-2xl"
                            >
                                <FaFacebook />
                            </a>
                            <a 
                                href="https://pinterest.com" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="hover:text-green-600 transition text-2xl"
                            >
                                <FaPinterest />
                            </a>
                            <a 
                                href="https://youtube.com" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="hover:text-green-600 transition text-2xl"
                            >
                                <FaYoutube />
                            </a>
                            <a 
                                href="https://linkedin.com" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="hover:text-green-600 transition text-2xl"
                            >
                                <FaLinkedin />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-300 mt-8 pt-6 text-center">
                    <p className="text-gray-600">© 2025 GreenNest. All rights reserved.</p>
                    <p className="text-gray-600 mt-2">
                        This is a project of Web Development course at Programming Hero made by Ahmad Zubayer.
                    </p>
                    <div className="flex items-center justify-center gap-6 mt-3 text-gray-600">
                        <a 
                            href="https://github.com/AhmadZubayer/GreenNest--Indoor-Plant-Care-Store.git" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 hover:text-green-600 transition"
                        >
                            <FaGithub className="text-xl" />
                            View Source Code
                        </a>
                        <span>|</span>
                        <a 
                            href="https://github.com/AhmadZubayer" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 hover:text-green-600 transition"
                        >
                            <FaGithub className="text-xl" />
                            Follow me on GitHub
                        </a>
                    </div>
                    <div className="mt-4 text-sm text-gray-500">
                        <p>
                            *Pictures used in the project collected from{' '}
                            <a 
                                href="https://www.freepik.com" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="hover:text-green-600 transition underline"
                            >
                                Freepik
                            </a>
                            {' '}and plant data from{' '}
                            <a 
                                href="https://www.gardendesign.com/houseplants/best-indoor.html" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="hover:text-green-600 transition underline"
                            >
                                Garden Design
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
