import React from "react";
import { useResume } from "../../Context";
import ImageUpload from "../ImageUploadButton/ImageUpload.component";

const inputClass = "w-full px-3 py-2 bg-flowcv-input rounded-xl h-12 px-4 focus:outline-none focus:ring-2 focus:ring-purple-500 mb-4";
const labelClass = "block text-flowcv-text text-[14px] font-bold mb-1";

const About = () => {
    const { about, setAbout } = useResume();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAbout({ ...about, [name]: value });
    };

    return (
        <div className="flex flex-col space-y-4">
            {about.picture ? (
                <button
                    onClick={() => {
                        setAbout({ ...about, picture: "" });
                    }}
                    className="border border-red-500 text-red-500 px-4 py-2 rounded-md hover:bg-red-50 transition-colors self-start"
                >
                    Remove Image
                </button>
            ) : (
                <ImageUpload />
            )}

            <div className="flex flex-col md:flex-row md:space-x-6">
                <div className="flex-1">
                    <label htmlFor="name" className={labelClass}>Full Name</label>
                    <input
                        onChange={handleChange}
                        name="name"
                        id="name"
                        type="text"
                        className={inputClass}
                        placeholder="Full Name"
                        value={about.name || ""}
                    />
                </div>
                <div className="flex-1">
                    <label htmlFor="role" className={labelClass}>Role</label>
                    <input
                        onChange={handleChange}
                        name="role"
                        id="role"
                        type="text"
                        className={inputClass}
                        placeholder="Role"
                        value={about.role || ""}
                    />
                </div>
            </div>

            <div className="flex flex-col md:flex-row md:space-x-6">
                <div className="flex-1">
                    <label htmlFor="email" className={labelClass}>Email</label>
                    <input
                        onChange={handleChange}
                        name="email"
                        id="email"
                        type="email"
                        className={inputClass}
                        placeholder="Email"
                        value={about.email || ""}
                    />
                </div>
                <div className="flex-1">
                    <label htmlFor="phone" className={labelClass}>Phone</label>
                    <input
                        onChange={handleChange}
                        name="phone"
                        id="phone"
                        type="tel"
                        className={inputClass}
                        placeholder="Phone"
                        value={about.phone || ""}
                    />
                </div>
            </div>

            <div className="flex flex-col md:flex-row md:space-x-6">
                <div className="flex-1">
                    <label htmlFor="address" className={labelClass}>Address</label>
                    <input
                        onChange={handleChange}
                        name="address"
                        id="address"
                        type="text"
                        className={inputClass}
                        placeholder="Address"
                        value={about.address || ""}
                    />
                </div>
                <div className="flex-1">
                    <label htmlFor="linkedin" className={labelClass}>LinkedIn</label>
                    <input
                        onChange={handleChange}
                        name="linkedin"
                        id="linkedin"
                        type="url"
                        className={inputClass}
                        placeholder="https://linkedin.com"
                        value={about.linkedin || ""}
                    />
                </div>
            </div>
        </div>
    );
};

export default About;

