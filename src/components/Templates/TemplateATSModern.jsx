import React from "react";
import { useResume } from "../../Context";

const TemplateATSModern = () => {
    const { theme, about, educationList, skills, workList, projects, sections, customSections } = useResume();

    const accentColor = "#2563eb"; // User specified blue accent

    const renderSection = (section) => {
        switch (section.id) {
            case 'work':
                return (
                    <div key={section.id} className="mb-6">
                        <h3 className="text-xl font-bold uppercase mb-3 pb-1" style={{ color: accentColor, borderBottom: `2px solid ${accentColor}` }}>
                            {section.name}
                        </h3>
                        {workList.map((work, index) => (
                            <div key={index} className="mb-4">
                                <div className="flex justify-between items-end">
                                    <span className="font-bold text-gray-900 text-lg">{work.position || "Position Title"}</span>
                                    <span className="text-sm font-semibold text-gray-600">{work.startDate || "Start"} - {work.endDate || "Present"}</span>
                                </div>
                                <div className="text-md font-medium text-gray-700 mb-2">
                                    {work.company || "Company Name"}
                                </div>
                                <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                                    {work.description || "Description of your responsibilities."}
                                </p>
                            </div>
                        ))}
                    </div>
                );
            case 'education':
                return (
                    <div key={section.id} className="mb-6">
                        <h3 className="text-xl font-bold uppercase mb-3 pb-1" style={{ color: accentColor, borderBottom: `2px solid ${accentColor}` }}>
                            {section.name}
                        </h3>
                        {educationList.map((edu, index) => (
                            <div key={index} className="mb-3">
                                <div className="flex justify-between items-end">
                                    <span className="font-bold text-gray-900 text-lg">{edu.degree || "Degree Title"}</span>
                                    <span className="text-sm font-semibold text-gray-600">{edu.startYr || "Start"} - {edu.endYr || "End"}</span>
                                </div>
                                <div className="text-md font-medium text-gray-700">
                                    {edu.school || "University Name"} {edu.grade ? `• Grade: ${edu.grade}` : ''}
                                </div>
                            </div>
                        ))}
                    </div>
                );
            case 'skills':
                return (
                    <div key={section.id} className="mb-6">
                        <h3 className="text-xl font-bold uppercase mb-3 pb-1" style={{ color: accentColor, borderBottom: `2px solid ${accentColor}` }}>
                            {section.name}
                        </h3>
                        <p className="text-sm text-gray-700 leading-relaxed font-medium">
                            {skills.map(s => s.name).join(" • ")}
                        </p>
                    </div>
                );
            case 'projects':
                return (
                    <div key={section.id} className="mb-6">
                        <h3 className="text-xl font-bold uppercase mb-3 pb-1" style={{ color: accentColor, borderBottom: `2px solid ${accentColor}` }}>
                            {section.name}
                        </h3>
                        {projects.map((project, index) => (
                            <div key={index} className="mb-4">
                                <div className="font-bold text-gray-900 text-lg">
                                    {project.name || "Project Title"}
                                </div>
                                {project.url && <div className="text-sm text-blue-600 mb-1">{project.url}</div>}
                                <p className="text-sm text-gray-700 mt-1 leading-relaxed whitespace-pre-wrap">
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
                            <h3 className="text-xl font-bold uppercase mb-3 pb-1" style={{ color: accentColor, borderBottom: `2px solid ${accentColor}` }}>
                                {section.name}
                            </h3>
                            {items.map((item, index) => (
                                <div key={index} className="mb-4">
                                    <div className="flex justify-between items-end">
                                        <span className="font-bold text-gray-900 text-lg">{item.title}</span>
                                        <span className="text-sm font-semibold text-gray-600">{item.date}</span>
                                    </div>
                                    <div className="text-md font-medium text-gray-700 mb-2">{item.subtitle}</div>
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
        <div className="w-[794px] h-[1123px] bg-white text-gray-900 font-sans px-12 py-10 relative overflow-hidden flex flex-col box-border">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-4xl font-extrabold tracking-tight mb-2" style={{ color: accentColor }}>
                    {about.name || "Aman Verma"}
                </h1>
                {about.role && <h2 className="text-xl font-semibold text-gray-700 mb-3">{about.role}</h2>}
                <div className="text-sm flex flex-wrap gap-x-4 gap-y-1 text-gray-600 font-medium">
                    {about.email && <span>{about.email}</span>}
                    {about.phone && <span>{about.phone}</span>}
                    {about.address && <span>{about.address}</span>}
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

export default TemplateATSModern;
