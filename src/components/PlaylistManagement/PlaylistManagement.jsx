"use client";
import React, { useState, useMemo, useEffect } from "react";

// The initial dataset is created to match the Playlist Management screenshot.
const initialPlaylists = [
  { id: 1, title: "2Am Vibes", coverArt: "/image/song-1.png", description: "Relaxing tunes for a laid-back day.", lastUpdated: "1:05pm - 10/04/2025", status: "Active" },
  { id: 2, title: "Ghetto Love", coverArt: "/image/song-2.png", description: "Relaxing tunes for a laid-back day.", lastUpdated: "5:05pm - 20/05/2025", status: "Active" },
  { id: 3, title: "Midnight Dreams", coverArt: "/image/song-3.png", description: "High-energy tracks to boost your workout.", lastUpdated: "4:06pm - 05/04/2025", status: "Active" },
  { id: 4, title: "Echoes of the Past", coverArt: "/image/song-4.png", description: "High-energy tracks to boost your workout.", lastUpdated: "3:04pm - 17/04/2025", status: "Active" },
  { id: 5, title: "Silent Whispers", coverArt: "/image/song-5.png", description: "Discover the best indie artists.", lastUpdated: "10:05pm - 08/08/2025", status: "Active" },
  { id: 6, title: "Hidden Pathways", coverArt: "/image/song-6.png", description: "Discover the best indie artists.", lastUpdated: "3:15am - 03/07/2025", status: "Inactive" },
  { id: 7, title: "City Lights", coverArt: "/image/song-7.png", description: "Discover the best indie artists.", lastUpdated: "8:03am - 27/10/2025", status: "Inactive" },
  { id: 8, title: "Elizeu Dias", coverArt: "/image/song-1.png", description: "Classic hits from the past.", lastUpdated: "5:03pm - 24/12/2025", status: "Active" },
  { id: 9, title: "Obafemi Moyosade", coverArt: "/image/song-1.png", description: "Classic hits from the past.", lastUpdated: "6:09pm - 20/09/2025", status: "Active" },
  { id: 10, title: "Kamil Feczko", coverArt: "/image/song-1.png", description: "Classic hits from the past.", lastUpdated: "1:25pm - 17/04/2025", status: "Inactive" },
  { id: 11, title: "Esther Howard", coverArt: "/image/song-1.png", description: "Instrumental music for meditation.", lastUpdated: "5:15am - 30/06/2025", status: "Inactive" },
  // Added more playlists for pagination demonstration
  { id: 12, title: "Morning Coffee", coverArt: "/image/playlist-1.png", description: "Acoustic tracks to start your day.", lastUpdated: "7:30am - 15/09/2025", status: "Active" },
  { id: 13, title: "Late Night Drive", coverArt: "/image/playlist-2.png", description: "Synthwave and electronic beats.", lastUpdated: "11:45pm - 14/09/2025", status: "Active" },
  { id: 14, title: "Workout Fury", coverArt: "/image/playlist-3.png", description: "Hard rock and metal anthems.", lastUpdated: "6:00pm - 13/09/2025", status: "Inactive" },
];


const PlaylistManagement = () => {
  const [playlists, setPlaylists] = useState(initialPlaylists);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  // **NEW**: State for managing the Edit Modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentPlaylist, setCurrentPlaylist] = useState(null);

  const itemsPerPage = 11;

  const filteredPlaylists = useMemo(() =>
    playlists.filter((playlist) =>
      playlist.title.toLowerCase().includes(searchTerm.toLowerCase())
    ), [playlists, searchTerm]);

  const totalPages = Math.ceil(filteredPlaylists.length / itemsPerPage);

  const paginatedPlaylists = filteredPlaylists.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  const handlePageChange = (page) => {
    const newPage = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(newPage);
  };
  
  const handleRemove = (playlistId) => {
    setPlaylists((prev) => {
        const newPlaylists = prev.filter((p) => p.id !== playlistId);
        const newTotalPages = Math.ceil(newPlaylists.length / itemsPerPage);
        if (currentPage > newTotalPages && newTotalPages > 0) {
            setCurrentPage(newTotalPages);
        }
        return newPlaylists;
    });
  };

  // **NEW**: Opens the modal and sets the playlist to be edited
  const handleEditClick = (playlist) => {
    setCurrentPlaylist(playlist);
    setIsEditModalOpen(true);
  };
  
  // **NEW**: Saves the updated playlist data
  const handleUpdatePlaylist = (updatedPlaylist) => {
    setPlaylists(playlists.map(p => p.id === updatedPlaylist.id ? updatedPlaylist : p));
    setIsEditModalOpen(false);
    setCurrentPlaylist(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-[#2BA84933] text-[#53C31B]";
      case "Inactive":
        return "bg-[#2196F333] text-[#2196F3]";
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

  // **NEW**: Edit Modal Component
  const EditModal = ({ playlist, onClose, onSave }) => {
    const [title, setTitle] = useState(playlist.title);
    const [description, setDescription] = useState(playlist.description);
    
    const handleSave = () => {
        onSave({ ...playlist, title, description });
    };

    if (!playlist) return null;

    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="bg-[#29232A] rounded-lg w-full max-w-2xl py-10">
                <div className="p-6">
                    <h3 className="text-xl font-semibold text-[#F9FAFB] mb-6">Edit Playlist</h3>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-[#F9FAFB] mb-2">Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full px-4 py-3 bg-black text-white rounded-md border border-[#896E9C] focus:outline-none focus:border-[#A38BB4]"
                        />
                    </div>
                    <div className="mb-8">
                        <label className="block text-sm font-medium text-[#F9FAFB] mb-2">Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full h-28 px-4 py-3 bg-black text-white rounded-md border border-[#896E9C] focus:outline-none focus:border-[#A38BB4]"
                            rows={3}
                        />
                    </div>
                    <div className="flex justify-end space-x-3">
                        <button onClick={onClose} className="px-5 py-2 bg-[#F7009E33] text-[#F9FAFB] rounded-md border border-[#896E9C] hover:bg-[#2A374B] transition-colors">Cancel</button>
                        <button onClick={handleSave} className="px-5 py-2 bg-gradient-to-b from-[#FF7DD0] to-[#F7009E] text-white rounded-md hover:from-[#FF6BC9] hover:to-[#E6008F] transition-all">Save Changes</button>
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
            Playlist
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
                <th className="px-6 py-4 text-left text-xs font-medium text-[#F9FAFB] uppercase tracking-wider">Title</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-[#F9FAFB] uppercase tracking-wider">Description</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-[#F9FAFB] uppercase tracking-wider">Last Updated</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-[#F9FAFB] uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-[#F9FAFB] uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#423a47]">
              {paginatedPlaylists.map((playlist, index) => (
                <tr key={playlist.id} className="hover:bg-[#3a333f] transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#F9FAFB]">
                    {(currentPage - 1) * itemsPerPage + index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img className="h-10 w-10 rounded-md object-cover" src={playlist.coverArt} alt={playlist.title} />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-[#F9FAFB]">{playlist.title}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-[#c1bec4] max-w-xs truncate">{playlist.description}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#c1bec4]">{playlist.lastUpdated}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(playlist.status)}`}>{playlist.status}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button onClick={() => handleEditClick(playlist)} className="bg-[#45381F] text-[#FFB800] px-4 py-1.5 rounded-md hover:bg-[#5A4A28] transition-colors text-xs font-medium">Edit</button>
                      <button onClick={() => handleRemove(playlist.id)} className="bg-[#551214] text-[#FE4D4F] px-4 py-1.5 rounded-md hover:bg-[#6B1A1C] transition-colors text-xs font-medium">Remove</button>
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

      {isEditModalOpen && (
        <EditModal 
            playlist={currentPlaylist}
            onClose={() => setIsEditModalOpen(false)}
            onSave={handleUpdatePlaylist}
        />
      )}
    </div>
  );
};

export default PlaylistManagement;