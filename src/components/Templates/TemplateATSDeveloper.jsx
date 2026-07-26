import React from "react";
import { useResume } from "../../Context";

const TemplateATSDeveloper = () => {
    const { theme, about, educationList, skills, workList, projects, sections, customSections } = useResume();

    const renderSection = (section) => {
        switch (section.id) {
            case 'work':
                return (
                    <div key={section.id} className="mb-5">
                        <h3 className="text-lg font-bold text-gray-900 border-b-2 border-gray-800 mb-2 uppercase">
                            {section.name}
                        </h3>
                        {workList.map((work, index) => (
                            <div key={index} className="mb-4">
                                <div className="flex justify-between font-bold text-gray-900">
                                    <span>{work.position || "Software Engineer"}</span>
                                    <span>{work.startDate || "Start"} - {work.endDate || "Present"}</span>
                                </div>
                                <div className="text-gray-800 font-medium mb-1">
                                    {work.company || "Company Name"}
                                </div>
                                <ul className="list-disc list-outside ml-5 text-sm text-gray-800 space-y-1">
                                    {(work.description || "Developed robust software solutions.").split('\n').map((line, i) => (
                                        <li key={i}>{line}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                );
            case 'education':
                return (
                    <div key={section.id} className="mb-5">
                        <h3 className="text-lg font-bold text-gray-900 border-b-2 border-gray-800 mb-2 uppercase">
                            {section.name}
                        </h3>
                        {educationList.map((edu, index) => (
                            <div key={index} className="mb-3">
                                <div className="flex justify-between font-bold text-gray-900">
                                    <span>{edu.school || "University Name"}</span>
                                    <span>{edu.startYr || "Start"} - {edu.endYr || "End"}</span>
                                </div>
                                <div className="text-gray-800 text-sm">
                                    {edu.degree || "Bachelor of Science in Computer Science"} {edu.grade ? `| ${edu.grade}` : ''}
                                </div>
                            </div>
                        ))}
                    </div>
                );
            case 'skills':
                return (
                    <div key={section.id} className="mb-5">
                        <h3 className="text-lg font-bold text-gray-900 border-b-2 border-gray-800 mb-2 uppercase">
                            {section.name}
                        </h3>
                        <p className="text-sm text-gray-800 leading-relaxed font-medium">
                            {skills.map(s => s.name).join(" • ")}
                        </p>
                    </div>
                );
            case 'projects':
                return (
                    <div key={section.id} className="mb-5">
                        <h3 className="text-lg font-bold text-gray-900 border-b-2 border-gray-800 mb-2 uppercase">
                            {section.name}
                        </h3>
                        {projects.map((project, index) => (
                            <div key={index} className="mb-4">
                                <div className="font-bold text-gray-900 flex items-baseline gap-2">
                                    <span>{project.name || "Project Title"}</span>
                                    {project.url && <span className="font-normal text-sm text-blue-600 underline"><a href={project.url}>{project.url}</a></span>}
                                </div>
                                <ul className="list-disc list-outside ml-5 text-sm text-gray-800 mt-1 space-y-1">
                                    {(project.description || "Project description highlighting tech stack and features.").split('\n').map((line, i) => (
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
                        <div key={section.id} className="mb-5">
                            <h3 className="text-lg font-bold text-gray-900 border-b-2 border-gray-800 mb-2 uppercase">
                                {section.name}
                            </h3>
                            {items.map((item, index) => (
                                <div key={index} className="mb-4">
                                    <div className="flex justify-between font-bold text-gray-900">
                                        <span>{item.title}</span>
                                        <span>{item.date}</span>
                                    </div>
                                    <div className="text-gray-800 font-medium mb-1">{item.subtitle}</div>
                                    <ul className="list-disc list-outside ml-5 text-sm text-gray-800 space-y-1">
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
        <div className="w-[794px] h-[1123px] bg-white text-gray-900 font-sans px-10 py-10 relative overflow-hidden flex flex-col box-border font-mono-headers">
            {/* Header */}
            <div className="text-center mb-6">
                <h1 className="text-3xl font-extrabold uppercase mb-1">{about.name || "Aman Verma"}</h1>
                <h2 className="text-lg font-bold text-gray-700 mb-2">{about.role || "Software Developer"}</h2>
                <div className="text-sm flex flex-wrap justify-center gap-3 text-gray-700 font-medium">
                    {about.email && <span>{about.email}</span>}
                    {about.phone && <span>{about.phone}</span>}
                    {about.linkedin && <span>{about.linkedin}</span>}
                    {about.address && <span>{about.address}</span>}
                    {about.github && <span>{about.github}</span>}
                    {about.portfolio && <span>{about.portfolio}</span>}
                </div>
            </div>

            {/* Sections */}
            <div className="flex flex-col flex-1">
                {sections.map(section => renderSection(section))}
            </div>
        </div>
    );
};

export default TemplateATSDeveloper;
