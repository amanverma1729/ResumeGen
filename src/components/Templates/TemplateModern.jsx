import React from "react";
import { useResume } from "../../Context";
import { MdMail, MdLocalPhone, MdLocationPin } from "react-icons/md";
import { RiLinkedinBoxFill } from "react-icons/ri";
import { BiLinkExternal } from "react-icons/bi";

const TemplateModern = () => {
    const { theme, about, educationList, skills, workList, projects, sections, customSections } = useResume();
    
    const renderSection = (section) => {
        switch(section.id) {
            case 'work':
                return (
                    <div key={section.id} className="flex flex-col w-full mb-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-4 uppercase tracking-wider border-b-2 pb-1 inline-block w-full" style={{ borderColor: theme }}>
                            {section.name}
                        </h3>
                        {workList.map((work, index) => (
                            <div key={index} className="flex flex-col w-full mb-5">
                                <h4 className="font-bold text-gray-900 text-lg">
                                    {work.position || "Position Title"}
                                </h4>
                                <div className="flex justify-between items-center mb-1">
                                    <span className="font-semibold text-gray-700" style={{ color: theme }}>{work.company || "Company Name"}</span>
                                    <span className="text-sm font-medium text-gray-500 bg-gray-100 px-2 rounded">{work.startDate || "Start"} - {work.endDate || "Present"}</span>
                                </div>
                                <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                                    {work.description || "Description of your responsibilities and achievements."}
                                </p>
                            </div>
                        ))}
                    </div>
                );
            case 'education':
                return (
                    <div key={section.id} className="flex flex-col w-full mb-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-4 uppercase tracking-wider border-b-2 pb-1 inline-block w-full" style={{ borderColor: theme }}>
                            {section.name}
                        </h3>
                        {educationList.map((education, index) => (
                            <div key={index} className="flex flex-col w-full mb-4">
                                <h4 className="font-bold text-gray-900 text-lg">
                                    {education.degree || "Degree Title"}
                                </h4>
                                <div className="flex justify-between items-center">
                                    <span className="font-semibold text-gray-700">{education.school || "University Name"}</span>
                                    <span className="text-sm font-medium text-gray-500">{education.startYr || "Start"} - {education.endYr || "End"}</span>
                                </div>
                                {education.grade && <p className="text-sm text-gray-600 mt-1">Grade: {education.grade}</p>}
                            </div>
                        ))}
                    </div>
                );
            case 'skills':
                return (
                    <div key={section.id} className="flex flex-col w-full mb-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-4 uppercase tracking-wider border-b-2 pb-1 inline-block w-full" style={{ borderColor: theme }}>
                            {section.name}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {skills.map((skill, index) => (
                                <span 
                                    key={index} 
                                    className="text-white px-3 py-1.5 rounded-md text-sm font-bold shadow-sm"
                                    style={{ backgroundColor: theme }}
                                >
                                    {skill.name}
                                </span>
                            ))}
                        </div>
                    </div>
                );
            case 'projects':
                return (
                    <div key={section.id} className="flex flex-col w-full mb-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-4 uppercase tracking-wider border-b-2 pb-1 inline-block w-full" style={{ borderColor: theme }}>
                            {section.name}
                        </h3>
                        {projects.map((project, index) => (
                            <div key={index} className="flex flex-col w-full mb-4 border-l-4 pl-4" style={{ borderColor: theme }}>
                                <div className="flex items-center space-x-2 mb-1">
                                    <span className="font-bold text-gray-900 text-md">{project.name || "Project Title"}</span>
                                    {project.url && (
                                        <a href={project.url} className="text-gray-400 hover:text-gray-600 transition-colors">
                                            <BiLinkExternal size={14} />
                                        </a>
                                    )}
                                </div>
                                <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                                    {project.description || "Project description and key technologies used."}
                                </p>
                            </div>
                        ))}
                    </div>
                );
            default:
                if (section.id.startsWith('custom-')) {
                    const items = customSections[section.id] || [];
                    return (
                        <div key={section.id} className="flex flex-col w-full mb-6">
                            <h3 className="text-xl font-bold text-gray-800 mb-4 uppercase tracking-wider border-b-2 pb-1 inline-block w-full" style={{ borderColor: theme }}>
                                {section.name}
                            </h3>
                            {items.map((item, index) => (
                                <div key={index} className="flex flex-col w-full mb-5">
                                    <h4 className="font-bold text-gray-900 text-lg">
                                        {item.title}
                                    </h4>
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="font-semibold text-gray-700" style={{ color: theme }}>{item.subtitle}</span>
                                        <span className="text-sm font-medium text-gray-500 bg-gray-100 px-2 rounded">{item.date}</span>
                                    </div>
                                    <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
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
        <div className="w-[794px] h-[1123px] bg-white text-gray-800 font-sans shadow-2xl relative overflow-hidden flex flex-col">
            {/* Header */}
            <div className="flex flex-row items-center border-b border-gray-100 pb-4 pt-8 px-8 shrink-0">
                {about.picture && (
                    <img 
                        src={about.picture} 
                        alt="avatar" 
                        className="w-[115px] h-[115px] rounded-full object-cover mr-6 border-4 border-gray-50"
                    />
                )}

                <div className="flex flex-col flex-1">
                    <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
                        {about.name || "Aman Verma"}
                    </h1>
                    <h2 className="text-xl text-gray-500 font-medium mt-1 uppercase tracking-widest" style={{ color: theme }}>
                        {about.role || "Full Stack Web Developer"}
                    </h2>
                </div>
            </div>

            {/* Contact Bar */}
            <div className="flex flex-row flex-wrap text-white px-8 py-3 justify-between items-center text-sm shrink-0" style={{ backgroundColor: theme }}>
                <div className="flex items-center space-x-2">
                    <MdMail size={16} /> <span>{about.email || "hello@example.com"}</span>
                </div>
                <div className="flex items-center space-x-2">
                    <MdLocalPhone size={16} /> <span>{about.phone || "+91 000 000 0000"}</span>
                </div>
                <div className="flex items-center space-x-2">
                    <MdLocationPin size={16} /> <span>{about.address || "City, Country"}</span>
                </div>
                <div className="flex items-center space-x-2">
                    <RiLinkedinBoxFill size={16} /> <span>{about.linkedin || "linkedin.com/in/username"}</span>
                </div>
            </div>

            {/* Main Content Area - Single Column Mapping */}
            <div className="flex flex-col flex-1 w-full px-12 py-8 overflow-hidden">
                {sections.map(section => renderSection(section))}
            </div>
        </div>
    );
};

export default TemplateModern;
