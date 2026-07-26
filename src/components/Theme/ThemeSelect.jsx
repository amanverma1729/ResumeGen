import React, { useState, useRef, useEffect } from 'react';
import { useResume } from '../../Context';
import ThemeOption from './ThemeOption';

const ThemeSelect = () => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef(null);
    const options = [
        '#9f7aea', // purple
        '#48bb78', // green
        '#38b2ac', // cyan
        '#a0aec0', // gray
        '#f56565', // red
        '#ed8936', // orange
        '#F15BA6'  // pink
    ];

    const { theme, setTheme } = useResume();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={containerRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 bg-gray-50 hover:bg-gray-100 text-flowcv-text border border-gray-200 px-4 py-2 rounded-full font-semibold transition-colors text-xs md:text-sm w-full md:w-auto justify-center"
            >
                <div className="w-4 h-4 rounded-full border border-gray-300" style={{ backgroundColor: theme }}></div>
                <span>Theme</span>
            </button>

            {isOpen && (
                <div className="absolute top-full mt-2 left-0 md:left-auto md:right-0 bg-white shadow-xl border border-gray-100 rounded-2xl p-4 z-50 w-[280px] animate-fadeIn">
                    <h3 className="text-sm font-bold text-flowcv-text mb-3">Color Palette</h3>
                    <div className="flex flex-wrap gap-2 items-center">
                        {options.map((value) => (
                            <ThemeOption 
                                key={value}
                                value={value}
                                isChecked={theme === value}
                                onChange={() => setTheme(value)}
                            />
                        ))}
                        
                        {/* Native RGB/Hex Custom Color Picker */}
                        <label className="cursor-pointer flex items-center justify-center p-1 rounded-full border-2 transition-colors relative group"
                            style={{ 
                                borderColor: !options.includes(theme) ? '#319795' : 'transparent',
                            }}
                            title="Choose Custom Color"
                        >
                            <input 
                                type="color" 
                                className="w-0 h-0 opacity-0 absolute" 
                                value={theme}
                                onChange={(e) => setTheme(e.target.value)} 
                            />
                            <div 
                                className="w-6 h-6 md:w-8 md:h-8 rounded-full shadow-sm flex items-center justify-center bg-gradient-to-tr from-red-500 via-green-500 to-blue-500 text-white font-bold text-[10px] md:text-xs shadow-inner"
                            >
                                <span className="drop-shadow-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">+</span>
                                {!options.includes(theme) && (
                                    <div className="w-full h-full rounded-full absolute top-0 left-0" style={{ backgroundColor: theme }}></div>
                                )}
                            </div>
                        </label>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ThemeSelect;
