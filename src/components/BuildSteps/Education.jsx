import React from 'react';
import { useResume } from '../../Context';

const inputClass = "w-full px-3 py-2 bg-flowcv-input rounded-xl h-12 px-4 focus:outline-none focus:ring-2 focus:ring-purple-500 mb-3";
const labelClass = "block text-flowcv-text text-[14px] font-bold mb-1";

const Education = () => {
    const { educationList, setEducationList } = useResume();

    const addMore = () => {
        setEducationList([...educationList, {
            id: "",
            degree: "",
            school: "",
            startYr: 0,
            endYr: 0,
            grade: "",
        }]);
    }

    const handleChange = (e, index) => {
        const { name, value } = e.target;
        const updatedEducation = educationList.map((edu, i) => (
            index === i ? { ...edu, [name]: value } : edu
        ));

        setEducationList(updatedEducation);
    }

    return (
        <div className="flex flex-col">
            {educationList.map((education, index) => (
                <details key={index} className="bg-white rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-gray-50 mb-4" open={index === 0}>
                    <summary className="bg-flowcv-gray px-5 py-4 font-bold cursor-pointer hover:bg-gray-200 rounded-xl text-flowcv-text transition-colors outline-none">
                        {education.degree || "Degree"}
                    </summary>
                    <div className="p-4 flex flex-col space-y-4">
                        <div className="flex flex-col space-y-3">
                            <input onChange={(e) => handleChange(e, index)} value={education.degree} name='degree' type='text' className={inputClass} placeholder='Degree' />
                            <input onChange={(e) => handleChange(e, index)} value={education.school} name='school' type='text' className={inputClass} placeholder='School' />
                        </div>

                        <div className="flex flex-col md:flex-row md:space-x-4">
                            <div className="flex-1">
                                <label htmlFor={`startyr-${index}`} className={labelClass}>Start Year</label>
                                <input onChange={(e) => handleChange(e, index)} value={education.startYr} name='startYr' id={`startyr-${index}`} type="number" className={inputClass} min="1900" max="2030" placeholder='Start Year' />
                            </div>

                            <div className="flex-1">
                                <label htmlFor={`endyr-${index}`} className={labelClass}>End Year</label>
                                <input onChange={(e) => handleChange(e, index)} value={education.endYr} name='endYr' id={`endyr-${index}`} type="number" className={inputClass} min="1900" max="2030" placeholder='End Year' />
                            </div>

                            <div className="flex-1">
                                <label htmlFor={`grade-${index}`} className={labelClass}>Grade</label>
                                <input onChange={(e) => handleChange(e, index)} value={education.grade} name='grade' id={`grade-${index}`} type='text' className={inputClass} placeholder='Grade' />
                            </div>
                        </div>
                    </div>
                </details>
            ))}

            {educationList.length < 2 && (
                <button className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-md my-5 self-start transition-colors" onClick={addMore}>
                    Add More
                </button>
            )}
        </div>
    )
}

export default Education;

