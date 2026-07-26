import React, { useState } from 'react';
import About from './BuildSteps/About'
import Education from './BuildSteps/Education'
import Projects from './BuildSteps/Projects'
import Skills from './BuildSteps/Skills'
import Work from './BuildSteps/Work'
import GenericSection from './BuildSteps/GenericSection'
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { MdPerson, MdSchool, MdBuild, MdWork, MdCode, MdArrowUpward, MdArrowDownward, MdEdit, MdDelete, MdAddCircleOutline, MdStarBorder, MdDragIndicator } from 'react-icons/md';
import { useResume } from '../Context';

const Builder = () => {
    const { sections, setSections, customSections, setCustomSections } = useResume();
    const [activeSection, setActiveSection] = useState('about');

    const componentMap = {
        'work': { icon: <MdWork size={20}/>, component: <Work /> },
        'education': { icon: <MdSchool size={20}/>, component: <Education /> },
        'skills': { icon: <MdBuild size={20}/>, component: <Skills /> },
        'projects': { icon: <MdCode size={20}/>, component: <Projects /> },
    };

    const handleSectionRename = (id, newName) => {
        setSections(sections.map(sec => sec.id === id ? { ...sec, name: newName } : sec));
    };

    const toggleColumn = (id) => {
        setSections(sections.map(sec => sec.id === id ? { ...sec, column: sec.column === 'right' ? 'left' : 'right' } : sec));
    };

    const moveSection = (index, direction) => {
        if (direction === 'up' && index > 0) {
            const newSections = [...sections];
            [newSections[index - 1], newSections[index]] = [newSections[index], newSections[index - 1]];
            setSections(newSections);
        } else if (direction === 'down' && index < sections.length - 1) {
            const newSections = [...sections];
            [newSections[index + 1], newSections[index]] = [newSections[index], newSections[index + 1]];
            setSections(newSections);
        }
    };

    const onDragEnd = (result) => {
        if (!result.destination) return;
        const items = Array.from(sections);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        setSections(items);
    };

    const addCustomSection = () => {
        const id = `custom-${Date.now()}`;
        setSections([...sections, { id, name: 'New Custom Section', column: 'left' }]);
        setCustomSections({ ...customSections, [id]: [{ title: "", subtitle: "", date: "", description: "" }] });
        setActiveSection(id);
    };

    const deleteSection = (e, id) => {
        e.stopPropagation();
        if(window.confirm("Are you sure you want to delete this custom section?")) {
            setSections(sections.filter(sec => sec.id !== id));
            const newCustomData = { ...customSections };
            delete newCustomData[id];
            setCustomSections(newCustomData);
            if (activeSection === id) setActiveSection('');
        }
    };

    return (
        <div className="w-full h-full flex flex-col bg-white">
            <div className="p-6 border-b border-gray-100 pb-4 shrink-0">
                <h2 className="text-xl font-bold text-gray-800 tracking-tight">Content Editor</h2>
                <p className="text-sm text-gray-500 mt-1">Drag to reorder sections and edit headers inline.</p>
            </div>
            
            <div className="flex-1 overflow-y-auto no-scrollbar pb-10">
                
                {/* 1. Permanent Personal Details block */}
                <div className="border-b border-gray-100">
                    <button
                        onClick={() => setActiveSection(activeSection === 'about' ? '' : 'about')}
                        className={`w-full flex items-center justify-between px-6 py-4 text-left font-medium transition-colors ${activeSection === 'about' ? 'bg-purple-50 text-purple-700' : 'text-gray-700 hover:bg-gray-50'}`}
                    >
                        <div className="flex items-center gap-3">
                            <span className={activeSection === 'about' ? "text-purple-600" : "text-gray-400"}><MdPerson size={20}/></span>
                            <span>Personal Details</span>
                        </div>
                        <span className={`transform transition-transform ${activeSection === 'about' ? 'rotate-180' : ''}`}>▼</span>
                    </button>
                    {activeSection === 'about' && (
                        <div className="px-6 py-4 animate-fadeIn bg-white border-t border-gray-50">
                            <About />
                        </div>
                    )}
                </div>

                {/* 2. Dynamic Sortable Blocks */}
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="builder-sections">
                        {(provided) => (
                            <div {...provided.droppableProps} ref={provided.innerRef}>
                                {sections.map((section, index) => {
                                    const isActive = activeSection === section.id;
                                    const isCustom = section.id.startsWith('custom-');
                                    const icon = isCustom ? <MdStarBorder size={20}/> : componentMap[section.id].icon;
                                    const component = isCustom ? <GenericSection sectionId={section.id} /> : componentMap[section.id].component;
                                    
                                    return (
                                        <Draggable key={section.id} draggableId={section.id} index={index}>
                                            {(provided, snapshot) => (
                                                <div 
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    className={`border-b border-gray-100 last:border-0 relative ${snapshot.isDragging ? 'shadow-lg z-50 bg-white ring-2 ring-purple-200' : ''}`}
                                                >
                                                    
                                                    {/* Accordion Header */}
                                                    <div className={`w-full flex items-center justify-between px-6 py-2 transition-colors ${isActive ? 'bg-purple-50' : 'hover:bg-gray-50'}`}>
                                                        
                                                        <div className="flex items-center gap-2 flex-1 mr-4 group">
                                                            {/* Drag Handle */}
                                                            <div {...provided.dragHandleProps} className="text-gray-300 hover:text-purple-500 cursor-grab active:cursor-grabbing p-1 -ml-2">
                                                                <MdDragIndicator size={20} />
                                                            </div>

                                                            <span className={isActive ? "text-purple-600" : "text-gray-400"}>{icon}</span>
                                                            
                                                            {/* Inline Editable Header */}
                                                            <div className="relative w-full flex items-center">
                                                                <input 
                                                                    type="text" 
                                                                    value={section.name} 
                                                                    onChange={(e) => handleSectionRename(section.id, e.target.value)}
                                                                    onClick={(e) => setActiveSection(section.id)}
                                                                    className={`font-medium w-full bg-transparent focus:outline-none focus:bg-white focus:ring-2 focus:ring-purple-400 rounded px-2 py-1 transition-all ${isActive ? "text-purple-800" : "text-gray-700 hover:bg-gray-100"}`}
                                                                    title="Click to rename this section's heading"
                                                                />
                                                                <MdEdit size={14} className={`absolute right-2 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none`} />
                                                            </div>
                                                        </div>
                                                        
                                                        <div className="flex items-center gap-1">
                                                            <button 
                                                                onClick={(e) => { e.stopPropagation(); toggleColumn(section.id); }} 
                                                                className="text-xs font-semibold px-2 py-1 rounded border border-gray-300 bg-white text-gray-600 hover:bg-gray-50 transition-colors mr-1"
                                                                title="Toggle column assignment for split templates"
                                                            >
                                                                {section.column === 'right' ? 'Right Col' : 'Left Col'}
                                                            </button>
                                                            {isCustom && (
                                                                <button onClick={(e) => deleteSection(e, section.id)} className="p-1 text-red-300 hover:text-red-600 transition-colors mr-1">
                                                                    <MdDelete size={18} />
                                                                </button>
                                                            )}

                                                            {/* Reorder Arrows (Fallback) */}
                                                            <button onClick={(e) => { e.stopPropagation(); moveSection(index, 'up'); }} disabled={index === 0} className="p-1 text-gray-400 hover:text-purple-600 disabled:opacity-30 disabled:hover:text-gray-400 transition-colors hidden md:block">
                                                                <MdArrowUpward size={18} />
                                                            </button>
                                                            <button onClick={(e) => { e.stopPropagation(); moveSection(index, 'down'); }} disabled={index === sections.length - 1} className="p-1 text-gray-400 hover:text-purple-600 disabled:opacity-30 disabled:hover:text-gray-400 transition-colors hidden md:block">
                                                                <MdArrowDownward size={18} />
                                                            </button>
                                                            
                                                            {/* Toggle Carat */}
                                                            <button onClick={() => setActiveSection(isActive ? '' : section.id)} className={`p-2 text-gray-500 hover:text-gray-800 transform transition-transform ${isActive ? 'rotate-180' : ''}`}>
                                                                ▼
                                                            </button>
                                                        </div>
                                                    </div>
                                                    
                                                    {/* Content */}
                                                    {isActive && (
                                                        <div className="px-6 py-4 animate-fadeIn bg-white border-t border-gray-50">
                                                            {component}
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </Draggable>
                                    );
                                })}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>

                
                {/* 3. Add Custom Section Button */}
                <div className="p-6">
                    <button 
                        onClick={addCustomSection}
                        className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold rounded-2xl shadow-md transition-transform transform hover:-translate-y-0.5"
                    >
                        <MdAddCircleOutline size={22} />
                        Add Custom Section
                    </button>
                </div>

            </div>
        </div>
    )
}

export default Builder;
