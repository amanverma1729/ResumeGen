import React from "react";
import { useResume } from "../../Context";

const TemplateATSProfessional = () => {
    const { theme, about, educationList, skills, workList, projects, sections, customSections } = useResume();

    const renderSection = (section) => {
        switch (section.id) {
            case 'work':
                return (
                    <div key={section.id} className="mb-6">
                        <div className="flex items-center mb-4">
                            <h3 className="text-lg font-semibold uppercase text-gray-800 tracking-wider mr-4 shrink-0">
                                {section.name}
                            </h3>
                            <div className="h-px bg-gray-300 flex-1"></div>
                        </div>
                        {workList.map((work, index) => (
                            <div key={index} className="mb-5">
                                <div className="flex justify-between items-start mb-1">
                                    <div>
                                        <span className="font-bold text-gray-900 text-md">{work.position || "Position Title"}</span>
                                        <span className="text-gray-600 mx-2">|</span>
                                        <span className="font-medium text-gray-700">{work.company || "Company Name"}</span>
                                    </div>
                                    <span className="text-sm font-medium text-gray-600 whitespace-nowrap">{work.startDate || "Start"} - {work.endDate || "Present"}</span>
                                </div>
                                <ul className="list-disc list-outside ml-4 text-sm text-gray-700 space-y-1">
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
                        <div className="flex items-center mb-4">
                            <h3 className="text-lg font-semibold uppercase text-gray-800 tracking-wider mr-4 shrink-0">
                                {section.name}
                            </h3>
                            <div className="h-px bg-gray-300 flex-1"></div>
                        </div>
                        {educationList.map((edu, index) => (
                            <div key={index} className="mb-3">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <span className="font-bold text-gray-900">{edu.school || "University Name"}</span>
                                        <div className="text-gray-700 text-sm">
                                            {edu.degree || "Degree Title"} {edu.grade ? `— ${edu.grade}` : ''}
                                        </div>
                                    </div>
                                    <span className="text-sm font-medium text-gray-600 whitespace-nowrap">{edu.startYr || "Start"} - {edu.endYr || "End"}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                );
            case 'skills':
                return (
                    <div key={section.id} className="mb-6">
                        <div className="flex items-center mb-4">
                            <h3 className="text-lg font-semibold uppercase text-gray-800 tracking-wider mr-4 shrink-0">
                                {section.name}
                            </h3>
                            <div className="h-px bg-gray-300 flex-1"></div>
                        </div>
                        <div className="text-sm text-gray-800">
                            <span className="font-semibold">Core Proficiencies: </span>
                            {skills.map(s => s.name).join(", ")}
                        </div>
                    </div>
                );
            case 'projects':
                return (
                    <div key={section.id} className="mb-6">
                        <div className="flex items-center mb-4">
                            <h3 className="text-lg font-semibold uppercase text-gray-800 tracking-wider mr-4 shrink-0">
                                {section.name}
                            </h3>
                            <div className="h-px bg-gray-300 flex-1"></div>
                        </div>
                        {projects.map((project, index) => (
                            <div key={index} className="mb-4">
                                <div className="font-bold text-gray-900 mb-1">
                                    {project.name || "Project Title"}
                                    {project.url && <span className="font-normal text-sm text-gray-500 ml-2">{project.url}</span>}
                                </div>
                                <ul className="list-disc list-outside ml-4 text-sm text-gray-700 space-y-1">
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
                            <div className="flex items-center mb-4">
                                <h3 className="text-lg font-semibold uppercase text-gray-800 tracking-wider mr-4 shrink-0">
                                    {section.name}
                                </h3>
                                <div className="h-px bg-gray-300 flex-1"></div>
                            </div>
                            {items.map((item, index) => (
                                <div key={index} className="mb-4">
                                    <div className="flex justify-between items-start mb-1">
                                        <div>
                                            <span className="font-bold text-gray-900 text-md">{item.title}</span>
                                            {item.subtitle && (
                                                <>
                                                    <span className="text-gray-600 mx-2">|</span>
                                                    <span className="font-medium text-gray-700">{item.subtitle}</span>
                                                </>
                                            )}
                                        </div>
                                        <span className="text-sm font-medium text-gray-600 whitespace-nowrap">{item.date}</span>
                                    </div>
                                    <ul className="list-disc list-outside ml-4 text-sm text-gray-700 space-y-1">
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
        <div className="w-[794px] h-[1123px] bg-white text-gray-900 font-serif px-12 py-10 relative overflow-hidden flex flex-col box-border">
            {/* Header */}
            <div className="text-center mb-8 border-b-2 border-gray-800 pb-6">
                <h1 className="text-3xl font-bold uppercase tracking-widest text-gray-900 mb-2">
                    {about.name || "Aman Verma"}
                </h1>
                {about.role && <h2 className="text-lg font-medium text-gray-600 mb-2">{about.role}</h2>}
                <div className="text-sm flex flex-wrap justify-center items-center gap-3 text-gray-600">
                    {about.email && <span>{about.email}</span>}
                    {about.email && about.phone && <span className="text-gray-300">•</span>}
                    {about.phone && <span>{about.phone}</span>}
                    {(about.email || about.phone) && about.address && <span className="text-gray-300">•</span>}
                    {about.address && <span>{about.address}</span>}
                    {(about.email || about.phone || about.address) && about.linkedin && <span className="text-gray-300">•</span>}
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

export default TemplateATSProfessional;
