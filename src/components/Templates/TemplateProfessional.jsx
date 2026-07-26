import React from "react";
import { useResume } from "../../Context";

const TemplateProfessional = () => {
    const { theme, about, educationList, skills, workList, projects, sections, customSections } = useResume();
    
    const renderSection = (section) => {
        switch(section.id) {
            case 'work':
                return (
                    <div key={section.id} className="flex flex-col w-full mb-6">
                        <h3 className="text-lg font-bold uppercase tracking-widest mb-3 border-b border-gray-300 pb-1" style={{ color: theme }}>
                            {section.name}
                        </h3>
                        {workList.map((work, index) => (
                            <div key={index} className="flex flex-col w-full mb-4">
                                <div className="flex justify-between items-baseline mb-1">
                                    <h4 className="font-bold text-lg">{work.position || "Position Title"}</h4>
                                    <span className="text-sm font-bold">{work.startDate || "Start"} - {work.endDate || "Present"}</span>
                                </div>
                                <div className="flex justify-between items-baseline mb-2">
                                    <span className="font-semibold italic text-gray-700">{work.company || "Company Name"}</span>
                                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{work.type || "Full-time"}</span>
                                </div>
                                <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap ml-4">
                                    • {work.description || "Description of your responsibilities and achievements."}
                                </p>
                            </div>
                        ))}
                    </div>
                );
            case 'education':
                return (
                    <div key={section.id} className="flex flex-col w-full mb-6">
                        <h3 className="text-lg font-bold uppercase tracking-widest mb-3 border-b border-gray-300 pb-1" style={{ color: theme }}>
                            {section.name}
                        </h3>
                        {educationList.map((education, index) => (
                            <div key={index} className="flex flex-col w-full mb-3">
                                <div className="flex justify-between items-baseline">
                                    <h4 className="font-bold text-md">{education.school || "University Name"}</h4>
                                    <span className="text-sm font-bold">{education.startYr || "Start"} - {education.endYr || "End"}</span>
                                </div>
                                <div className="flex justify-between items-baseline">
                                    <span className="italic text-gray-700 text-sm">{education.degree || "Degree Title"}</span>
                                    {education.grade && <span className="text-sm text-gray-600">Grade: {education.grade}</span>}
                                </div>
                            </div>
                        ))}
                    </div>
                );
            case 'projects':
                return (
                    <div key={section.id} className="flex flex-col w-full mb-6">
                        <h3 className="text-lg font-bold uppercase tracking-widest mb-3 border-b border-gray-300 pb-1" style={{ color: theme }}>
                            {section.name}
                        </h3>
                        {projects.map((project, index) => (
                            <div key={index} className="flex flex-col w-full mb-3">
                                <div className="flex items-baseline space-x-2 mb-1">
                                    <span className="font-bold text-md">{project.name || "Project Title"}</span>
                                    {project.url && <span className="text-xs text-gray-500 italic">({project.url})</span>}
                                </div>
                                <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap ml-4">
                                    • {project.description || "Project description and key technologies used."}
                                </p>
                            </div>
                        ))}
                    </div>
                );
            case 'skills':
                return (
                    <div key={section.id} className="flex flex-col w-full mb-6">
                        <h3 className="text-lg font-bold uppercase tracking-widest mb-3 border-b border-gray-300 pb-1" style={{ color: theme }}>
                            {section.name}
                        </h3>
                        <div className="flex flex-wrap text-sm text-gray-800 leading-relaxed font-medium">
                            {skills.map((skill, index) => (
                                <React.Fragment key={index}>
                                    <span>{skill.name}</span>
                                    {index < skills.length - 1 && <span className="mx-2 text-gray-400">|</span>}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                );
            default:
                if (section.id.startsWith('custom-')) {
                    const items = customSections[section.id] || [];
                    return (
                        <div key={section.id} className="flex flex-col w-full mb-6">
                            <h3 className="text-lg font-bold uppercase tracking-widest mb-3 border-b border-gray-300 pb-1" style={{ color: theme }}>
                                {section.name}
                            </h3>
                            {items.map((item, index) => (
                                <div key={index} className="flex flex-col w-full mb-4 text-left">
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h4 className="font-bold text-lg">{item.title}</h4>
                                        <span className="text-sm font-bold">{item.date}</span>
                                    </div>
                                    <div className="flex justify-between items-baseline mb-2 text-left">
                                        <span className="font-semibold italic text-gray-700">{item.subtitle}</span>
                                    </div>
                                    <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap ml-4">
                                        • {item.description}
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
        <div className="w-[794px] h-[1123px] bg-white text-gray-900 shadow-2xl relative overflow-hidden flex flex-col px-12 py-12 shrink-0" style={{ fontFamily: "'Merriweather', 'Times New Roman', serif" }}>
            
            {/* Header */}
            <div className="flex flex-col items-center border-b-[3px] border-gray-800 pb-5 mb-6 text-center shrink-0">
                <h1 className="text-4xl font-extrabold uppercase tracking-widest mb-2" style={{ color: theme }}>
                    {about.name || "Aman Verma"}
                </h1>
                <h2 className="text-lg font-semibold tracking-wide text-gray-700 uppercase mb-3">
                    {about.role || "Full Stack Web Developer"}
                </h2>
                <div className="flex flex-row flex-wrap justify-center items-center text-sm font-medium text-gray-600 space-x-3">
                    <span>{about.email || "hello@example.com"}</span>
                    <span>•</span>
                    <span>{about.phone || "+91 000 000 0000"}</span>
                    <span>•</span>
                    <span>{about.address || "City, Country"}</span>
                    <span>•</span>
                    <span>{about.linkedin || "linkedin.com/in/username"}</span>
                </div>
            </div>

            {/* Content Body - Single Column Dynamic Mapping */}
            <div className="flex flex-col flex-1 w-full overflow-hidden">
                {sections.map(section => renderSection(section))}
            </div>
        </div>
    );
};

export default TemplateProfessional;
