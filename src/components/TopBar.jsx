import React, { useState } from 'react';
import ThemeSelect from './Theme/ThemeSelect';
import { useReactToPrint } from 'react-to-print';
import { useResume } from '../Context';
import { MdOutlineFileDownload, MdSave, MdCloudDownload, MdDashboard, MdMenu, MdMenuOpen } from 'react-icons/md';
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
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
        <header className="relative w-full bg-white border-b border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] z-50 px-4 md:px-8 py-3 md:py-4 flex flex-col md:flex-row items-center justify-between shrink-0">
            <div className="flex items-center justify-between w-full md:w-auto">
                <span className="text-2xl font-bold text-purple-600" style={{ fontFamily: "Pacifico" }}>Resumegen</span>
                <button 
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
                    className="flex md:hidden p-2 text-gray-500 hover:text-flowcv-text hover:bg-flowcv-gray rounded-xl transition-colors"
                >
                    {isMobileMenuOpen ? <MdMenuOpen size={28} /> : <MdMenu size={28} />}
                </button>
            </div>

            <div className={`${isMobileMenuOpen ? 'absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-xl flex flex-col p-6 space-y-4 z-50 animate-fadeIn' : 'hidden'} md:static md:flex md:flex-row items-center justify-end md:gap-3 w-full md:w-auto md:p-0 md:bg-transparent md:border-none md:shadow-none md:space-y-0`}>

                <button
                    onClick={() => setIsGalleryOpen(true)}
                    className="flex items-center justify-center gap-2 bg-gray-50 hover:bg-gray-100 text-flowcv-text border border-gray-200 px-5 py-2.5 rounded-full font-semibold transition-colors text-sm w-full md:w-auto"
                >
                    <MdDashboard size={18} />
                    <span>Templates</span>
                </button>

                <div className="w-full md:w-auto">
                    <ThemeSelect />
                </div>

                <div className="h-px w-full bg-gray-100 md:hidden my-2"></div>
                <div className="hidden md:block h-6 w-px bg-gray-200 mx-2"></div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                    <button
                        onClick={handleSave}
                        disabled={loading}
                        className="flex-1 md:flex-none flex items-center justify-center gap-2 text-gray-600 hover:text-flowcv-text bg-gray-50 hover:bg-flowcv-gray border border-gray-200 md:border-none px-4 py-2.5 md:p-2.5 rounded-full transition-colors"
                        title="Save to Cloud"
                    >
                        <MdSave size={20} />
                        <span className="md:hidden text-sm font-semibold">Save</span>
                    </button>

                    <button
                        onClick={handleLoad}
                        disabled={loading}
                        className="flex-1 md:flex-none flex items-center justify-center gap-2 text-gray-600 hover:text-flowcv-text bg-gray-50 hover:bg-flowcv-gray border border-gray-200 md:border-none px-4 py-2.5 md:p-2.5 rounded-full transition-colors"
                        title="Load from Cloud"
                    >
                        <MdCloudDownload size={20} />
                        <span className="md:hidden text-sm font-semibold">Load</span>
                    </button>
                </div>

                <button
                    onClick={handlePrint}
                    className="flex items-center justify-center gap-2 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-6 py-2.5 rounded-full font-bold transition-all shadow-md text-sm w-full md:w-auto mt-4 md:mt-0"
                >
                    <MdOutlineFileDownload size={20} />
                    <span>Download PDF</span>
                </button>
            </div>
            <TemplateGalleryModal isOpen={isGalleryOpen} onClose={() => setIsGalleryOpen(false)} />
        </header>
    );
};

export default TopBar;
