import React from 'react';
import { FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-gray-100 text-gray-700">
            <div className="max-w-7xl mx-auto py-5 px-4 flex flex-col md:flex-row justify-center md:justify-between items-center space-y-4 md:space-y-0">
                
                <div className="flex flex-col md:flex-row items-center font-medium space-x-1">
                    <span>&copy; 2025 Resume Genretor. Designed By </span>
                    <a href="https://www.linkedin.com/in/amanverma2022/" target="_blank" rel="noreferrer" className="text-blue-600 hover:text-blue-800 transition-colors">
                        Aman Verma
                    </a>
                </div>

                <div className="flex flex-row space-x-6">
                    <a href="https://github.com/A-manverma" target="_blank" rel="noreferrer" className="p-2 bg-gray-300 hover:bg-gray-400 rounded-full text-gray-800 transition-colors">
                        <FaGithub size={20} />
                    </a>
                    <a href="https://www.linkedin.com/in/amanverma2022/" target="_blank" rel="noreferrer" className="p-2 bg-blue-100 hover:bg-blue-200 rounded-full text-blue-600 transition-colors">
                        <FaLinkedin size={20} />
                    </a>
                    <a href="https://www.instagram.com/aman_verma1729/" target="_blank" rel="noreferrer" className="p-2 bg-pink-100 hover:bg-pink-200 rounded-full text-pink-500 transition-colors">
                        <FaInstagram size={20} />
                    </a>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
