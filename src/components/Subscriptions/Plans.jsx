"use client";
import React, { useState, useMemo } from "react";

// Initial dataset for Plans Management
const initialPlans = [
  { id: 1, name: "Bang Pack - 01", price: "$100", totalBangs: "500 Bangs (+3 Bonus)", visibilityType: "Popular" },
  { id: 2, name: "Bang Pack - 02", price: "$50", totalBangs: "250 Bangs", visibilityType: "Best Value" },
  { id: 3, name: "Bang Pack - 03", price: "$25", totalBangs: "125 Bangs", visibilityType: "Medium Reach" },
  { id: 4, name: "Bang Pack - 04", price: "$10", totalBangs: "50 Bang", visibilityType: "Low Reach" },
  { id: 5, name: "Bang Pack - 05", price: "$150", totalBangs: "750 Bangs (+5 Bonus)", visibilityType: "Premium" },
  { id: 6, name: "Bang Pack - 06", price: "$75", totalBangs: "375 Bangs", visibilityType: "Standard" },
  { id: 7, name: "Bang Pack - 07", price: "$40", totalBangs: "200 Bangs", visibilityType: "Basic" },
  { id: 8, name: "Bang Pack - 08", price: "$20", totalBangs: "100 Bangs", visibilityType: "Entry" },
  { id: 9, name: "Bang Pack - 09", price: "$300", totalBangs: "1500 Bangs (+10 Bonus)", visibilityType: "Elite" },
  { id: 10, name: "Bang Pack - 10", price: "$200", totalBangs: "1000 Bangs (+7 Bonus)", visibilityType: "Pro" },
  { id: 11, name: "Bang Pack - 11", price: "$120", totalBangs: "600 Bangs (+4 Bonus)", visibilityType: "Plus" },
  { id: 12, name: "Bang Pack - 12", price: "$90", totalBangs: "450 Bangs (+2 Bonus)", visibilityType: "Value" },
];

const PlansManagement = () => {
  const [plans, setPlans] = useState(initialPlans);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const itemsPerPage = 11; // Displaying 11 items as per previous component logic

  const filteredPlans = useMemo(() =>
    plans.filter((plan) =>
      plan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plan.visibilityType.toLowerCase().includes(searchTerm.toLowerCase())
    ), [plans, searchTerm]);

  const totalPages = Math.ceil(filteredPlans.length / itemsPerPage);

  const paginatedPlans = filteredPlans.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    const newPage = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(newPage);
  };

  const handleRemove = (planId) => {
    setPlans((prev) => {
      const newPlans = prev.filter((p) => p.id !== planId);
      const newTotalPages = Math.ceil(newPlans.length / itemsPerPage);
      if (currentPage > newTotalPages && newTotalPages > 0) {
        setCurrentPage(newTotalPages);
      } else if (newTotalPages === 0) {
        setCurrentPage(1); // Reset to page 1 if all items are removed
      }
      return newPlans;
    });
  };

  const handleCreatePlan = (newPlanData) => {
    const newPlan = {
      id: plans.length > 0 ? Math.max(...plans.map(p => p.id)) + 1 : 1,
      name: newPlanData.name,
      price: newPlanData.price,
      totalBangs: newPlanData.totalBangs,
      visibilityType: newPlanData.visibilityType,
      // Description is not displayed in the table but can be stored
    };
    setPlans((prev) => [...prev, newPlan]);
    setIsCreateModalOpen(false);
    // Optionally navigate to the last page to see the new item
    setCurrentPage(Math.ceil((plans.length + 1) / itemsPerPage));
  };

  const generatePagination = () => {
    if (totalPages <= 1) return [];
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }
    pages.push(1);
    let start = Math.max(2, currentPage - 1);
    let end = Math.min(totalPages - 1, currentPage + 1);
    if (currentPage > totalPages - 3) start = totalPages - 3;
    if (currentPage < 4) end = 4;
    if (start > 2) pages.push('...');
    for (let i = start; i <= end; i++) pages.push(i);
    if (end < totalPages - 1) pages.push('...');
    pages.push(totalPages);
    return pages;
  };

  // Create New Subscriptions Modal Component
  const CreatePlanModal = ({ onClose, onCreate }) => {
    const [planName, setPlanName] = useState("");
    const [price, setPrice] = useState("");
    const [totalBangs, setTotalBangs] = useState("");
    const [visibilityType, setVisibilityType] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = () => {
      // Basic validation
      if (!planName || !price || !totalBangs || !visibilityType) {
        alert("Please fill in all required fields.");
        return;
      }
      onCreate({ planName, price, totalBangs, visibilityType, description });
    };

    return (
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
        <div className="bg-[#29232A] rounded-lg w-full max-w-4xl py-10"> {/* Increased max-width */}
          <div className="p-6">
            <h3 className="text-xl font-semibold text-[#F9FAFB] mb-6">Create New Boost</h3> {/* Title as per image */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-sm font-medium text-[#F9FAFB] mb-2">Plan name</label>
                <input
                  type="text"
                  value={planName}
                  onChange={(e) => setPlanName(e.target.value)}
                  placeholder="Enter plan name"
                  className="w-full px-4 py-3 bg-black text-white rounded-md border border-[#896E9C] focus:outline-none focus:border-[#A38BB4]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#F9FAFB] mb-2">Price</label>
                <input
                  type="text"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Enter price"
                  className="w-full px-4 py-3 bg-black text-white rounded-md border border-[#896E9C] focus:outline-none focus:border-[#A38BB4]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#F9FAFB] mb-2">TOTAL BANGs</label>
                <input
                  type="text"
                  value={totalBangs}
                  onChange={(e) => setTotalBangs(e.target.value)}
                  placeholder="Enter BANGs"
                  className="w-full px-4 py-3 bg-black text-white rounded-md border border-[#896E9C] focus:outline-none focus:border-[#A38BB4]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#F9FAFB] mb-2">Visibility Type</label>
                <input
                  type="text"
                  value={visibilityType}
                  onChange={(e) => setVisibilityType(e.target.value)}
                  placeholder="Enter Visibility Type"
                  className="w-full px-4 py-3 bg-black text-white rounded-md border border-[#896E9C] focus:outline-none focus:border-[#A38BB4]"
                />
              </div>
            </div>
            <div className="mb-8">
              <label className="block text-sm font-medium text-[#F9FAFB] mb-2">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Type here..."
                className="w-full h-28 px-4 py-3 bg-black text-white rounded-md border border-[#896E9C] focus:outline-none focus:border-[#A38BB4]"
                rows={3}
              />
            </div>
            <div className="flex justify-start space-x-3"> {/* Changed to justify-start as per image */}
              <button onClick={onClose} className="px-5 py-2 bg-[#423a47] text-[#F9FAFB] rounded-md hover:bg-[#5a4f5b] transition-colors">Cancel</button>
              <button onClick={handleSubmit} className="px-5 py-2 bg-gradient-to-b from-[#FF7DD0] to-[#F7009E] text-white rounded-md hover:from-[#FF6BC9] hover:to-[#E6008F] transition-all">Confirm Update</button>
            </div>
          </div>
        </div>
      </div>
    );
  };


  return (
    <div className=" min-h-screen p-4 sm:p-6">
      <div className=" mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-2xl font-semibold text-[#F9FAFB]">
            Plans Management
          </h1>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center px-4 py-2 bg-gradient-to-b from-[#FF7DD0] to-[#F7009E] text-white rounded-md hover:from-[#FF6BC9] hover:to-[#E6008F] transition-all text-sm font-medium"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Create New Subscriptions
          </button>
        </div>

        {/* This is the search bar area as per Image 1, but without the "Plans" title which is part of the table now */}
        <div className="flex justify-between items-center mb-6">
            
            <div className="relative">
                <input
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                    className="pl-10 pr-4 py-2 w-56 bg-[#312B36] text-white rounded-md border border-[#896E9C] focus:outline-none focus:border-[#A38BB4]"
                />
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" /></svg>
            </div>
        </div>

        <div className="bg-[#312B36] rounded-lg overflow-x-auto border border-[#896E9C]"> {/* Added border to match image 1 */}
          <table className="min-w-full">
            <thead className="border-b border-[#896E9C]">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-[#F9FAFB] uppercase tracking-wider">NO</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-[#F9FAFB] uppercase tracking-wider">Plan Name</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-[#F9FAFB] uppercase tracking-wider">Price</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-[#F9FAFB] uppercase tracking-wider">Total BANGs</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-[#F9FAFB] uppercase tracking-wider">Visibility Type</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-[#F9FAFB] uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#423a47]">
              {paginatedPlans.map((plan, index) => (
                <tr key={plan.id} className="hover:bg-[#3a333f] transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#F9FAFB]">
                    {(currentPage - 1) * itemsPerPage + index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#F9FAFB]">
                    {plan.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#c1bec4]">{plan.price}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#c1bec4]">{plan.totalBangs}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#c1bec4]">{plan.visibilityType}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="bg-[#45381F] text-[#FFB800] px-4 py-1.5 rounded-md hover:bg-[#5A4A28] transition-colors text-xs font-medium">Edit</button>
                      <button onClick={() => handleRemove(plan.id)} className="bg-[#551214] text-[#FE4D4F] px-4 py-1.5 rounded-md hover:bg-[#6B1A1C] transition-colors text-xs font-medium">Remove</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {totalPages > 0 && (
          <div className="flex justify-end items-center mt-6 space-x-1 sm:space-x-2">
            <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="px-2 py-2 rounded-md bg-[#312B36] text-white disabled:opacity-50 hover:bg-[#423a47] transition-colors border border-[#896E9C]">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
            </button>
            {generatePagination().map((page, index) =>
                typeof page === 'number' ? (
                    <button key={`${page}-${index}`} onClick={() => handlePageChange(page)} className={`px-3 sm:px-4 py-2 rounded-md transition-colors text-sm ${ currentPage === page ? "bg-gradient-to-b from-[#FF7DD0] to-[#F7009E] text-white" : "bg-[#312B36] text-[#F9FAFB] border border-[#896E9C] hover:bg-[#423a47]" }`}>{page}</button>
                ) : ( <span key={`dots-${index}`} className="px-2 sm:px-4 py-2 text-[#F9FAFB]">{page}</span> )
            )}
            <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="px-2 py-2 rounded-md bg-[#312B36] text-white disabled:opacity-50 hover:bg-[#423a47] transition-colors border border-[#896E9C]">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
            </button>
          </div>
        )}
      </div>

      {isCreateModalOpen && (
        <CreatePlanModal
          onClose={() => setIsCreateModalOpen(false)}
          onCreate={handleCreatePlan}
        />
      )}
    </div>
  );
};

export default PlansManagement;