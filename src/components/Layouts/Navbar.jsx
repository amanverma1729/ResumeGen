import React from 'react';

const Navbar = () => {
    return (
        <header className="p-5 bg-gray-50">
            <div className="w-full flex items-center">
                <h3 className="ml-0 sm:ml-8 text-lg font-thin text-purple-600" style={{ fontFamily: "Pacifico" }}>Resumegen</h3>
                <div className="flex-grow"></div>
                <nav className="flex space-x-10 mr-0 sm:mr-8 items-center" style={{ fontFamily: 'Poppins' }}>
                    <a href="#" className="text-lg hover:text-purple-600 transition-colors">Home</a>
                    <a href="#" className="text-lg hover:text-purple-600 transition-colors">Templates</a>
                    <a href="#" className="text-lg hover:text-purple-600 transition-colors">About</a>
                    <button className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded transition-colors">Contact</button>
                </nav>
            </div>
        </header>
    );
};

export default Navbar;
