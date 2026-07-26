import React from 'react';
import { useResume } from '../../Context';
import { MdDelete } from 'react-icons/md';

const GenericSection = ({ sectionId }) => {
    const { customSections, setCustomSections } = useResume();
    
    // Ensure array exists
    const items = customSections[sectionId] || [];

    const handleChange = (e, index) => {
        const { name, value } = e.target;
        const updatedItems = items.map((item, i) => (
            index === i ? { ...item, [name]: value } : item
        ));
        setCustomSections({ ...customSections, [sectionId]: updatedItems });
    };

    const addMore = () => {
        setCustomSections({ 
            ...customSections, 
            [sectionId]: [...items, { title: "", subtitle: "", date: "", description: "" }] 
        });
    };

    const remove = (index) => {
        const newItems = items.filter((_, i) => i !== index);
        setCustomSections({ ...customSections, [sectionId]: newItems });
    };

    return (
        <div className="w-full">
            {items.map((item, index) => (
                <div key={index} className="mb-6 bg-gray-50 p-4 rounded-lg relative border border-gray-100">
                    <button 
                        onClick={() => remove(index)}
                        className="absolute right-3 top-3 text-red-400 hover:text-red-600 p-1 rounded-sm transition-colors"
                        title="Remove Item"
                    >
                        <MdDelete size={20} />
                    </button>
                    
                    <div className="flex flex-col gap-3 pr-8">
                        <div>
                            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Title / Heading</label>
                            <input
                                name="title"
                                value={item.title}
                                onChange={(e) => handleChange(e, index)}
                                type="text"
                                className="w-full px-3 py-2 mt-1 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition-shadow"
                                placeholder="Certificate in React, Top Salesman, English, etc."
                            />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Subtitle</label>
                                <input
                                    name="subtitle"
                                    value={item.subtitle}
                                    onChange={(e) => handleChange(e, index)}
                                    type="text"
                                    className="w-full px-3 py-2 mt-1 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition-shadow"
                                    placeholder="Organization, Company, Proficiency"
                                />
                            </div>
                            <div>
                                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Date / Subtext</label>
                                <input
                                    name="date"
                                    value={item.date}
                                    onChange={(e) => handleChange(e, index)}
                                    type="text"
                                    className="w-full px-3 py-2 mt-1 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition-shadow"
                                    placeholder="2023, Fluid, 1st Place"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Details</label>
                            <textarea
                                name="description"
                                value={item.description}
                                onChange={(e) => handleChange(e, index)}
                                className="w-full px-3 py-2 mt-1 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[80px] transition-shadow"
                                placeholder="Details about this role, award, or certification..."
                            ></textarea>
                        </div>
                    </div>
                </div>
            ))}
            
            <button 
                onClick={addMore}
                className="w-full py-2 border-2 border-dashed border-purple-300 text-purple-600 rounded-md font-semibold hover:bg-purple-50 transition-colors"
            >
                + Add Item
            </button>
        </div>
    );
};

export default GenericSection;
