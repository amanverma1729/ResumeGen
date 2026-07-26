import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useResume } from '../../Context';

const inputClass = "w-full px-3 py-2 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500";

const Skills = () => {
    const [skill, setSkill] = useState("");
    const { skills, setSkills } = useResume();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!skill || skill.trim() === "") {
            alert("Empty Input");
            return;
        }
        const newSkill = {
            id: uuidv4(),
            name: skill.trim(),
        }
        setSkills([...skills, newSkill]);
        setSkill("");
    }

    const deleteSkill = (id) => {
        setSkills(skills.filter((elem) => elem.id !== id))
    }

    return (
        <div className="flex flex-col">
            <form onSubmit={handleSubmit} className="flex flex-row items-end space-x-4 mb-4">
                <div className="flex-1">
                    <label htmlFor='skill' className="block text-gray-700 text-sm font-bold mb-1">Add Skills</label>
                    <input 
                        onChange={(e) => setSkill(e.target.value)} 
                        value={skill} 
                        name='skill' 
                        id='skill' 
                        type='text' 
                        className={inputClass} 
                        placeholder='Skill' 
                    />
                </div>
                <button type='submit' className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-6 rounded-md transition-colors h-[42px]">
                    Add
                </button>
            </form>

            <div className="border border-gray-200 rounded-md my-4 p-4 flex flex-wrap gap-2">
                {skills.length > 0 ? skills.map((s) => (
                    <span
                        key={s.id}
                        className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm flex items-center gap-2"
                    >
                        <span>{s.name}</span>
                        <button 
                            type="button" 
                            onClick={() => deleteSkill(s.id)}
                            className="hover:text-red-300 focus:outline-none font-bold"
                        >
                            &times;
                        </button>
                    </span>
                )) : (
                    <span className="text-gray-500 text-sm">No Skills Added</span>
                )}
            </div>
        </div>
    )
}

export default Skills;
