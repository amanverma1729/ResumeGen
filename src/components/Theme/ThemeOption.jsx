import React from 'react';

const ThemeOption = ({ value, isChecked, onChange }) => {
    return (
        <label className="cursor-pointer flex items-center justify-center p-1 rounded-full border-2 transition-colors relative"
            style={{ 
                borderColor: isChecked ? '#319795' : 'transparent',
            }}
        >
            <input 
                type="radio" 
                className="hidden" 
                value={value} 
                checked={isChecked} 
                onChange={onChange} 
            />
            <div 
                className="w-5 h-5 md:w-8 md:h-8 rounded-full shadow-sm"
                style={{ backgroundColor: value }}
            ></div>
        </label>
    );
}

export default ThemeOption;
