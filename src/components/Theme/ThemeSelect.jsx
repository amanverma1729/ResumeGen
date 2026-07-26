import React from 'react';
import { useResume } from '../../Context';
import ThemeOption from './ThemeOption';

const ThemeSelect = () => {
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

    return (
        <div className="flex flex-wrap gap-1.5 md:gap-2 items-center justify-center max-w-[150px] md:max-w-none">
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
                    className="w-5 h-5 md:w-8 md:h-8 rounded-full shadow-sm flex items-center justify-center bg-gradient-to-tr from-red-500 via-green-500 to-blue-500 text-white font-bold text-[10px] md:text-xs shadow-inner"
                >
                    <span className="drop-shadow-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">+</span>
                    {!options.includes(theme) && (
                        <div className="w-full h-full rounded-full absolute top-0 left-0" style={{ backgroundColor: theme }}></div>
                    )}
                </div>
            </label>
        </div>
    );
}

export default ThemeSelect;
