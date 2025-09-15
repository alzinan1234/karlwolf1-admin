"use client";
import React, { useState, useRef } from 'react';
import { Pencil, ChevronDown } from 'lucide-react';

// A reusable component for input fields to keep the main form clean
const InputField = ({ label, id, ...props }) => (
  <div className="w-full">
    <label htmlFor={id} className="block text-white text-sm font-medium mb-1.5">{label}</label>
    <input
      id={id}
      className="w-full bg-[#3a333c] rounded-lg border border-slate-500 px-4 py-3 text-slate-300 placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-pink-500 transition-shadow duration-200"
      {...props}
    />
  </div>
);

// A reusable component for select dropdowns
const SelectField = ({ label, id, children, ...props }) => (
  <div className="w-full">
    <label htmlFor={id} className="block text-white text-sm font-medium mb-1.5">{label}</label>
    <div className="relative">
      <select
        id={id}
        className="w-full appearance-none bg-[#3a333c] rounded-lg border border-slate-500 px-4 py-3 text-slate-300 outline-none focus:ring-2 focus:ring-pink-500 transition-shadow duration-200"
        {...props}
      >
        {children}
      </select>
      <ChevronDown className="w-5 h-5 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
    </div>
  </div>
);


export default function ProfileForm() {
  const [formData, setFormData] = useState({
    displayName: '',
    email: 'demo@gmail.com',
    country: '',
    city: '',
    province: '',
    gender: '',
    bio: ''
  });

  const [profileImage, setProfileImage] = useState("/admin-image.jpg");
  const fileInputRef = useRef(null);

  // Handles changes for all text inputs, textareas, and selects
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handles the file selection for the profile image
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfileImage(URL.createObjectURL(file));
      // In a real app, you would upload the file here
    }
  };
  
  // Triggers the hidden file input when the edit icon is clicked
  const handleEditClick = () => {
    fileInputRef.current.click();
  };

  // Handles form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Check the console for the form data!");
    console.log("Form Data Saved:", { ...formData, profileImage });
    // Here, you would typically send the data to your backend API
  };

  return (
    <div className=" mx-auto p-4 font-['Roboto']">
      <form onSubmit={handleSubmit} className="p-8 bg-[#29232A] rounded-xl flex flex-col gap-8">
        
        {/* Header */}
        <div>
          <h1 className="text-white text-xl font-medium">Profile Information</h1>
          <div className="w-full h-px bg-slate-600 mt-2" />
        </div>
        
        {/* Profile Photo Section */}
        <div>
          <label className="block text-white text-sm font-medium mb-1.5">Photo Profile</label>
          <div className="relative w-24 h-24">
            <img 
              className="w-24 h-24 rounded-lg object-cover" 
              src={profileImage} 
              alt="Profile" 
            />
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleImageChange}
              className="hidden"
              accept="image/*"
            />
            <button 
              type="button"
              onClick={handleEditClick}
              className="absolute -bottom-1 -right-1 w-7 h-7 bg-slate-800 rounded-full flex items-center justify-center border-2 border-[#29232A] hover:bg-slate-700 transition-colors"
              aria-label="Edit profile picture"
            >
              <Pencil className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
        
        {/* Form Fields */}
        <div className="flex flex-col gap-6">
          <InputField
            label="Display Name"
            id="displayName"
            name="displayName"
            type="text"
            placeholder="Enter Your Display Name"
            value={formData.displayName}
            onChange={handleInputChange}
          />
          
          <InputField
            label="Email"
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
          />

          {/* Grid for location and personal details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SelectField 
              label="Country" 
              id="country" 
              name="country" 
              value={formData.country} 
              onChange={handleInputChange}
            >
              <option value="">Select Your Country</option>
              <option value="us">United States</option>
              <option value="bd">Bangladesh</option>
              <option value="ca">Canada</option>
            </SelectField>

            <SelectField 
              label="City" 
              id="city" 
              name="city" 
              value={formData.city} 
              onChange={handleInputChange}
            >
              <option value="">Select Your City</option>
              <option value="dhaka">Dhaka</option>
              <option value="chittagong">Chittagong</option>
              <option value="sylhet">Sylhet</option>
            </SelectField>

            <SelectField 
              label="Province" 
              id="province" 
              name="province" 
              value={formData.province} 
              onChange={handleInputChange}
            >
              <option value="">Select Your Province</option>
              <option value="dhaka">Dhaka Division</option>
              <option value="chittagong">Chittagong Division</option>
              <option value="sylhet">Sylhet Division</option>
            </SelectField>

            <SelectField 
              label="Gender" 
              id="gender" 
              name="gender" 
              value={formData.gender} 
              onChange={handleInputChange}
            >
              <option value="">Select Your Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </SelectField>
          </div>

          <div>
            <label htmlFor="bio" className="block text-white text-sm font-medium mb-1.5">Bio</label>
            <textarea
              id="bio"
              name="bio"
              placeholder="Enter Your Bio"
              rows="3"
              value={formData.bio}
              onChange={handleInputChange}
              className="w-full bg-[#3a333c] rounded-lg border border-slate-500 px-4 py-3 text-slate-300 placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-pink-500 transition-shadow duration-200 resize-none"
            />
          </div>
        </div>
        
        {/* Save Button */}
        <div>
          <button
            type="submit"
            className="px-6 py-2.5 text-white text-sm font-semibold rounded-lg border border-[#FF7DD0] bg-gradient-to-b from-[#FF7DD0] to-[#F7009E] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] hover:from-[#f86ac7] hover:to-[#d9008d] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#29232A] focus:ring-pink-500"
          >
            Save
          </button>
        </div>

      </form>
    </div>
  );
}