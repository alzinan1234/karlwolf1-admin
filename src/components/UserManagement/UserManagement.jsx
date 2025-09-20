"use client";
import React, { useState, useMemo } from "react";

// Initial dataset matching the User Management requirements
const initialUsers = [
  {
    id: 1,
    name: "Savannah Nguyen",
    avatar: "/image/song-1.png",
    status: "Active",
    lastActivity: "2025-05-23",
    subscriptions: "Premium",
  },
  {
    id: 2,
    name: "Annette Black",
    avatar: "/image/song-2.png",
    status: "Inactive",
    lastActivity: "2025-04-20",
    subscriptions: "Premium",
  },
  {
    id: 3,
    name: "Cody Fisher",
    avatar: "/image/song-3.png",
    status: "Active",
    lastActivity: "2025-03-15",
    subscriptions: "Free",
  },
  {
    id: 4,
    name: "Brooklyn Simmons",
    avatar: "/image/song-4.png",
    status: "Active",
    lastActivity: "2025-02-10",
    subscriptions: "Free",
  },
  {
    id: 5,
    name: "Ralph Edwards",
    avatar: "/image/song-5.png",
    status: "Active",
    lastActivity: "2025-01-05",
    subscriptions: "Premium",
  },
  {
    id: 6,
    name: "Courtney Henry",
    avatar: "/image/song-6.png",
    status: "Blocked",
    lastActivity: "2024-11-05",
    subscriptions: "Premium",
  },
  {
    id: 7,
    name: "Bessie Cooper",
    avatar: "/image/song-7.png",
    status: "Active",
    lastActivity: "2024-10-03",
    subscriptions: "Premium",
  },
  {
    id: 8,
    name: "Esther Howard",
    avatar: "/image/song-4.png",
    status: "Inactive",
    lastActivity: "2024-09-05",
    subscriptions: "Premium",
  },
  {
    id: 9,
    name: "Eleanor Pena",
    avatar: "/image/song-6.png",
    status: "Inactive",
    lastActivity: "2024-03-25",
    subscriptions: "Premium",
  },
  {
    id: 10,
    name: "Cameron Williamson",
    avatar: "/image/song-1.png",
    status: "Inactive",
    lastActivity: "2024-01-28",
    subscriptions: "Premium",
  },
  {
    id: 11,
    name: "Guy Hawkins",
    avatar: "/image/song-7.png",
    status: "Blocked",
    lastActivity: "2024-01-28",
    subscriptions: "Free",
  },
  {
    id: 12,
    name: "Jacob Jones",
    avatar: "/image/song-1.png",
    status: "Active",
    lastActivity: "2025-05-22",
    subscriptions: "Free",
  },
  {
    id: 13,
    name: "Kristin Watson",
    avatar: "/image/song-1.png",
    status: "Active",
    lastActivity: "2025-05-21",
    subscriptions: "Premium",
  },
  {
    id: 14,
    name: "Theresa Webb",
    avatar: "/image/song-2.png",
    status: "Inactive",
    lastActivity: "2025-05-20",
    subscriptions: "Free",
  },
  {
    id: 15,
    name: "Darrell Steward",
    avatar: "/image/song-3.png",
    status: "Blocked",
    lastActivity: "2025-05-19",
    subscriptions: "Premium",
  },
  {
    id: 16,
    name: "Marvin McKinney",
    avatar: "/image/song-4.png",
    status: "Active",
    lastActivity: "2025-05-18",
    subscriptions: "Premium",
  },
  {
    id: 17,
    name: "Wade Warren",
    avatar: "/image/song-5.png",
    status: "Active",
    lastActivity: "2025-05-17",
    subscriptions: "Free",
  },
  {
    id: 18,
    name: "Jane Cooper",
    avatar: "/image/song-6.png",
    status: "Inactive",
    lastActivity: "2025-05-16",
    subscriptions: "Premium",
  },
  {
    id: 19,
    name: "Robert Fox",
    avatar: "/image/song-7.png",
    status: "Active",
    lastActivity: "2025-05-15",
    subscriptions: "Free",
  },
  {
    id: 20,
    name: "Darlene Robertson",
    avatar: "/image/song-6.png",
    status: "Blocked",
    lastActivity: "2025-05-14",
    subscriptions: "Premium",
  },
  {
    id: 21,
    name: "Floyd Miles",
    avatar: "/image/song-2.png",
    status: "Active",
    lastActivity: "2025-05-13",
    subscriptions: "Free",
  },
  {
    id: 22,
    name: "Jenny Wilson",
    avatar: "/image/song-1.png",
    status: "Inactive",
    lastActivity: "2025-05-12",
    subscriptions: "Premium",
  },
];

const UserManagement = () => {
  // State management
  const [users, setUsers] = useState(initialUsers);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [messageModal, setMessageModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [message, setMessage] = useState("");
  const [sendToAll, setSendToAll] = useState(false);
  const [targetUserName, setTargetUserName] = useState("");

  const itemsPerPage = 11;

  // Filtered users based on search term
  const filteredUsers = useMemo(
    () =>
      users.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [users, searchTerm]
  );

  // Pagination calculations
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Page navigation handler
  const handlePageChange = (page) => {
    const newPage = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(newPage);
  };

  // Individual user selection handler
  const handleSelectUser = (userId) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  // Select/deselect all users on current page
  const handleSelectAll = () => {
    const currentPageIds = paginatedUsers.map((u) => u.id);
    const allOnPageSelected = currentPageIds.every((id) =>
      selectedUsers.includes(id)
    );

    if (allOnPageSelected) {
      // Deselect all on current page
      setSelectedUsers((prev) =>
        prev.filter((id) => !currentPageIds.includes(id))
      );
    } else {
      // Select all on current page
      setSelectedUsers((prev) => [...new Set([...prev, ...currentPageIds])]);
    }
  };

  // Block user handler
  const handleBlock = (userId) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, status: "Blocked" } : u))
    );
  };

  // Remove user handler with pagination adjustment
  const handleRemove = (userId) => {
    setUsers((prev) => {
      const newUsers = prev.filter((u) => u.id !== userId);
      const newFilteredUsers = newUsers.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      const newTotalPages = Math.ceil(newFilteredUsers.length / itemsPerPage);

      // Adjust current page if necessary
      if (currentPage > newTotalPages && newTotalPages > 0) {
        setCurrentPage(newTotalPages);
      } else if (paginatedUsers.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }

      return newUsers;
    });

    // Remove from selected users
    setSelectedUsers((prev) => prev.filter((id) => id !== userId));
  };

  // Send message handler for individual users or all users
  const handleSendMessage = (individual = false, userId = null) => {
    if (individual && userId) {
      const user = users.find((u) => u.id === userId);
      setTargetUserName(user ? user.name : "");
      setSelectedUsers([userId]);
      setSendToAll(false);
    } else {
      setTargetUserName("");
      setSendToAll(true);
      setSelectedUsers([]);
    }
    setMessageModal(true);
  };

  // Send message to selected users handler
  const handleMessageSelected = () => {
    if (selectedUsers.length === 0) return;
    setSendToAll(false);
    setTargetUserName("");
    setMessageModal(true);
  };

  // Confirm message send
  const handleConfirmSend = () => {
    if (!message.trim()) {
      alert("Message cannot be empty.");
      return;
    }
    setMessageModal(false);
    setConfirmModal(true);
  };

  // Final message send
  const handleFinalSend = () => {
    console.log("Sending message:", message);
    console.log("To users:", sendToAll ? "All filtered users" : selectedUsers);

    // Reset states
    setConfirmModal(false);
    setMessage("");
    setSelectedUsers([]);
    setSendToAll(false);
    setTargetUserName("");

    alert("Message sent successfully!");
  };

  // Get status color classes
  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-[#2BA84933] text-[#53C31B]";
      case "Inactive":
        return "bg-[#2196F333] text-[#2196F3]";
      case "Blocked":
        return "bg-[#FF9F4333] text-[#FF9F43]";
      default:
        return "bg-gray-700 text-gray-200";
    }
  };

  // Generate pagination numbers
  const generatePagination = () => {
    if (totalPages <= 1) return [];

    const pages = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
      return pages;
    }

    // Always show first page
    pages.push(1);

    let start = Math.max(2, currentPage - 1);
    let end = Math.min(totalPages - 1, currentPage + 1);

    // Adjust range near end
    if (currentPage > totalPages - 3) {
      start = totalPages - 3;
    }

    // Adjust range near beginning
    if (currentPage < 4) {
      end = 4;
    }

    // Add ellipsis if needed
    if (start > 2) {
      pages.push("...");
    }

    // Add middle pages
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    // Add ellipsis if needed
    if (end < totalPages - 1) {
      pages.push("...");
    }

    // Always show last page
    pages.push(totalPages);

    return pages;
  };

  // Message Modal Component
  const MessageModal = () => {
    if (!messageModal) return null;

    const getRecipientText = () => {
      if (sendToAll) return "all users";
      if (targetUserName) return targetUserName;
      if (selectedUsers.length > 1)
        return `${selectedUsers.length} selected users`;
      if (selectedUsers.length === 1) {
        const user = users.find((u) => u.id === selectedUsers[0]);
        return user ? user.name : "1 user";
      }
      return "users";
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-[#312B36] rounded-lg p-6 w-96 max-w-sm mx-4">
          <h3 className="text-xl font-semibold text-[#F9FAFB] mb-4">
            Send Message
          </h3>
          <p className="text-[#c1bec4] mb-4">
            Sending message to:{" "}
            <span className="text-[#F7009E] font-medium">
              {getRecipientText()}
            </span>
          </p>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message here..."
            className="w-full h-32 p-3 bg-[#423a47] text-white rounded-md border border-[#896E9C] focus:outline-none focus:border-[#A38BB4] resize-none"
          />
          <div className="flex justify-end space-x-3 mt-4">
            <button
              onClick={() => {
                setMessageModal(false);
                setMessage("");
                if (!sendToAll && !targetUserName) {
                  setSelectedUsers([]);
                }
              }}
              className="px-4 py-2 bg-[#423a47] text-[#c1bec4] rounded-md hover:bg-[#4a414e] transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmSend}
              className="px-4 py-2 bg-[#F7009E] text-white rounded-md hover:bg-[#d6008a] transition-colors"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Confirmation Modal Component
  const ConfirmModal = () => {
    if (!confirmModal) return null;

    const getRecipientText = () => {
      if (sendToAll) return "all users";
      if (targetUserName) return targetUserName;
      if (selectedUsers.length > 1)
        return `${selectedUsers.length} selected users`;
      if (selectedUsers.length === 1) {
        const user = users.find((u) => u.id === selectedUsers[0]);
        return user ? user.name : "1 user";
      }
      return "users";
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-[#312B36] rounded-lg p-6 w-96 max-w-sm mx-4">
          <h3 className="text-xl font-semibold text-[#F9FAFB] mb-4">
            Confirm Message
          </h3>
          <p className="text-[#c1bec4] mb-2">
            Are you sure you want to send this message to{" "}
            <span className="text-[#F7009E] font-medium">
              {getRecipientText()}
            </span>
            ?
          </p>
          <div className="bg-[#423a47] p-3 rounded-md mt-4 mb-4">
            <p className="text-[#F9FAFB] text-sm">{message}</p>
          </div>
          <div className="flex justify-end space-x-3">
            <button
              onClick={() => {
                setConfirmModal(false);
                setMessageModal(true);
              }}
              className="px-4 py-2 bg-[#423a47] text-[#c1bec4] rounded-md hover:bg-[#4a414e] transition-colors"
            >
              Back
            </button>
            <button
              onClick={handleFinalSend}
              className="px-4 py-2 bg-[#F7009E] text-white rounded-md hover:bg-[#d6008a] transition-colors"
            >
              Confirm Send
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen p-4 sm:p-6">
      <div className="mx-auto">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-2xl font-semibold text-[#F9FAFB]">
            User Management
          </h1>
          <div className="flex items-center space-x-4">
            {/* Search Input */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                  setSelectedUsers([]);
                }}
                className="pl-10 pr-4 py-2 w-48 bg-[#312B36] text-white rounded-md border border-[#896E9C] focus:outline-none focus:border-[#A38BB4]"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>

            {/* Dynamic Message Button */}
            {selectedUsers.length > 0 ? (
              <button
                onClick={handleMessageSelected}
                className="px-4 py-2 bg-[#F7009E4D] text-[#F7009E] cursor-pointer rounded-md hover:bg-[#f7009e66] transition-colors text-sm font-medium whitespace-nowrap"
              >
                Message Selected ({selectedUsers.length})
              </button>
            ) : (
              <button
                onClick={() => handleSendMessage()}
                className="px-4 py-2 bg-[#F7009E4D] text-[#F7009E] cursor-pointer rounded-md hover:bg-[#f7009e66] transition-colors text-sm font-medium whitespace-nowrap"
              >
                Push Message to All
              </button>
            )}
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-[#312B36] rounded-lg overflow-x-auto">
          <table className="min-w-full">
            <thead className="border-b border-[#896E9C]">
              <tr>
                {/* Select All Checkbox */}
                <th className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      onChange={handleSelectAll}
                      checked={
                        paginatedUsers.length > 0 &&
                        paginatedUsers.every((user) =>
                          selectedUsers.includes(user.id)
                        )
                      }
                      className="form-checkbox h-5 w-5 bg-transparent border-[#896E9C] rounded text-[#F7009E] focus:ring-0 focus:ring-offset-0"
                    />
                    <span
                      onClick={handleSelectAll}
                      className="text-xs font-medium text-[#F9FAFB] uppercase tracking-wider cursor-pointer select-none"
                    >
                      Select All
                    </span>
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-[#F9FAFB] uppercase tracking-wider">
                  NO
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-[#F9FAFB] uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-[#F9FAFB] uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-[#F9FAFB] uppercase tracking-wider">
                  Last Activity
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-[#F9FAFB] uppercase tracking-wider">
                  Subscriptions
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-[#F9FAFB] uppercase tracking-wider">
                  Action
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-[#F9FAFB] uppercase tracking-wider">
                  Push Message
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#423a47]">
              {paginatedUsers.map((user, index) => (
                <tr
                  key={user.id}
                  className="hover:bg-[#3a333f] transition-colors"
                >
                  {/* Individual User Checkbox */}
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user.id)}
                      onChange={() => handleSelectUser(user.id)}
                      className="form-checkbox h-5 w-5 bg-transparent border-[#896E9C] rounded text-[#F7009E] focus:ring-0 focus:ring-offset-0"
                    />
                  </td>

                  {/* Row Number */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#F9FAFB]">
                    {(currentPage - 1) * itemsPerPage + index + 1}
                  </td>

                  {/* User Name and Avatar */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img
                          className="h-10 w-10 rounded-full object-cover"
                          src={user.avatar}
                          alt={user.name}
                          onError={(e) => {
                            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                              user.name
                            )}&background=F7009E&color=fff`;
                          }}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-[#F9FAFB]">
                          {user.name}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                        user.status
                      )}`}
                    >
                      {user.status}
                    </span>
                  </td>

                  {/* Last Activity */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#c1bec4]">
                    {user.lastActivity}
                  </td>

                  {/* Subscriptions */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#c1bec4]">
                    {user.subscriptions}
                  </td>

                  {/* Action Buttons */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleBlock(user.id)}
                        className="bg-[#45381F] text-[#FFB800] px-4 py-1.5 rounded-md hover:bg-[#5A4A28] transition-colors text-xs font-medium"
                        disabled={user.status === "Blocked"}
                      >
                        Block
                      </button>
                      <button
                        onClick={() => handleRemove(user.id)}
                        className="bg-[#551214] text-[#FE4D4F] px-4 py-1.5 rounded-md hover:bg-[#6B1A1C] transition-colors text-xs font-medium"
                      >
                        Remove
                      </button>
                    </div>
                  </td>

                  {/* Individual Message Button */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleSendMessage(true, user.id)}
                      className="bg-[#F7009E4D] text-[#F7009E] px-4 py-1.5 cursor-pointer rounded-md hover:bg-[#f7009e66] transition-colors text-xs font-medium"
                    >
                      Send Message
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-[#c1bec4]">
              Showing{" "}
              {Math.min(
                (currentPage - 1) * itemsPerPage + 1,
                filteredUsers.length
              )}{" "}
              to {Math.min(currentPage * itemsPerPage, filteredUsers.length)} of{" "}
              {filteredUsers.length} results
            </div>
            <div className="flex items-center space-x-2">
              {/* Previous Button */}
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-2 text-sm font-medium text-[#c1bec4] bg-[#312B36] border border-[#896E9C] rounded-md hover:bg-[#3a333f] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>

              {/* Page Numbers */}
              {generatePagination().map((page, index) => (
                <button
                  key={index}
                  onClick={() =>
                    typeof page === "number" && handlePageChange(page)
                  }
                  disabled={page === "..."}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    page === currentPage
                      ? "bg-[#F7009E] text-white"
                      : page === "..."
                      ? "text-[#c1bec4] cursor-default"
                      : "text-[#c1bec4] bg-[#312B36] border border-[#896E9C] hover:bg-[#3a333f]"
                  }`}
                >
                  {page}
                </button>
              ))}

              {/* Next Button */}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-2 text-sm font-medium text-[#c1bec4] bg-[#312B36] border border-[#896E9C] rounded-md hover:bg-[#3a333f] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      <MessageModal />
      <ConfirmModal />
    </div>
  );
};

export default UserManagement;
