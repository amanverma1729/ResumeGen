import React from "react";
import { useResume } from "../../Context";

const TemplateATSClassic = () => {
    const { theme, about, educationList, skills, workList, projects, sections, customSections } = useResume();

    const renderSection = (section) => {
        switch (section.id) {
            case 'work':
                return (
                    <div key={section.id} className="mb-6">
                        <h3 className="text-lg font-bold text-black uppercase border-b border-black mb-2 pb-1">
                            {section.name}
                        </h3>
                        {workList.map((work, index) => (
                            <div key={index} className="mb-4">
                                <div className="flex justify-between font-bold text-black">
                                    <span>{work.position || "Position Title"}</span>
                                    <span>{work.startDate || "Start"} - {work.endDate || "Present"}</span>
                                </div>
                                <div className="italic text-gray-800 mb-1">
                                    {work.company || "Company Name"}
                                </div>
                                <ul className="list-disc list-inside text-sm text-gray-800 space-y-1">
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
                        <h3 className="text-lg font-bold text-black uppercase border-b border-black mb-2 pb-1">
                            {section.name}
                        </h3>
                        {educationList.map((edu, index) => (
                            <div key={index} className="mb-3">
                                <div className="flex justify-between font-bold text-black">
                                    <span>{edu.school || "University Name"}</span>
                                    <span>{edu.startYr || "Start"} - {edu.endYr || "End"}</span>
                                </div>
                                <div className="text-gray-800">
                                    {edu.degree || "Degree Title"} {edu.grade ? `| Grade: ${edu.grade}` : ''}
                                </div>
                            </div>
                        ))}
                    </div>
                );
            case 'skills':
                return (
                    <div key={section.id} className="mb-6">
                        <h3 className="text-lg font-bold text-black uppercase border-b border-black mb-2 pb-1">
                            {section.name}
                        </h3>
                        <p className="text-sm text-gray-800 leading-relaxed">
                            {skills.map(s => s.name).join(", ")}
                        </p>
                    </div>
                );
            case 'projects':
                return (
                    <div key={section.id} className="mb-6">
                        <h3 className="text-lg font-bold text-black uppercase border-b border-black mb-2 pb-1">
                            {section.name}
                        </h3>
                        {projects.map((project, index) => (
                            <div key={index} className="mb-4">
                                <div className="font-bold text-black">
                                    {project.name || "Project Title"}
                                    {project.url && <span className="font-normal text-sm text-gray-600"> - {project.url}</span>}
                                </div>
                                <ul className="list-disc list-inside text-sm text-gray-800 mt-1 space-y-1">
                                    {(project.description || "Project description.").split('\n').map((line, i) => (
                                        <li key={i}>{line}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                );
            default:
                if (section.id.startsWith('custom-')) {
                    const items = customSections[section.id] || [];
                    return (
                        <div key={section.id} className="mb-6">
                            <h3 className="text-lg font-bold text-black uppercase border-b border-black mb-2 pb-1">
                                {section.name}
                            </h3>
                            {items.map((item, index) => (
                                <div key={index} className="mb-4">
                                    <div className="flex justify-between font-bold text-black">
                                        <span>{item.title}</span>
                                        <span>{item.date}</span>
                                    </div>
                                    <div className="italic text-gray-800 mb-1">{item.subtitle}</div>
                                    <ul className="list-disc list-inside text-sm text-gray-800 space-y-1">
                                        {(item.description || "").split('\n').map((line, i) => (
                                            <li key={i}>{line}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    );
                }
                return null;
        }
    };

    return (
        <div className="w-[794px] h-[1123px] bg-white text-black font-serif px-12 py-10 relative overflow-hidden flex flex-col box-border">
            {/* Header */}
            <div className="text-center mb-6">
                <h1 className="text-3xl font-bold uppercase tracking-wide mb-2">{about.name || "Aman Verma"}</h1>
                <div className="text-sm flex flex-wrap justify-center gap-2 text-gray-700">
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

export default TemplateATSClassic;
