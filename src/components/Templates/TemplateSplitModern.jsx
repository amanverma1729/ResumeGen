import React from "react";
import { useResume } from "../../Context";
import { MdMail, MdLocalPhone, MdLocationPin, MdCalendarToday } from "react-icons/md";
import { RiLinkedinBoxFill } from "react-icons/ri";

const TemplateSplitModern = () => {
    const { theme, about, educationList, skills, workList, projects, sections, customSections } = useResume();

    const renderSection = (section, isRightColumn = false) => {
        switch (section.id) {
            case 'work':
                return (
                    <div key={section.id} className="mb-6">
                        <h3 className="text-[14px] font-bold text-gray-800 uppercase tracking-widest border-b-[1.5px] border-gray-400 pb-1 mb-3">
                            {section.name}
                        </h3>
                        {workList.map((work, index) => (
                            <div key={index} className="mb-5">
                                <h4 className="font-bold text-[15px] text-gray-900 leading-tight mb-0.5">
                                    {work.position || "Job Title"}
                                </h4>
                                <div className="text-[13px] text-gray-600 font-medium mb-1.5 flex items-center gap-3">
                                    <span>{work.company || "Company Name"}</span>
                                    <div className="flex items-center gap-1">
                                        <MdCalendarToday size={12} />
                                        <span>{work.startDate || "Start"} - {work.endDate || "Present"}</span>
                                    </div>
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
                        <h3 className="text-[14px] font-bold text-gray-800 uppercase tracking-widest border-b-[1.5px] border-gray-400 pb-1 mb-3">
                            {section.name}
                        </h3>
                        {educationList.map((edu, index) => (
                            <div key={index} className="mb-4">
                                <h4 className="font-bold text-[14px] text-gray-900 leading-tight mb-0.5">
                                    {edu.degree || "Degree Title"}
                                </h4>
                                <div className="text-[13px] text-gray-600 font-medium mb-1 flex items-center gap-3">
                                    <span>{edu.school || "University Name"}</span>
                                    <div className="flex items-center gap-1">
                                        <MdCalendarToday size={12} />
                                        <span>{edu.startYr || "Start"} - {edu.endYr || "End"}</span>
                                    </div>
                                </div>
                                {edu.grade && <div className="text-[13px] text-gray-700">Grade: {edu.grade}</div>}
                            </div>
                        ))}
                    </div>
                );
            case 'skills':
                return (
                    <div key={section.id} className="mb-6">
                        <h3 className="text-[14px] font-bold text-gray-800 uppercase tracking-widest border-b-[1.5px] border-gray-400 pb-1 mb-3">
                            {section.name}
                        </h3>
                        <div className="flex flex-col gap-3">
                            <div className="flex flex-wrap gap-x-4 gap-y-2">
                                {skills.map((skill, index) => (
                                    <div key={index} className="text-[13px] font-semibold text-gray-800 border-b border-gray-300 pb-0.5">
                                        {skill.name}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                );
            case 'projects':
                return (
                    <div key={section.id} className="mb-6">
                        <h3 className="text-[14px] font-bold text-gray-800 uppercase tracking-widest border-b-[1.5px] border-gray-400 pb-1 mb-3">
                            {section.name}
                        </h3>
                        {projects.map((project, index) => (
                            <div key={index} className="mb-4">
                                <div className="font-bold text-[14px] text-gray-900 flex items-center gap-2 mb-1">
                                    <span>{project.name || "Project Title"}</span>
                                    {project.url && <span className="font-normal text-[12px] text-blue-600 underline"><a href={project.url}>{project.url}</a></span>}
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
                            <h3 className="text-[14px] font-bold text-gray-800 uppercase tracking-widest border-b-[1.5px] border-gray-400 pb-1 mb-3">
                                {section.name}
                            </h3>
                            {items.map((item, index) => (
                                <div key={index} className="mb-4">
                                    <h4 className="font-bold text-[14px] text-gray-900 leading-tight mb-0.5">
                                        {item.title}
                                    </h4>
                                    <div className="text-[13px] text-gray-600 font-medium mb-1 flex items-center gap-3">
                                        <span>{item.subtitle}</span>
                                        <div className="flex items-center gap-1">
                                            <MdCalendarToday size={12} />
                                            <span>{item.date}</span>
                                        </div>
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

    // Partition sections based on layout
    const leftColumnSections = sections.filter(s => s.column !== 'right');
    const rightColumnSections = sections.filter(s => s.column === 'right');

    return (
        <div className="w-[794px] h-[1123px] bg-white text-gray-900 font-sans p-10 relative overflow-hidden flex flex-col box-border">
            {/* Header */}
            <div className="mb-6 flex flex-col">
                <h1 className="text-[42px] font-extrabold uppercase tracking-tight leading-none text-gray-900 mb-2">
                    {about.name || "ZOE THOMPSON"}
                </h1>
                {about.role && (
                    <h2 className="text-[16px] font-medium text-gray-600 mb-3 tracking-wide">
                        {about.role}
                    </h2>
                )}
                <div className="flex flex-wrap items-center gap-4 text-[12px] text-gray-700 font-medium font-sans">
                    {about.phone && (
                        <div className="flex items-center gap-1.5">
                            <MdLocalPhone size={14} className="text-gray-500" />
                            <span>{about.phone}</span>
                        </div>
                    )}
                    {about.email && (
                        <div className="flex items-center gap-1.5">
                            <MdMail size={14} className="text-gray-500" />
                            <span>{about.email}</span>
                        </div>
                    )}
                    {about.linkedin && (
                        <div className="flex items-center gap-1.5">
                            <RiLinkedinBoxFill size={14} className="text-gray-500" />
                            <span>{about.linkedin}</span>
                        </div>
                    )}
                    {about.address && (
                        <div className="flex items-center gap-1.5">
                            <MdLocationPin size={14} className="text-gray-500" />
                            <span>{about.address}</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Main Content Two Columns */}
            <div className="flex-1 grid grid-cols-12 gap-8">
                {/* Left Column (Main Experience/Education) */}
                <div className="col-span-7 flex flex-col">
                    {leftColumnSections.map(section => renderSection(section, false))}
                </div>

                {/* Right Column (Skills/Projects/etc) */}
                <div className="col-span-5 flex flex-col">
                    {rightColumnSections.map(section => renderSection(section, true))}
                </div>
            </div>
        </div>
    );
};

export default TemplateSplitModern;
