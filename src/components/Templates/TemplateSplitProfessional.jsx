import React from "react";
import { useResume } from "../../Context";
import { MdMail, MdLocalPhone, MdLocationPin, MdCalendarToday } from "react-icons/md";
import { RiLinkedinBoxFill } from "react-icons/ri";

const TemplateSplitProfessional = () => {
    const { theme, about, educationList, skills, workList, projects, sections, customSections } = useResume();
    const highlightColor = theme || "#374151"; // Default dark color if none selected

    const renderSection = (section, isRightColumn) => {
        const titleClass = "text-[15px] font-bold uppercase tracking-wider pb-1 mb-4 border-b-2";
        const titleStyle = { borderColor: highlightColor, color: highlightColor };

        switch (section.id) {
            case 'work':
                return (
                    <div key={section.id} className="mb-6">
                        <h3 className={titleClass} style={titleStyle}>{section.name}</h3>
                        {workList.map((work, index) => (
                            <div key={index} className="mb-5">
                                <h4 className="font-bold text-[15px] text-gray-900 leading-tight mb-0.5">
                                    {work.position || "Job Title"}
                                </h4>
                                <div className="text-[13px] text-gray-600 font-medium mb-1.5 flex justify-between items-center">
                                    <span className="italic">{work.company || "Company Name"}</span>
                                    <span className="whitespace-nowrap">{work.startDate || "Start"} - {work.endDate || "Present"}</span>
                                </div>
                                <ul className="list-disc list-outside ml-4 text-[13px] text-gray-700 leading-relaxed space-y-1">
                                    {(work.description || "Description of your responsibilities.").split('\n').map((line, i) => (
                                        <li key={i}>{line}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                );
            case 'education':
                return (
                    <div key={section.id} className="mb-6">
                        <h3 className={titleClass} style={titleStyle}>{section.name}</h3>
                        {educationList.map((edu, index) => (
                            <div key={index} className="mb-4">
                                <h4 className="font-bold text-[14px] text-gray-900 leading-tight mb-0.5">
                                    {edu.degree || "Degree Title"}
                                </h4>
                                <div className="text-[13px] text-gray-600 font-medium mb-1 flex justify-between items-center">
                                    <span>{edu.school || "University Name"}</span>
                                    <span className="whitespace-nowrap">{edu.startYr || "Start"} - {edu.endYr || "End"}</span>
                                </div>
                                {edu.grade && <div className="text-[13px] text-gray-700">Grade: {edu.grade}</div>}
                            </div>
                        ))}
                    </div>
                );
            case 'skills':
                return (
                    <div key={section.id} className="mb-6">
                        <h3 className={titleClass} style={titleStyle}>{section.name}</h3>
                        <div className="flex flex-col gap-2">
                            {skills.map((skill, index) => (
                                <div key={index} className="text-[13px] font-semibold text-gray-800 flex justify-between items-center border-b border-gray-200 pb-1">
                                    <span>{skill.name}</span>
                                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: highlightColor }}></span>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case 'projects':
                return (
                    <div key={section.id} className="mb-6">
                        <h3 className={titleClass} style={titleStyle}>{section.name}</h3>
                        {projects.map((project, index) => (
                            <div key={index} className="mb-4">
                                <div className="font-bold text-[14px] text-gray-900 flex flex-col gap-0.5 mb-1">
                                    <span>{project.name || "Project Title"}</span>
                                    {project.url && <a href={project.url} className="font-normal text-[12px] text-blue-600 underline">{project.url}</a>}
                                </div>
                                <p className="text-[13px] text-gray-700 leading-relaxed whitespace-pre-wrap">
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
                        <div key={section.id} className="mb-6">
                            <h3 className={titleClass} style={titleStyle}>{section.name}</h3>
                            {items.map((item, index) => (
                                <div key={index} className="mb-4">
                                    <h4 className="font-bold text-[14px] text-gray-900 leading-tight mb-0.5">
                                        {item.title}
                                    </h4>
                                    <div className="text-[13px] text-gray-600 font-medium mb-1 flex justify-between items-center">
                                        <span className="italic">{item.subtitle}</span>
                                        <span className="whitespace-nowrap">{item.date}</span>
                                    </div>
                                    <p className="text-[13px] text-gray-700 leading-relaxed whitespace-pre-wrap">
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

    // Partition sections
    const leftColumnSections = sections.filter(s => s.column !== 'right');
    const rightColumnSections = sections.filter(s => s.column === 'right');

    return (
        <div className="w-[794px] h-[1123px] bg-white text-gray-900 font-serif relative overflow-hidden flex flex-col box-border">
            
            {/* Header */}
            <div className="flex px-10 pt-10 pb-6 border-b border-gray-300">
                <div className="flex-1">
                    <h1 className="text-[38px] font-bold uppercase tracking-tight text-gray-900 mb-1 leading-none" style={{ color: highlightColor }}>
                        {about.name || "ZOE THOMPSON"}
                    </h1>
                    {about.role && (
                        <h2 className="text-[16px] font-semibold text-gray-600 tracking-wide uppercase">
                            {about.role}
                        </h2>
                    )}
                </div>
                <div className="flex flex-col justify-end text-[12px] text-gray-700 font-sans text-right gap-1.5 ml-4">
                    {about.phone && (
                        <div className="flex items-center justify-end gap-1.5">
                            <span>{about.phone}</span>
                            <MdLocalPhone size={14} style={{ color: highlightColor }} />
                        </div>
                    )}
                    {about.email && (
                        <div className="flex items-center justify-end gap-1.5">
                            <span>{about.email}</span>
                            <MdMail size={14} style={{ color: highlightColor }} />
                        </div>
                    )}
                    {about.linkedin && (
                        <div className="flex items-center justify-end gap-1.5">
                            <span>{about.linkedin}</span>
                            <RiLinkedinBoxFill size={14} style={{ color: highlightColor }} />
                        </div>
                    )}
                    {about.address && (
                        <div className="flex items-center justify-end gap-1.5">
                            <span>{about.address}</span>
                            <MdLocationPin size={14} style={{ color: highlightColor }} />
                        </div>
                    )}
                </div>
            </div>

            {/* Main Content Two Columns */}
            <div className="flex-1 flex flex-row">
                {/* Left Column (Main Experience/Education) */}
                <div className="flex-[3] flex flex-col p-10 pt-8 box-border border-r border-gray-200">
                    {leftColumnSections.map(section => renderSection(section, false))}
                </div>

                {/* Right Column (Skills/Projects/etc) */}
                <div className="flex-[2] flex flex-col p-10 pt-8 box-border bg-gray-50/30">
                    {rightColumnSections.map(section => renderSection(section, true))}
                </div>
            </div>
        </div>
    );
};

export default TemplateSplitProfessional;
