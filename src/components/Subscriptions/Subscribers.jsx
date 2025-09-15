"use client";
import React, { useState, useMemo } from 'react';

// The initial dataset is created to match the Subscribers Management screenshot.
const initialSubscribers = [
  { id: 1, name: "Savannah Nguyen", avatar: "/image/song-1.png", planName: "Bang Pack - 01", startDate: "1:05pm - 10/04/2025", status: "Active" },
  { id: 2, name: "Annette Black", avatar: "/image/song-2.png", planName: "Bang Pack - 01", startDate: "5:05pm - 20/05/2025", status: "Active" },
  { id: 3, name: "Cody Fisher", avatar: "/image/song-3.png", planName: "Bang Pack - 01", startDate: "4:06pm - 05/04/2025", status: "Active" },
  { id: 4, name: "Brooklyn Simmons", avatar: "/image/song-4.png", planName: "Bang Pack - 02", startDate: "3:04pm - 17/04/2025", status: "Active" },
  { id: 5, name: "Ralph Edwards", avatar: "/image/song-5.png", planName: "Bang Pack - 02", startDate: "10:05pm - 08/08/2025", status: "Active" },
  { id: 6, name: "Courtney Henry", avatar: "/image/song-6.png", planName: "Bang Pack - 02", startDate: "3:15am - 03/07/2025", status: "Active" },
  { id: 7, name: "Bessie Cooper", avatar: "/image/song-7.png", planName: "Bang Pack - 03", startDate: "8:03am - 27/10/2025", status: "Active" },
  { id: 8, name: "Esther Howard", avatar: "/image/song-1.png", planName: "Bang Pack - 01", startDate: "5:03pm - 24/12/2025", status: "Active" },
  { id: 9, name: "Eleanor Pena", avatar: "/image/song-2.png", planName: "Bang Pack - 02", startDate: "6:09pm - 20/09/2025", status: "Active" },
  { id: 10, name: "Cameron Williamson", avatar: "/image/song-5.png", planName: "Bang Pack - 02", startDate: "1:25pm - 17/04/2025", status: "Active" },
  { id: 11, name: "Guy Hawkins", avatar: "/image/song-6.png", planName: "Bang Pack - 03", startDate: "5:15am - 30/06/2025", status: "Active" },
  // Added more subscribers for pagination demonstration
  { id: 12, name: "Jane Foster", avatar: "/image/song-1.png", planName: "Bang Pack - 04", startDate: "9:00am - 01/10/2025", status: "Active" },
  { id: 13, name: "John Doe", avatar: "/image/song-4.png", planName: "Bang Pack - 04", startDate: "11:30am - 02/10/2025", status: "Active" },
];

const SubscribersManagement = () => {
  const [subscribers, setSubscribers] = useState(initialSubscribers);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const itemsPerPage = 11;

  const filteredSubscribers = useMemo(() =>
    subscribers.filter((subscriber) =>
      subscriber.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subscriber.planName.toLowerCase().includes(searchTerm.toLowerCase())
    ),
    [subscribers, searchTerm]
  );

  const totalPages = Math.ceil(filteredSubscribers.length / itemsPerPage);

  const paginatedSubscribers = filteredSubscribers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  const handlePageChange = (page) => {
    const newPage = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(newPage);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-[#2BA84933] text-[#53C31B]"; // Green for Active status
      // Add other cases for different statuses if needed
      // case "Inactive":
      //   return "bg-[#2196F333] text-[#2196F3]";
      default:
        return "bg-gray-700 text-gray-200";
    }
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

  return (
    <div className=" min-h-screen p-4 sm:p-6">
      <div className=" mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-2xl font-semibold text-[#F9FAFB]">
            Subscribers Management
          </h1>
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

        <div className="bg-[#312B36] rounded-lg overflow-x-auto">
          <table className="min-w-full">
            <thead className="border-b border-[#896E9C]">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-[#F9FAFB] uppercase tracking-wider">NO</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-[#F9FAFB] uppercase tracking-wider">Name</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-[#F9FAFB] uppercase tracking-wider">Plan Name</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-[#F9FAFB] uppercase tracking-wider">Start Date</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-[#F9FAFB] uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-[#F9FAFB] uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#423a47]">
              {paginatedSubscribers.map((subscriber, index) => (
                <tr key={subscriber.id} className="hover:bg-[#3a333f] transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#F9FAFB]">
                    {(currentPage - 1) * itemsPerPage + index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img className="h-10 w-10 rounded-full object-cover" src={subscriber.avatar} alt={subscriber.name} />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-[#F9FAFB]">{subscriber.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#c1bec4]">{subscriber.planName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#c1bec4]">{subscriber.startDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-md ${getStatusColor(subscriber.status)}`}>{subscriber.status}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="bg-[#33314B] text-[#818CF8] px-4 py-1.5 rounded-md hover:bg-[#413F5F] transition-colors text-xs font-medium">View</button>
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
    </div>
  );
};

export default SubscribersManagement;
