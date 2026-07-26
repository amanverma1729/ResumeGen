import React from 'react';
import hero from '../../images/hero.svg';

const Header = () => {
    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="py-8 md:py-20 flex flex-col md:flex-row items-center gap-4 md:gap-10">
                <div className="flex-1 flex flex-col space-y-4">
                    <h1 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-600">
                        If You Want To Get Gaining, Get A Resume
                    </h1>
                    
                    <p className="text-gray-600 leading-relaxed" style={{ fontFamily: 'Poppins' }}>
                        Resumegen is a tool that often constitutes an automated process in which you follow a template and input your information. Ability to build, print, and download your resume for free in minutes.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                        <a
                            href="#builder"
                            className="bg-purple-600 hover:bg-purple-700 text-white font-medium text-lg px-6 py-3 rounded-md transition-colors text-center"
                        >
                            Build Resume
                        </a>
                    </div>
                </div>

                <div className="flex-1 w-full">
                    <div className="relative h-[400px] w-full overflow-hidden flex justify-center items-center">
                        <img
                            alt="Hero Image"
                            className="object-contain w-full h-full"
                            src={hero}
                            draggable="false"
                        />
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Header;
