import React from 'react';
import { useResume } from '../../Context';
import { v4 as uuidv4 } from 'uuid';
import { MdDelete } from 'react-icons/md';

const inputClass = "w-full px-3 py-2 bg-flowcv-input rounded-xl h-12 px-4 focus:outline-none focus:ring-2 focus:ring-purple-500 mb-3";
const labelClass = "block text-flowcv-text text-[14px] font-bold mb-1";

const Work = () => {
    const { workList, setWorkList } = useResume();

    const addMore = () => {
        setWorkList([...workList, { id: uuidv4(), position: "", company: "", type: "", startDate: "", endDate: "", description: "" }]);
    }

    const handleChange = (e, id) => {
        const { name, value } = e.target;
        const updatedWorkList = workList.map((work) => (
            work.id === id ? { ...work, [name]: value } : work
        ));
        setWorkList(updatedWorkList);
    }

    const deleteWork = (id) => {
        setWorkList(workList.filter((elem) => elem.id !== id))
    }

    return (
        <div className="flex flex-col">
            {workList.map((work, index) => (
                <details key={work.id || index} className="bg-white rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-gray-50 mb-4" open={index === 0}>
                    <summary className="bg-flowcv-gray px-5 py-4 font-bold cursor-pointer hover:bg-gray-200 rounded-xl text-flowcv-text transition-colors outline-none">
                        {work.position || "Position"}
                    </summary>
                    <div className="p-4 flex flex-col">
                        <input value={work.position || ""} onChange={(e) => handleChange(e, work.id)} name='position' type='text' className={inputClass} placeholder='Position' />

                        <div className="flex flex-col md:flex-row md:space-x-4 mb-1">
                            <div className="flex-1">
                                <input value={work.company || ""} onChange={(e) => handleChange(e, work.id)} name='company' type='text' className={inputClass} placeholder='Company' />
                            </div>
                            <div className="flex-1">
                                <select 
                                    value={work.type || ""} 
                                    onChange={(e) => handleChange(e, work.id)} 
                                    name='type' 
                                    className={`${inputClass} appearance-none`}
                                >
                                    <option value='' disabled>Employment Type</option>
                                    <option value='Full-time'>Full-time</option>
                                    <option value='Part-time'>Part-time</option>
                                    <option value='Internship'>Internship</option>
                                    <option value='Freelance'>Freelance</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row md:space-x-4 mb-2">
                            <div className="flex-1">
                                <label htmlFor={`startDate-${index}`} className={labelClass}>Start Date</label>
                                <input value={work.startDate || ""} onChange={(e) => handleChange(e, work.id)} name='startDate' id={`startDate-${index}`} type='month' className={inputClass} placeholder='Start Date' />
                            </div>
                            <div className="flex-1">
                                <label htmlFor={`endDate-${index}`} className={labelClass}>End Date</label>
                                <input value={work.endDate || ""} onChange={(e) => handleChange(e, work.id)} name='endDate' id={`endDate-${index}`} type='month' className={inputClass} placeholder='End Date' />
                            </div>
                        </div>

                        <div className="mb-2">
                            <label htmlFor={`description-${index}`} className={labelClass}>Description</label>
                            <textarea value={work.description || ""} onChange={(e) => handleChange(e, work.id)} name='description' id={`description-${index}`} className={`${inputClass} min-h-[100px] resize-y`} placeholder='Description...' />
                        </div>

                        <button 
                            onClick={() => deleteWork(work.id)} 
                            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md font-medium transition-colors w-max"
                        >
                            <span>Delete</span>
                            <MdDelete size={18} />
                        </button>
                    </div>
                </details>
            ))}

            {workList.length < 3 && (
                <button className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-md my-5 self-start transition-colors" onClick={addMore}>
                    Add More
                </button>
            )}
        </div>
    )
}

export default Work;

