import React from "react";
import { useResume } from "../../Context";
import { MdMail, MdLocalPhone, MdLocationPin, MdCalendarToday } from "react-icons/md";
import { RiLinkedinBoxFill } from "react-icons/ri";

const TemplateSplitCreative = () => {
    const { theme, about, educationList, skills, workList, projects, sections, customSections } = useResume();
    const primaryColor = theme || "#1f2937"; // default dark gray

    const renderSection = (section, isLeftColumn) => {
        const titleClass = isLeftColumn 
            ? "text-[14px] font-bold text-white uppercase tracking-widest border-b-[1.5px] border-white/30 pb-1 mb-3"
            : "text-[14px] font-bold text-gray-800 uppercase tracking-widest border-b-[1.5px] border-gray-400 pb-1 mb-3";
            
        const textClass = isLeftColumn ? "text-white/90" : "text-gray-700";
        const headingClass = isLeftColumn ? "text-white" : "text-gray-900";
        const subHeadingClass = isLeftColumn ? "text-white/80" : "text-gray-600";

        switch (section.id) {
            case 'work':
                return (
                    <div key={section.id} className="mb-6">
                        <h3 className={titleClass}>{section.name}</h3>
                        {workList.map((work, index) => (
                            <div key={index} className="mb-5">
                                <h4 className={`font-bold text-[15px] leading-tight mb-0.5 ${headingClass}`}>
                                    {work.position || "Job Title"}
                                </h4>
                                <div className={`text-[13px] font-medium mb-1.5 flex flex-col gap-0.5 ${subHeadingClass}`}>
                                    <span>{work.company || "Company Name"}</span>
                                    <div className="flex items-center gap-1">
                                        <MdCalendarToday size={12} />
                                        <span>{work.startDate || "Start"} - {work.endDate || "Present"}</span>
                                    </div>
                                </div>
                                <ul className={`list-disc list-outside ml-4 text-[13px] leading-relaxed space-y-1 ${textClass}`}>
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
                        <h3 className={titleClass}>{section.name}</h3>
                        {educationList.map((edu, index) => (
                            <div key={index} className="mb-4">
                                <h4 className={`font-bold text-[14px] leading-tight mb-0.5 ${headingClass}`}>
                                    {edu.degree || "Degree Title"}
                                </h4>
                                <div className={`text-[13px] font-medium mb-1 flex flex-col gap-0.5 ${subHeadingClass}`}>
                                    <span>{edu.school || "University Name"}</span>
                                    <div className="flex items-center gap-1">
                                        <MdCalendarToday size={12} />
                                        <span>{edu.startYr || "Start"} - {edu.endYr || "End"}</span>
                                    </div>
                                </div>
                                {edu.grade && <div className={`text-[13px] ${textClass}`}>Grade: {edu.grade}</div>}
                            </div>
                        ))}
                    </div>
                );
            case 'skills':
                return (
                    <div key={section.id} className="mb-6">
                        <h3 className={titleClass}>{section.name}</h3>
                        <div className="flex flex-wrap gap-x-2 gap-y-2 mt-2">
                            {skills.map((skill, index) => (
                                <div key={index} className={`text-[12px] font-semibold px-2 py-1 rounded-sm ${isLeftColumn ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-800'}`}>
                                    {skill.name}
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case 'projects':
                return (
                    <div key={section.id} className="mb-6">
                        <h3 className={titleClass}>{section.name}</h3>
                        {projects.map((project, index) => (
                            <div key={index} className="mb-4">
                                <div className={`font-bold text-[14px] flex flex-col gap-0.5 mb-1 ${headingClass}`}>
                                    <span>{project.name || "Project Title"}</span>
                                    {project.url && <span className={`font-normal text-[12px] ${isLeftColumn ? 'text-white/70' : 'text-blue-600'} underline`}><a href={project.url}>{project.url}</a></span>}
                                </div>
                                <p className={`text-[13px] leading-relaxed whitespace-pre-wrap ${textClass}`}>
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
                            <h3 className={titleClass}>{section.name}</h3>
                            {items.map((item, index) => (
                                <div key={index} className="mb-4">
                                    <h4 className={`font-bold text-[14px] leading-tight mb-0.5 ${headingClass}`}>
                                        {item.title}
                                    </h4>
                                    <div className={`text-[13px] font-medium mb-1 flex items-center gap-3 ${subHeadingClass}`}>
                                        <span>{item.subtitle}</span>
                                        <div className="flex items-center gap-1">
                                            <MdCalendarToday size={12} />
                                            <span>{item.date}</span>
                                        </div>
                                    </div>
                                    <p className={`text-[13px] leading-relaxed whitespace-pre-wrap ${textClass}`}>
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
        <div className="w-[794px] h-[1123px] bg-white text-gray-900 font-sans relative overflow-hidden flex flex-row box-border">
            
            {/* Left Column (Sidebar) */}
            <div className="w-[280px] h-full flex flex-col p-8 box-border" style={{ backgroundColor: primaryColor }}>
                <div className="mb-8 mt-4 text-center">
                    {about.picture && (
                        <img 
                            src={about.picture} 
                            alt="Profile" 
                            className="w-[140px] h-[140px] rounded-full object-cover mx-auto mb-4 border-4 border-white/20"
                        />
                    )}
                    <h1 className="text-[28px] font-extrabold uppercase tracking-tight leading-tight text-white mb-1">
                        {about.name || "ZOE THOMPSON"}
                    </h1>
                    {about.role && (
                        <h2 className="text-[14px] font-medium text-white/80 tracking-widest uppercase">
                            {about.role}
                        </h2>
                    )}
                </div>

                <div className="mb-8 flex flex-col gap-3 text-[12px] text-white/90 font-medium">
                    {about.phone && (
                        <div className="flex items-center gap-2">
                            <MdLocalPhone size={16} className="text-white/70" />
                            <span>{about.phone}</span>
                        </div>
                    )}
                    {about.email && (
                        <div className="flex items-center gap-2">
                            <MdMail size={16} className="text-white/70" />
                            <span>{about.email}</span>
                        </div>
                    )}
                    {about.linkedin && (
                        <div className="flex items-center gap-2">
                            <RiLinkedinBoxFill size={16} className="text-white/70" />
                            <span>{about.linkedin}</span>
                        </div>
                    )}
                    {about.address && (
                        <div className="flex items-center gap-2">
                            <MdLocationPin size={16} className="text-white/70" />
                            <span>{about.address}</span>
                        </div>
                    )}
                </div>

                <div className="flex-1 flex flex-col">
                    {leftColumnSections.map(section => renderSection(section, true))}
                </div>
            </div>

            {/* Right Column (Main Content) */}
            <div className="flex-1 h-full flex flex-col p-8 pt-12 box-border bg-gray-50/50">
                {rightColumnSections.map(section => renderSection(section, false))}
            </div>
            
        </div>
    );
};

export default TemplateSplitCreative;
