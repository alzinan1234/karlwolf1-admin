"use client";
import React, { useState } from 'react';

export default function NotificationSettings() {
  // State for the toggle switch, initialized to 'true' to match the image
  const [isAdminUpdatesEnabled, setIsAdminUpdatesEnabled] = useState(true);

  // Function to handle saving the settings
  const handleSave = () => {
    alert("Settings saved! Check the browser console for the current value.");
    console.log({
      adminUpdatesEnabled: isAdminUpdatesEnabled,
    });
    // In a real application, you would send this data to your backend API
  };

  return (
    <div className="max-w-md mx-auto p-4 font-sans">
      <div className="bg-[#29232A] p-8 rounded-2xl shadow-lg flex flex-col gap-8">
        
        {/* Header Section */}
        <div>
          <h2 className="text-white text-xl font-medium">Notification</h2>
          <div className="w-full h-px bg-slate-700 mt-3" />
        </div>

        {/* Settings Toggle Row */}
        <div className="flex justify-between items-center">
          <span className="text-slate-200 text-base">Admin updates</span>
          
          {/* --- Custom Toggle Switch --- */}
          <button
            type="button"
            role="switch"
            aria-checked={isAdminUpdatesEnabled}
            onClick={() => setIsAdminUpdatesEnabled(!isAdminUpdatesEnabled)}
            className={`relative inline-flex items-center h-7 w-12 rounded-full transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#29232A] focus:ring-pink-500 ${
              isAdminUpdatesEnabled ? 'bg-[#F7009E]' : 'bg-slate-600'
            }`}
          >
            {/* The white circle (thumb) */}
            <span
              className={`inline-block w-5 h-5 transform bg-white rounded-full transition-transform duration-300 ease-in-out ${
                isAdminUpdatesEnabled ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        {/* Save Button Section */}
        <div>
          <button
            onClick={handleSave}
            className="px-10 py-2.5 text-white text-base font-semibold rounded-lg bg-gradient-to-b from-[#FF7DD0] to-[#F7009E] shadow-md hover:opacity-90 transition-opacity duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#29232A] focus:ring-pink-500"
          >
            Seve
          </button>
        </div>

      </div>
    </div>
  );
}