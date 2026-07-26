import React from 'react';
import { useResume } from '../Context';
import { MdClose } from 'react-icons/md';

import TemplateModern from "./Templates/TemplateModern";
import TemplateProfessional from "./Templates/TemplateProfessional";
import TemplateATSClassic from "./Templates/TemplateATSClassic";
import TemplateATSModern from "./Templates/TemplateATSModern";
import TemplateATSCompact from "./Templates/TemplateATSCompact";
import TemplateATSProfessional from "./Templates/TemplateATSProfessional";
import TemplateATSDeveloper from "./Templates/TemplateATSDeveloper";
import TemplateSplitModern from "./Templates/TemplateSplitModern";
import TemplateSplitCreative from "./Templates/TemplateSplitCreative";
import TemplateSplitProfessional from "./Templates/TemplateSplitProfessional";

const templatesList = [
    { id: 'modern', name: 'Modern', component: <TemplateModern /> },
    { id: 'professional', name: 'Professional', component: <TemplateProfessional /> },
    { id: 'ats-classic', name: 'ATS Classic', component: <TemplateATSClassic /> },
    { id: 'ats-modern', name: 'ATS Modern', component: <TemplateATSModern /> },
    { id: 'ats-compact', name: 'ATS Compact', component: <TemplateATSCompact /> },
    { id: 'ats-professional', name: 'ATS Pro', component: <TemplateATSProfessional /> },
    { id: 'ats-developer', name: 'ATS Developer', component: <TemplateATSDeveloper /> },
    { id: 'split-modern', name: 'Split Modern', component: <TemplateSplitModern /> },
    { id: 'split-creative', name: 'Split Creative', component: <TemplateSplitCreative /> },
    { id: 'split-professional', name: 'Split Pro', component: <TemplateSplitProfessional /> },
];

const TemplateGalleryModal = ({ isOpen, onClose }) => {
    const { template, setTemplate } = useResume();

    if (!isOpen) return null;

    const handleSelect = (id) => {
        setTemplate(id);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fadeIn">
            <div className="bg-white rounded-[28px] shadow-2xl w-full max-w-6xl h-[90vh] flex flex-col overflow-hidden animate-slideUp">
                <div className="flex justify-between items-center p-8 border-b border-gray-100 shrink-0">
                    <div>
                        <h2 className="text-3xl font-bold text-flowcv-text tracking-tight">Template Gallery</h2>
                        <p className="text-gray-500 text-sm mt-1">Select a design for your resume</p>
                    </div>
                    <button onClick={onClose} className="p-3 text-gray-400 hover:text-flowcv-text hover:bg-flowcv-gray rounded-xl transition-colors">
                        <MdClose size={24} />
                    </button>
                </div>
                
                <div className="flex-1 overflow-y-auto p-8 bg-flowcv-bg">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {templatesList.map((tpl) => (
                            <div 
                                key={tpl.id}
                                onClick={() => handleSelect(tpl.id)}
                                className={`group cursor-pointer rounded-2xl bg-white border-2 overflow-hidden transition-all hover:shadow-xl ${template === tpl.id ? 'border-indigo-500 shadow-lg ring-4 ring-indigo-50' : 'border-gray-100 hover:border-indigo-300'}`}
                            >
                                <div className="h-[300px] w-full overflow-hidden flex justify-center bg-gray-50 relative pointer-events-none">
                                    <div className="absolute top-0 transform origin-top scale-[0.35] lg:scale-[0.3] mt-2 shadow-md bg-white">
                                        <div className="w-[794px] h-[1123px] overflow-hidden">
                                            {tpl.component}
                                        </div>
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                </div>
                                <div className="p-4 flex items-center justify-between bg-white border-t border-gray-50 z-10 relative">
                                    <span className="font-bold text-flowcv-text">{tpl.name}</span>
                                    {template === tpl.id && (
                                        <span className="text-xs bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full font-bold">Selected</span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TemplateGalleryModal;
