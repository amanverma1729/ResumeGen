import React, { useState } from 'react';
import ThemeSelect from './Theme/ThemeSelect';
import { useReactToPrint } from 'react-to-print';
import { useResume } from '../Context';
import { MdOutlineFileDownload, MdSave, MdCloudDownload, MdDashboard } from 'react-icons/md';
import TemplateGalleryModal from './TemplateGalleryModal';

const TopBar = () => {
    const { 
        printElem, 
        theme, 
        about, 
        educationList, 
        skills, 
        workList, 
        projects,
        setTheme,
        template,
        setTemplate,
        sections,
        setSections,
        customSections,
        setCustomSections,
        setAbout,
        setEducationList,
        setSkills,
        setWorkList,
        setProjects
    } = useResume();

    const [loading, setLoading] = useState(false);
    const [isGalleryOpen, setIsGalleryOpen] = useState(false);

    const handlePrint = useReactToPrint({
        content: () => printElem.current,
    });
    // ...
    
    // (We will replace the return block below instead)

    const handleSave = async () => {
        setLoading(true);
        try {
            const data = { theme, about, educationList, skills, workList, projects, template, sections, customSections };
            const response = await fetch('http://localhost:5000/api/resume/save', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: 'my-resume', data })
            });
            if (response.ok) {
                alert('Resume saved successfully!');
            } else {
                alert('Failed to save resume.');
            }
        } catch (error) {
            console.error(error);
            alert('Error connecting to backend.');
        }
        setLoading(false);
    }

    const handleLoad = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:5000/api/resume/load/my-resume');
            if (response.ok) {
                const { data } = await response.json();
                if (data) {
                    setTheme(data.theme || '#9f7aea');
                    setTemplate(data.template || 'modern');
                    if (data.sections) setSections(data.sections);
                    if (data.customSections) setCustomSections(data.customSections);
                    setAbout(data.about);
                    setEducationList(data.educationList);
                    setSkills(data.skills);
                    setWorkList(data.workList);
                    setProjects(data.projects);
                    alert('Resume loaded successfully!');
                }
            } else {
                alert('No saved resume found.');
            }
        } catch (error) {
            console.error(error);
            alert('Error connecting to backend.');
        }
        setLoading(false);
    }

    return (
        <header className="w-full bg-white border-b border-gray-200 shadow-sm z-50 px-4 md:px-6 py-2 md:py-3 flex flex-col md:flex-row items-center justify-between shrink-0">
            <div className="flex items-center space-x-2 mb-2 md:mb-0 w-full md:w-auto justify-between md:justify-start">
                <span className="text-2xl font-bold text-purple-600" style={{ fontFamily: "Pacifico" }}>Resumegen</span>
                <div className="hidden md:flex items-center">
                    <span className="text-gray-300 mx-2">|</span>
                    <span className="text-gray-600 font-medium text-sm">Untitled Resume</span>
                </div>
            </div>

            <div className="flex flex-wrap items-center justify-center md:justify-end gap-2 md:gap-4 w-full md:w-auto">
                
                {/* Template Selector */}
                <div className="flex items-center space-x-1 md:space-x-2 border-r border-gray-200 pr-2 md:pr-4">
                    <button 
                        onClick={() => setIsGalleryOpen(true)}
                        className="flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-200 px-3 py-1.5 md:py-2 rounded-md font-semibold transition-colors text-xs md:text-sm"
                    >
                        <MdDashboard size={18} />
                        <span className="hidden sm:inline">Templates</span>
                        <span className="sm:hidden">Tpl</span>
                    </button>
                </div>

                {/* Theme Selector */}
                <div className="flex items-center border-r border-gray-200 pr-2 md:pr-4 scale-90 md:scale-100">
                    <ThemeSelect />
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-1 md:space-x-2">
                    <button 
                        onClick={handleSave} 
                        disabled={loading}
                        className="text-gray-600 hover:text-blue-600 hover:bg-blue-50 p-1.5 md:p-2 rounded-md transition-colors"
                        title="Save to Cloud"
                    >
                        <MdSave size={20} className="md:w-6 md:h-6" />
                    </button>
                    
                    <button 
                        onClick={handleLoad} 
                        disabled={loading}
                        className="text-gray-600 hover:text-green-600 hover:bg-green-50 p-1.5 md:p-2 rounded-md transition-colors"
                        title="Load from Cloud"
                    >
                        <MdCloudDownload size={20} className="md:w-6 md:h-6" />
                    </button>

                    <button 
                        onClick={handlePrint} 
                        className="flex items-center gap-1.5 bg-purple-600 hover:bg-purple-700 text-white px-3 md:px-5 py-1.5 md:py-2.5 rounded-md font-semibold transition-colors shadow-sm text-xs md:text-base ml-1"
                    >
                        <span className="hidden sm:inline">Download PDF</span>
                        <span className="sm:hidden">PDF</span>
                        <MdOutlineFileDownload size={18} className="md:w-5 md:h-5" />
                    </button>
                </div>
            </div>
            <TemplateGalleryModal isOpen={isGalleryOpen} onClose={() => setIsGalleryOpen(false)} />
        </header>
    );
};

export default TopBar;
