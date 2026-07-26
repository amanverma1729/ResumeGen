import React, { useState, useEffect, useRef } from 'react';
import Builder from './Builder';
import ResumePreview from './ResumePreview';
import TopBar from './TopBar';
import { MdEdit, MdVisibility } from 'react-icons/md';

const Main = () => {
    const [activeTab, setActiveTab] = useState('editor'); // 'editor' | 'preview'
    const [scale, setScale] = useState(1);
    const [editorWidth, setEditorWidth] = useState(400);
    const [isDragging, setIsDragging] = useState(false);
    const previewContainerRef = useRef(null);

    // Drag Logic
    const handleMouseDown = (e) => {
        setIsDragging(true);
        e.preventDefault();
    };

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!isDragging) return;
            let newWidth = e.clientX;
            if (newWidth < 300) newWidth = 300;
            if (newWidth > window.innerWidth - 350) newWidth = window.innerWidth - 350;
            setEditorWidth(newWidth);
        };

        const handleMouseUp = () => {
            if (isDragging) setIsDragging(false);
        };

        if (isDragging) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        }
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging]);

    // Scale Logic
    useEffect(() => {
        const updateScale = () => {
            if (window.innerWidth < 768) {
                setScale((window.innerWidth - 32) / 794);
                return;
            }
            if (previewContainerRef.current) {
                const containerWidth = previewContainerRef.current.clientWidth;
                const availableWidth = containerWidth - 64; // Padding
                const requiredScale = availableWidth / 794;
                setScale(Math.min(1.1, requiredScale)); // Cap at 1.1 scale
            }
        };

        window.addEventListener('resize', updateScale);
        updateScale(); // initial scale
        
        let observer;
        if (previewContainerRef.current && window.ResizeObserver) {
            observer = new ResizeObserver(() => {
                updateScale();
            });
            observer.observe(previewContainerRef.current);
        }

        return () => {
            window.removeEventListener('resize', updateScale);
            if (observer) observer.disconnect();
        };
    }, []);

    return (
        <div className="h-[100dvh] w-full flex flex-col bg-flowcv-bg overflow-hidden pb-[60px] md:pb-0">
            <TopBar />

            <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
                
                {/* Left Side: Forms workspace */}
                <div 
                    style={{ width: window.innerWidth >= 768 ? editorWidth : '100%' }}
                    className={`${activeTab === 'editor' ? 'flex' : 'hidden'} md:flex flex-col h-full bg-white shadow-[2px_0_15px_rgba(0,0,0,0.03)] z-10 overflow-y-auto no-scrollbar shrink-0`}
                >
                    <Builder />
                </div>

                {/* Drag Handle */}
                <div 
                    onMouseDown={handleMouseDown}
                    className={`hidden md:flex w-2 cursor-col-resize hover:bg-gray-200 transition-colors z-20 ${isDragging ? 'bg-gray-300' : 'bg-transparent'}`}
                    title="Drag to resize"
                ></div>

                {/* Right Side: Live Resume Preview Document Area */}
                <div 
                    ref={previewContainerRef}
                    className={`${activeTab === 'preview' ? 'flex' : 'hidden'} md:flex flex-col flex-1 h-full bg-flowcv-bg overflow-y-auto items-center py-6 md:py-10 px-4 md:px-0`}
                >
                    <div style={{ transform: `scale(${scale})` }} className="origin-top flex justify-center w-[794px] transition-transform duration-75">
                        <ResumePreview />
                    </div>
                </div>

                {/* Drag Overlay (prevents selecting text while dragging) */}
                {isDragging && (
                    <div className="fixed inset-0 z-50 cursor-col-resize bg-transparent"></div>
                )}
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
