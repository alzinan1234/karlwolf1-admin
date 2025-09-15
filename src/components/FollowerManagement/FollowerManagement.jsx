"use client";
import React, { useState, useMemo } from "react";

// To properly demonstrate pagination, the initial dataset has been expanded.
const initialFollowers = [
  { id: 1, name: "Savannah Nguyen", avatar: "/image/song-5.png", status: "Active" },
  { id: 2, name: "Annette Black", avatar: "/image/song-2.png", status: "Active" },
  { id: 3, name: "Cody Fisher", avatar: "/image/song-3.png", status: "Active" },
  { id: 4, name: "Brooklyn Simmons", avatar: "/image/song-4.png", status: "Inactive" },
  { id: 5, name: "Ralph Edwards", avatar: "/image/song-5.png", status: "Active" },
  { id: 6, name: "Courtney Henry", avatar: "/image/song-6.png", status: "Blocked" },
  { id: 7, name: "Bessie Cooper", avatar: "/image/song-7.png", status: "Active" },
  { id: 8, name: "Esther Howard", avatar: "/image/song-5.png", status: "Inactive" },
  { id: 9, name: "Eleanor Pena", avatar: "/image/song-1.png", status: "Inactive" },
  { id: 10, name: "Cameron Williamson", avatar: "/image/song-4.png", status: "Inactive" },
  { id: 11, name: "Guy Hawkins", avatar: "/image/song-2.png", status: "Blocked" },
  // Added more users for pagination demonstration
  { id: 12, name: "Jacob Jones", avatar: "/image/song-3.png", status: "Active" },
  { id: 13, name: "Kristin Watson", avatar: "/image/song-4.png", status: "Active" },
  { id: 14, name: "Theresa Webb", avatar: "/image/song-5.png", status: "Inactive" },
  { id: 15, name: "Darrell Steward", avatar: "/image/song-6.png", status: "Blocked" },
  { id: 16, name: "Marvin McKinney", avatar: "/image/song-7.png", status: "Active" },
  { id: 17, name: "Wade Warren", avatar: "/image/song-1.png", status: "Active" },
  { id: 18, name: "Jane Cooper", avatar: "/image/song-2.png", status: "Inactive" },
  { id: 19, name: "Robert Fox", avatar: "/image/song-3.png", status: "Active" },
  { id: 20, name: "Darlene Robertson", avatar: "/image/song-4.png", status: "Blocked" },
  { id: 21, name: "Floyd Miles", avatar: "/image/song-5.png", status: "Active" },
  { id: 22, name: "Jenny Wilson", avatar: "/image/song-6.png", status: "Inactive" },
  { id: 23, name: "Ronald Richards", avatar: "/image/song-7.png", status: "Active" },
  { id: 24, name: "Dianne Russell", avatar: "/image/song-1.png", status: "Active" },
  { id: 25, name: "Albert Flores", avatar: "/image/song-2.png", status: "Blocked" },
];


const FollowerManagement = () => {
  const [followers, setFollowers] = useState(initialFollowers);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [messageModal, setMessageModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [message, setMessage] = useState("");
  const [sendToAll, setSendToAll] = useState(false);

  const itemsPerPage = 11;

  // Memoize filtered followers to avoid recalculation on every render
  const filteredFollowers = useMemo(() =>
    followers.filter((follower) =>
      follower.name.toLowerCase().includes(searchTerm.toLowerCase())
    ), [followers, searchTerm]);

  // **FIXED**: Total pages calculation is now based on the *filtered* list
  const totalPages = Math.ceil(filteredFollowers.length / itemsPerPage);

  // **FIXED**: Paginated followers logic remains the same but depends on the dynamic totalPages
  const paginatedFollowers = filteredFollowers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  // **FIXED**: A robust page change handler that ensures page is within bounds
  const handlePageChange = (page) => {
    // Ensure page is not less than 1 or greater than totalPages
    const newPage = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(newPage);
  };
  
  // NOTE: This functionality requires checkboxes in the UI to be fully utilized.
  const handleSelectUser = (userId) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  // NOTE: This functionality requires a "select all" checkbox in the UI.
  const handleSelectAll = () => {
    // This should select all *filtered* users, not the entire list
    if (selectedUsers.length === filteredFollowers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredFollowers.map((f) => f.id));
    }
  };

  const handleBlock = (userId) => {
    setFollowers((prev) =>
      prev.map((f) => (f.id === userId ? { ...f, status: "Blocked" } : f))
    );
  };

  // **FIXED**: Improved remove handler to adjust current page if needed
  const handleRemove = (userId) => {
    setFollowers((prev) => {
        const newFollowers = prev.filter((f) => f.id !== userId);
        const newTotalPages = Math.ceil(newFollowers.length / itemsPerPage);

        // If the current page is now empty and not the first page, go back one page
        if (currentPage > newTotalPages && newTotalPages > 0) {
            setCurrentPage(newTotalPages);
        }
        return newFollowers;
    });
  };

  const handleSendMessage = (individual = false, userId = null) => {
    if (individual && userId) {
      setSelectedUsers([userId]);
      setSendToAll(false);
    } else {
      // Logic for sending to all filtered users if needed
      setSendToAll(true);
    }
    setMessageModal(true);
  };

  const handleConfirmSend = () => {
    if (!message.trim()) {
        alert("Message cannot be empty.");
        return;
    }
    setMessageModal(false);
    setConfirmModal(true);
  };

  const handleFinalSend = () => {
    console.log("Sending message:", message);
    console.log("To users:", sendToAll ? "All users" : selectedUsers);

    setConfirmModal(false);
    setMessage("");
    setSelectedUsers([]);
    setSendToAll(false);
    
    alert("Message sent successfully!");
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-[#2BA84933] text-[#53C31B]";
      case "Inactive":
        return "bg-[#2196F333] text-[#2196F3]";
      case "Blocked":
        return "bg-[#FF9F4333] text-[#FF9F43]";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // **NEW**: Helper function to create the dynamic pagination numbers
  const generatePagination = () => {
    if (totalPages <= 1) return [];

    const pages = [];
    const visiblePages = 3; // How many page numbers to show besides first and last
    
    // Always add the first page
    pages.push(1);

    // Calculate the range of pages to show around the current page
    let startPage = Math.max(2, currentPage - 1);
    let endPage = Math.min(totalPages - 1, currentPage + 1);

    if (currentPage <= 3) {
      endPage = Math.min(totalPages - 1, 4);
    }
    if (currentPage >= totalPages - 2) {
      startPage = Math.max(2, totalPages - 3);
    }

    if (startPage > 2) {
      pages.push('...');
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < totalPages - 1) {
      pages.push('...');
    }
    
    // Always add the last page
    if (totalPages > 1) {
      pages.push(totalPages);
    }
    
    // Remove duplicates that might occur for small totalPages
    return [...new Set(pages)];
  };

  const MessageModal = () => {
    if (!messageModal) return null;
    return (
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
        <div className="bg-[#29232A] rounded-lg w-full max-w-3xl py-20">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-[#F9FAFB] mb-4">
              Send Message
            </h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-[#F9FAFB] mb-2">
                Type here...
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full h-32 px-4 py-3 bg-[#000000] text-white rounded-md"
                placeholder="Enter your message..."
                rows={4}
              />
            </div>
            <div className="flex items-center mb-6">
              <label htmlFor="sendToAll" className="text-sm text-[#F9FAFB]">
                Selecting this will send the same message to all users.
              </label>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => {
                  setMessageModal(false);
                  setMessage("");
                  setSendToAll(false);
                }}
                className="px-4 py-2 bg-[#F7009E33] text-[#F9FAFB] rounded-md border border-[#896E9C] hover:bg-[#2A374B] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmSend}
                className="px-4 py-2 bg-gradient-to-b from-[#FF7DD0] to-[#F7009E] text-white rounded-md hover:from-[#FF6BC9] hover:to-[#E6008F] transition-all duration-200"
              >
                Confirm Send
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ConfirmModal = () => {
    if (!confirmModal) return null;
    return (
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
        <div className="bg-[#312B36] rounded-lg w-full max-w-3xl py-20">
          <div className="p-6 text-center">
            <div className="mb-4">
              <div className="mx-auto w-16 h-16 flex items-center justify-center mb-4">
                <svg width="100" height="84" viewBox="0 0 100 84" fill="none">
                    <path d="M98.6673 77.4539C97.7604 79.1185 96.4388 80.5214 94.8442 81.5104C93.1431 82.5644 91.1661 83.1223 89.1282 83.1223H10.873C8.83414 83.1223 6.85814 82.5644 5.15697 81.5104C3.56236 80.5214 2.2406 79.1185 1.33381 77.4539C0.426908 75.7883 -0.0335488 73.9158 0.00190308 72.0403C0.0404923 70.0399 0.645058 68.0771 1.7517 66.3648L12.9352 49.0656L40.8792 5.842C42.8897 2.73394 46.2991 0.877686 50.0005 0.877686C53.702 0.877686 57.1113 2.73394 59.1208 5.842L87.0648 49.0656L98.2483 66.3648C99.3549 68.0771 99.9605 70.0399 99.9981 72.0403C100.034 73.9159 99.5732 75.7883 98.6673 77.4539Z" fill="url(#paint0_linear_0_6682)"/>
                    <path d="M88.3074 78.6023H11.6934C6.16663 78.6023 2.83499 72.4813 5.83554 67.8399L44.1425 8.58603C46.8909 4.33493 53.1099 4.33493 55.8582 8.58603L94.1652 67.8399C97.1658 72.4812 93.8342 78.6023 88.3074 78.6023Z" fill="url(#paint1_linear_0_6682)"/>
                    <path d="M53.6016 25.2801L52.335 53.6658C52.2775 54.9553 51.1855 55.954 49.896 55.8965C48.6799 55.8422 47.7222 54.8581 47.6652 53.6658L46.3987 25.2801C46.3099 23.291 47.8504 21.6067 49.8395 21.5179C51.9413 21.4129 53.7048 23.1796 53.6016 25.2801Z" fill="url(#paint2_linear_0_6682)"/>
                    <path d="M50.0002 68.1481C52.0112 68.1481 53.6415 66.5178 53.6415 64.5068C53.6415 62.4957 52.0112 60.8655 50.0002 60.8655C47.9892 60.8655 46.3589 62.4957 46.3589 64.5068C46.3589 66.5178 47.9892 68.1481 50.0002 68.1481Z" fill="url(#paint3_linear_0_6682)"/>
                    <path opacity="0.36" d="M87.0647 49.0656C76.6298 54.9977 63.8294 58.4902 50.0004 58.4902C36.1704 58.4902 23.37 54.9977 12.9351 49.0656L40.8791 5.842C42.8896 2.73394 46.299 0.877686 50.0004 0.877686C53.7018 0.877686 57.1112 2.73394 59.1207 5.842L87.0647 49.0656Z" fill="url(#paint4_linear_0_6682)"/>
                    <defs>
                        <linearGradient id="paint0_linear_0_6682" x1="50" y1="0.877686" x2="50" y2="83.1223" gradientUnits="userSpaceOnUse"><stop stop-color="#FF7DD0"/><stop offset="1" stop-color="#F7009E"/></linearGradient>
                        <linearGradient id="paint1_linear_0_6682" x1="21.5279" y1="42" x2="78.3348" y2="42" gradientUnits="userSpaceOnUse"><stop stop-color="#FFD445"/><stop offset="0.9989" stop-color="#FF9A1F"/></linearGradient>
                        <linearGradient id="paint2_linear_0_6682" x1="50.0005" y1="21.5134" x2="50.0005" y2="55.8989" gradientUnits="userSpaceOnUse"><stop stop-color="#FF7DD0"/><stop offset="1" stop-color="#F7009E"/></linearGradient>
                        <linearGradient id="paint3_linear_0_6682" x1="50.0002" y1="60.8655" x2="50.0002" y2="68.1481" gradientUnits="userSpaceOnUse"><stop stop-color="#FF7DD0"/><stop offset="1" stop-color="#F7009E"/></linearGradient>
                        <linearGradient id="paint4_linear_0_6682" x1="50" y1="55.8796" x2="50" y2="3.12271" gradientUnits="userSpaceOnUse"><stop stop-color="white" stop-opacity="0.8"/><stop offset="1" stop-color="white" stop-opacity="0"/></linearGradient>
                    </defs>
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-[#F9FAFB] mb-2">
              Are You Sure?
            </h3>
            <p className="text-[#ffffff] mb-6">
              You are about to send this message to{" "}
              {sendToAll ? "all users" : `${selectedUsers.length} user(s)`}.
            </p>
            <div className="flex justify-center space-x-3">
              <button
                onClick={() => {
                  setConfirmModal(false);
                  setMessageModal(true); // Go back to editing
                }}
                className="px-6 py-2 bg-[#F7009E33] text-[#F9FAFB] rounded-md border border-[#896E9C] hover:bg-[#2A374B] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleFinalSend}
                className="px-6 py-2 bg-gradient-to-b from-[#FF7DD0] to-[#F7009E] text-white rounded-md hover:from-[#FF6BC9] hover:to-[#E6008F] transition-all duration-200"
              >
                Send to All
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };


  return (
    <div className="min-h-screen p-6">
      <div className="mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold text-[#F9FAFB]">
            Follower Management
          </h1>
          <div className="flex space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1); // Reset to first page on new search
                }}   
                className="pl-10 pr-4 py-2 bg-[#312B36] text-white rounded-md border border-[#896E9C] focus:outline-none focus:border-[#A38BB4]"
              />
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
            <button className="flex items-center px-4 py-2 bg-[#312B36] rounded-md border border-[#896E9C] hover:bg-[#2A374B] transition-colors text-[#F9FAFB]">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-1.447.894l-2-1A1 1 0 017 14v-2.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
              </svg>
              Filter
            </button>
          </div>
        </div>

        <div className="bg-[#312B36] rounded-lg overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-[#312B36] border-b border-[#896E9C]">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-[#F9FAFB] uppercase tracking-wider">NO</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-[#F9FAFB] uppercase tracking-wider">Name</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-[#F9FAFB] uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-[#F9FAFB] uppercase tracking-wider">Action</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-[#F9FAFB] uppercase tracking-wider">Push Message</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#896E9C]">
              {paginatedFollowers.map((follower, index) => (
                <tr key={follower.id} className="transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#F9FAFB]">
                    {(currentPage - 1) * itemsPerPage + index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img className="h-10 w-10 rounded-full object-cover" src={follower.avatar} alt={follower.name} />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-[#F9FAFB]">
                          {follower.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded ${getStatusColor(follower.status)}`}>
                      {follower.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button onClick={() => handleBlock(follower.id)} className="bg-[#45381F] text-[#FFB800] px-4 py-1 rounded-md hover:bg-[#5A4A28] transition-colors text-xs font-medium">
                        Block
                      </button>
                      <button onClick={() => handleRemove(follower.id)} className="bg-[#551214] text-[#FE4D4F] px-4 py-1 rounded-md hover:bg-[#6B1A1C] transition-colors text-xs font-medium">
                        Remove
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button onClick={() => handleSendMessage(true, follower.id)} className="bg-[#F7009E4D] text-[#F7009E] px-4 py-1 cursor-pointer rounded hover:from-[#FF6BC9] hover:to-[#E6008F] transition-all duration-200 text-xs font-medium">
                      Send Message
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* -- **FIXED**: DYNAMIC PAGINATION CONTROLS -- */}
        {totalPages > 0 && (
          <div className="flex justify-end items-center mt-6 space-x-2">
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-2 rounded-md bg-[#896E9C] text-white disabled:opacity-50 hover:bg-[#A38BB4] transition-colors"
            >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
            </button>

            {generatePagination().map((page, index) =>
                typeof page === 'number' ? (
                    <button
                        key={`${page}-${index}`}
                        onClick={() => handlePageChange(page)}
                        className={`px-3 py-2 rounded-md transition-colors ${
                        currentPage === page
                            ? "bg-[#FF7DD0] text-white"
                            : "bg-[#312B36] text-[#F9FAFB] border border-[#896E9C] hover:bg-[#896E9C]"
                        }`}
                    >
                        {page}
                    </button>
                ) : (
                    <span key={`dots-${index}`} className="px-3 py-2 text-[#F9FAFB]">
                        {page}
                    </span>
                )
            )}
            
            <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-2 rounded-md bg-[#896E9C] text-white disabled:opacity-50 hover:bg-[#A38BB4] transition-colors"
            >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
            </button>
          </div>
        )}
      </div>

      <MessageModal />
      <ConfirmModal />
    </div>
  );
};

export default FollowerManagement;