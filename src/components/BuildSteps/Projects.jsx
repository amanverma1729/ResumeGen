import React from 'react';
import { useResume } from '../../Context';
import { v4 as uuidv4 } from 'uuid';
import { MdDelete } from 'react-icons/md';

const inputClass = "w-full px-3 py-2 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 mb-3";

const Projects = () => {
    const { projects, setProjects } = useResume();

    const addMore = () => {
        setProjects([...projects, { id: uuidv4(), name: "", description: "", url: "" }]);
    }

    const handleChange = (e, id) => {
        const { name, value } = e.target;
        const updatedProject = projects.map((project) => (
            project.id === id ? Object.assign({}, project, { [name]: value }) : project
        ));
        setProjects(updatedProject);
    }

    const deleteProject = (id) => {
        setProjects(projects.filter((elem) => elem.id !== id))
    }

    return (
        <div className="flex flex-col">
            {projects.map((project, index) => (
                <details key={project.id || index} className="border border-gray-200 rounded-md mb-4" open={index === 0}>
                    <summary className="bg-gray-50 px-4 py-3 font-medium cursor-pointer hover:bg-gray-100 transition-colors outline-none">
                        {project.name || "Project Name"}
                    </summary>
                    <div className="p-4 flex flex-col space-y-3 items-end">
                        <input value={project.name || ""} onChange={(e) => handleChange(e, project.id)} name='name' type='text' className={inputClass} placeholder='Project Name' />
                        <input value={project.url || ""} onChange={(e) => handleChange(e, project.id)} name='url' type='url' className={inputClass} placeholder='Project URL' />
                        <textarea value={project.description || ""} onChange={(e) => handleChange(e, project.id)} name='description' className={`${inputClass} min-h-[100px] resize-y`} placeholder='Description...' />

                        <button 
                            onClick={() => deleteProject(project.id)} 
                            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md font-medium transition-colors"
                        >
                            <span>Delete</span>
                            <MdDelete size={18} />
                        </button>
                    </div>
                </details>
            ))}

            {projects.length < 4 && (
                <button className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-md my-5 self-start transition-colors" onClick={addMore}>
                    Add More
                </button>
            )}
        </div>
    )
}

export default Projects;
