import React from "react";
import { useResume } from "../../Context";

const TemplateATSCompact = () => {
    const { theme, about, educationList, skills, workList, projects, sections, customSections } = useResume();

    const renderSection = (section) => {
        switch (section.id) {
            case 'work':
                return (
                    <div key={section.id} className="mb-2">
                        <h3 className="text-[13px] font-bold text-gray-900 uppercase border-b border-gray-400 mb-1">
                            {section.name}
                        </h3>
                        {workList.map((work, index) => (
                            <div key={index} className="mb-1">
                                <div className="flex justify-between items-baseline">
                                    <span className="font-bold text-[12px]">{work.position || "Position Title"} - <span className="font-medium italic">{work.company || "Company Name"}</span></span>
                                    <span className="text-[11px] font-medium whitespace-nowrap">{work.startDate || "Start"} - {work.endDate || "Present"}</span>
                                </div>
                                <p className="text-[11px] text-gray-800 leading-tight">
                                    {work.description || "Description of your responsibilities."}
                                </p>
                            </div>
                        ))}
                    </div>
                );
            case 'education':
                return (
                    <div key={section.id} className="mb-2">
                        <h3 className="text-[13px] font-bold text-gray-900 uppercase border-b border-gray-400 mb-1">
                            {section.name}
                        </h3>
                        {educationList.map((edu, index) => (
                            <div key={index} className="mb-1 flex justify-between items-baseline">
                                <div>
                                    <span className="font-bold text-[12px]">{edu.degree || "Degree Title"}</span>
                                    <span className="text-[11px]">, {edu.school || "University Name"} {edu.grade ? `(Grade: ${edu.grade})` : ''}</span>
                                </div>
                                <span className="text-[11px] font-medium whitespace-nowrap">{edu.startYr || "Start"} - {edu.endYr || "End"}</span>
                            </div>
                        ))}
                    </div>
                );
            case 'skills':
                return (
                    <div key={section.id} className="mb-2">
                        <h3 className="text-[13px] font-bold text-gray-900 uppercase border-b border-gray-400 mb-1">
                            {section.name}
                        </h3>
                        <p className="text-[11px] text-gray-800 leading-tight">
                            {skills.map(s => s.name).join(", ")}
                        </p>
                    </div>
                );
            case 'projects':
                return (
                    <div key={section.id} className="mb-2">
                        <h3 className="text-[13px] font-bold text-gray-900 uppercase border-b border-gray-400 mb-1">
                            {section.name}
                        </h3>
                        {projects.map((project, index) => (
                            <div key={index} className="mb-1">
                                <div className="font-bold text-[12px]">
                                    {project.name || "Project Title"}
                                    {project.url && <span className="font-normal text-[11px]"> | {project.url}</span>}
                                </div>
                                <p className="text-[11px] text-gray-800 leading-tight">
                                    {project.description || "Project description."}
                                </p>
                            </div>
                        ))}
                    </div>
                );
            default:
                if (section.id.startsWith('custom-')) {
                    const items = customSections[section.id] || [];
                    return (
                        <div key={section.id} className="mb-2">
                            <h3 className="text-[13px] font-bold text-gray-900 uppercase border-b border-gray-400 mb-1">
                                {section.name}
                            </h3>
                            {items.map((item, index) => (
                                <div key={index} className="mb-1">
                                    <div className="flex justify-between items-baseline">
                                        <span className="font-bold text-[12px]">{item.title} <span className="font-medium italic">{item.subtitle}</span></span>
                                        <span className="text-[11px] font-medium whitespace-nowrap">{item.date}</span>
                                    </div>
                                    <p className="text-[11px] text-gray-800 leading-tight">
                                        {item.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    );
                }
                return null;
        }
    };

    return (
        <div className="w-[794px] h-[1123px] bg-white text-black font-sans px-8 py-8 relative overflow-hidden flex flex-col box-border leading-tight">
            {/* Header */}
            <div className="text-center mb-3">
                <h1 className="text-2xl font-bold uppercase mb-1">{about.name || "Aman Verma"}</h1>
                <div className="text-[11px] flex flex-wrap justify-center gap-1.5 text-gray-800">
                    {about.email && <span>{about.email}</span>}
                    {about.email && about.phone && <span>|</span>}
                    {about.phone && <span>{about.phone}</span>}
                    {(about.email || about.phone) && about.address && <span>|</span>}
                    {about.address && <span>{about.address}</span>}
                    {(about.email || about.phone || about.address) && about.linkedin && <span>|</span>}
                    {about.linkedin && <span>{about.linkedin}</span>}
                </div>
            </div>

            {/* Sections */}
            <div className="flex flex-col flex-1">
                {sections.map(section => renderSection(section))}
            </div>
        </div>
    );
};

export default TemplateATSCompact;
