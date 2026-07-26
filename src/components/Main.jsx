import React, { useState, useEffect } from 'react';
import Builder from './Builder';
import ResumePreview from './ResumePreview';
import TopBar from './TopBar';
import { MdEdit, MdVisibility } from 'react-icons/md';

const Main = () => {
    const [activeTab, setActiveTab] = useState('editor'); // 'editor' | 'preview'
    const [scale, setScale] = useState(1);

    useEffect(() => {
        const updateScale = () => {
            const width = window.innerWidth;
            if (width < 768) {
                // Mobile: Calculate scale to fit exactly with a little padding (e.g., 32px)
                setScale((width - 32) / 794);
            } else if (width < 1280) {
                // Tablet (md)
                setScale(0.85);
            } else {
                // Desktop (xl)
                setScale(1);
            }
        };
        updateScale();
        window.addEventListener('resize', updateScale);
        return () => window.removeEventListener('resize', updateScale);
    }, []);

    return (
        <div className="h-[100dvh] w-full flex flex-col bg-gray-100 overflow-hidden font-sans pb-[60px] md:pb-0">
            <TopBar />
            
            <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
                {/* Left Side: Forms workspace */}
                <div className={`${activeTab === 'editor' ? 'flex' : 'hidden'} md:flex flex-col w-full md:w-1/3 xl:w-[400px] h-full bg-white shadow-xl z-10 overflow-y-auto no-scrollbar`}>
                    <Builder />
                </div>

                {/* Right Side: Live Resume Preview Document Area */}
                <div className={`${activeTab === 'preview' ? 'flex' : 'hidden'} md:flex flex-col w-full md:w-2/3 xl:flex-1 h-full bg-gray-200 overflow-y-auto items-center py-6 md:py-10 px-4 md:px-0`}>
                    <div style={{ transform: `scale(${scale})` }} className="origin-top flex justify-center w-[794px] transition-transform duration-200">
                        <ResumePreview />
                    </div>
                </div>
            </div>

            {/* Mobile Bottom Tab Bar */}
            <div className="md:hidden fixed bottom-0 left-0 w-full h-[60px] bg-white border-t border-gray-200 flex shadow-[0_-2px_10px_rgba(0,0,0,0.05)] z-50">
                <button 
                    onClick={() => setActiveTab('editor')}
                    className={`flex-1 flex flex-col items-center justify-center gap-1 transition-colors ${activeTab === 'editor' ? 'text-purple-600' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    <MdEdit size={20} />
                    <span className="text-xs font-semibold">Editor</span>
                </button>
                <button 
                    onClick={() => setActiveTab('preview')}
                    className={`flex-1 flex flex-col items-center justify-center gap-1 transition-colors ${activeTab === 'preview' ? 'text-purple-600' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    <MdVisibility size={20} />
                    <span className="text-xs font-semibold">Preview</span>
                </button>
            </div>
            
        </div>
    )
}

export default Main;
