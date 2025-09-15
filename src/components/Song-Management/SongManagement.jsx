"use client";
import React, { useState } from 'react';

// UploadNewSong Modal Component
const UploadNewSongModal = ({ isOpen, onClose, onSongUploaded }) => {
  const [formData, setFormData] = useState({
    title: '',
    artist: '',
    genre: '',
    language: '',
    audioFile: null,
    coverImage: null
  });

  const [dragOver, setDragOver] = useState({
    audio: false,
    cover: false
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    setFormData(prev => ({
      ...prev,
      [type]: file
    }));
  };

  const handleDragOver = (e, type) => {
    e.preventDefault();
    setDragOver(prev => ({
      ...prev,
      [type]: true
    }));
  };

  const handleDragLeave = (e, type) => {
    e.preventDefault();
    setDragOver(prev => ({
      ...prev,
      [type]: false
    }));
  };

  const handleDrop = (e, type) => {
    e.preventDefault();
    setDragOver(prev => ({
      ...prev,
      [type]: false
    }));
    
    const file = e.dataTransfer.files[0];
    setFormData(prev => ({
      ...prev,
      [type]: file
    }));
  };

  const handleCancel = () => {
    setFormData({
      title: '',
      artist: '',
      genre: '',
      language: '',
      audioFile: null,
      coverImage: null
    });
    onClose();
  };

  const handlePublish = () => {
    const newSong = {
      id: Date.now(),
      title: formData.title || 'New Song',
      artistImage: '/image/song-1.png',
      status: 'Published',
      plays: 0,
      bangs: 0,
    };
    
    onSongUploaded(newSong);
    setFormData({
      title: '',
      artist: '',
      genre: '',
      language: '',
      audioFile: null,
      coverImage: null
    });
    alert('Song published successfully!');
    onClose();
  };

  const genres = ['Pop', 'Rock', 'Hip Hop', 'Jazz', 'Classical', 'Electronic', 'Country', 'R&B'];
  const languages = ['English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese', 'Japanese', 'Korean'];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80  flex items-center justify-center z-50 p-4">
      <div className="bg-[#312B36] rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#896E9C]">
          <h2 className="text-2xl font-semibold text-[#F9FAFB]">Upload New Song</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-[#1D1B25] rounded-lg transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-[#F9FAFB]"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Upload Audio File */}
            <div>
              <label className="block text-sm font-medium text-[#F9FAFB] mb-3">
                Upload Audio File
              </label>
              <div
                className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  dragOver.audio 
                    ? 'border-[#FF7DD0] bg-[#FF7DD0]/10' 
                    : 'border-[#896E9C] hover:border-[#A38BB4]'
                }`}
                onDragOver={(e) => handleDragOver(e, 'audioFile')}
                onDragLeave={(e) => handleDragLeave(e, 'audioFile')}
                onDrop={(e) => handleDrop(e, 'audioFile')}
              >
                <input
                  type="file"
                  accept="audio/*"
                  onChange={(e) => handleFileChange(e, 'audioFile')}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="flex flex-col items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 text-[#896E9C] mb-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                    />
                  </svg>
                  <h3 className="text-lg font-medium text-[#F9FAFB] mb-2">Upload Audio</h3>
                  <p className="text-sm text-[#896E9C]">
                    {formData.audioFile 
                      ? formData.audioFile.name 
                      : 'File must be under 100MB and over 30 seconds long'
                    }
                  </p>
                </div>
              </div>
            </div>

            {/* Upload Cover */}
            <div>
              <label className="block text-sm font-medium text-[#F9FAFB] mb-3">
                Upload Cover
              </label>
              <div
                className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  dragOver.cover 
                    ? 'border-[#FF7DD0] bg-[#FF7DD0]/10' 
                    : 'border-[#896E9C] hover:border-[#A38BB4]'
                }`}
                onDragOver={(e) => handleDragOver(e, 'coverImage')}
                onDragLeave={(e) => handleDragLeave(e, 'coverImage')}
                onDrop={(e) => handleDrop(e, 'coverImage')}
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, 'coverImage')}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="flex flex-col items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 text-[#896E9C] mb-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <h3 className="text-lg font-medium text-[#F9FAFB] mb-2">Upload Cover</h3>
                  <p className="text-sm text-[#896E9C]">
                    {formData.coverImage 
                      ? formData.coverImage.name 
                      : 'Image must be in JPG or PNG format and at least 300x300 pixels'
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-[#F9FAFB] mb-2">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter song title"
                className="w-full px-4 py-3 bg-[#1D1B25] text-white rounded-md border border-[#896E9C] focus:outline-none focus:border-[#A38BB4] transition-colors"
              />
            </div>

            {/* Artist */}
            <div>
              <label className="block text-sm font-medium text-[#F9FAFB] mb-2">
                Artist
              </label>
              <input
                type="text"
                name="artist"
                value={formData.artist}
                onChange={handleInputChange}
                placeholder="Enter artist name"
                className="w-full px-4 py-3 bg-[#1D1B25] text-white rounded-md border border-[#896E9C] focus:outline-none focus:border-[#A38BB4] transition-colors"
              />
            </div>

            {/* Genre */}
            <div>
              <label className="block text-sm font-medium text-[#F9FAFB] mb-2">
                Genre
              </label>
              <select
                name="genre"
                value={formData.genre}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-[#1D1B25] text-white rounded-md border border-[#896E9C] focus:outline-none focus:border-[#A38BB4] transition-colors appearance-none"
              >
                <option value="">Select genre</option>
                {genres.map(genre => (
                  <option key={genre} value={genre}>{genre}</option>
                ))}
              </select>
            </div>

            {/* Language */}
            <div>
              <label className="block text-sm font-medium text-[#F9FAFB] mb-2">
                Language
              </label>
              <select
                name="language"
                value={formData.language}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-[#1D1B25] text-white rounded-md border border-[#896E9C] focus:outline-none focus:border-[#A38BB4] transition-colors appearance-none"
              >
                <option value="">Select language</option>
                {languages.map(language => (
                  <option key={language} value={language}>{language}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-start space-x-4">
            <button
              onClick={handleCancel}
              className="px-6 py-3 bg-[#F7009E33] text-[#F9FAFB] rounded-md  border-[#896E9C] hover:bg-[#2A374B] transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handlePublish}
              className="px-6 py-3 bg-gradient-to-b from-[#FF7DD0] to-[#F7009E] hover:from-[#FF6BC9] hover:to-[#E6008F] text-white rounded-md transition-all duration-200"
            >
              Publish Song
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main SongManagement Component
const SongManagement = () => {
  const [songs, setSongs] = useState([
    {
      id: 1,
      title: '2Am Vibes',
      artistImage: '/image/song-1.png',
      status: 'Published',
      plays: 3458,
      bangs: 1234,
    },
    {
      id: 2,
      title: 'Ghetto Love',
      artistImage: '/image/song-2.png',
      status: 'Published',
      plays: 2890,
      bangs: 1134,
    },
    {
      id: 3,
      title: 'Midnight Dreams',
      artistImage: '/image/song-3.png',
      status: 'Published',
      plays: 3358,
      bangs: 1124,
    },
    {
      id: 4,
      title: 'Echoes of the Past',
      artistImage: '/image/song-4.png',
      status: 'Published',
      plays: 2458,
      bangs: 1034,
    },
    {
      id: 5,
      title: 'Silent Whispers',
      artistImage: '/image/song-5.png',
      status: 'Published',
      plays: 2358,
      bangs: 1024,
    },
    {
      id: 6,
      title: 'Hidden Pathways',
      artistImage: '/image/song-6.png',
      status: 'Published',
      plays: 2258,
      bangs: 1004,
    },
    {
      id: 7,
      title: 'City Lights',
      artistImage: '/image/song-1.png',
      status: 'Published',
      plays: 2158,
      bangs: 1001,
    },
    {
      id: 8,
      title: 'Elizeu Dias',
      artistImage: '/image/song-7.png',
      status: 'Published',
      plays: 2058,
      bangs: 987,
    },
    {
      id: 9,
      title: 'Obafemi Moyosade',
      artistImage: '/image/song-4.png',
      status: 'Published',
      plays: 2123,
      bangs: 784,
    },
    {
      id: 10,
      title: 'Kamil Feczko',
      artistImage: '/image/song-6.png',
      status: 'Published',
      plays: 1557,
      bangs: 542,
    },
  ]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(songs.length / itemsPerPage);

  const paginatedSongs = songs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleView = (id) => {
    alert(`Viewing song with ID: ${id}`);
  };

  const handleEdit = (id) => {
    alert(`Editing song with ID: ${id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm(`Are you sure you want to delete song with ID: ${id}?`)) {
      setSongs(songs.filter((song) => song.id !== id));
    }
  };

  const handleUploadClick = () => {
    setIsUploadModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsUploadModalOpen(false);
  };

  const handleSongUploaded = (newSong) => {
    setSongs(prevSongs => [newSong, ...prevSongs]);
  };

  return (
    <div className="min-h-screen p-8 text-[#F9FAFB]">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold">Song Management</h1>
        <button 
          onClick={handleUploadClick}
          className="flex items-center px-4 py-2 bg-gradient-to-b from-[#FF7DD0] to-[#F7009E] hover:bg-fuchsia-600 cursor-pointer text-white rounded transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
          Upload New Song
        </button>
      </div>

      {/* Main Content Area */}
      <div className="bg-[#312B36] rounded-lg p-6">
        {/* Search and Filter */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Song</h2>
          <div className="flex space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="pl-10 pr-4 py-2 bg-[#1D1B25] text-white rounded-md border border-[#896E9C] focus:outline-none focus:border-[#A38BB4]"
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
            <button className="flex items-center px-4 py-2 bg-[#1D1B25] rounded-md border border-[#896E9C] hover:bg-[#2A374B] transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-1.447.894l-2-1A1 1 0 017 14v-2.586L3.293 6.707A1 1 0 013 6V3z"
                  clipRule="evenodd"
                />
              </svg>
              Filter
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-md border border-[#896E9C]">
          <table className="min-w-full divide-y divide-[#896E9C]">
            <thead className="">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-[#F9FAFB] uppercase tracking-wider"
                >
                  NO
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-[#F9FAFB] uppercase tracking-wider"
                >
                  Song
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-[#F9FAFB] uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-[#F9FAFB] uppercase tracking-wider"
                >
                  Plays
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-[#F9FAFB] uppercase tracking-wider"
                >
                  BANGs
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium text-[#F9FAFB] uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className=" divide-[#896E9C]">
              {paginatedSongs.map((song) => (
                <tr key={song.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#F9FAFB]">
                    {song.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img
                          className="h-10 w-10 rounded-lg object-cover"
                          src={song.artistImage}
                          alt={song.title}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-[#F9FAFB]">
                          {song.title}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-6 py-1 inline-flex text-xs leading-5 font-semibold rounded ${
                        song.status === 'Published'
                          ? 'bg-[#2BA84933] text-[#53C31B]'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {song.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#F9FAFB]">
                    {song.plays.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#F9FAFB]">
                    {song.bangs.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleView(song.id)}
                      className="text-[#245FE7] bg-[#2196F333] hover:text-blue-600 mr-3 px-6 py-1 rounded-md hover:border-blue-600 transition-colors"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleEdit(song.id)}
                      className="text-yellow-400 bg-[#45381F] hover:text-yellow-600 mr-3 px-8 py-1 rounded-md hover:border-yellow-600 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(song.id)}
                      className="text-[#FE4D4F] bg-[#551214] hover:text-red-600 px-6 py-1 rounded-md transition-colors"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-end items-center mt-6 space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded-md bg-[#896E9C] disabled:opacity-50 hover:bg-[#A38BB4] transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`px-3 py-1 rounded-md ${
                currentPage === index + 1
                  ? 'bg-[#896E9C]'
                  : 'bg-[#1E293B] border border-[#896E9C]'
              } hover:bg-[#A38BB4] transition-colors`}
            >
              {index + 1}
            </button>
          ))}
          <span className="px-3 py-1 text-[#F9FAFB]">...</span>
          <button
            onClick={() => handlePageChange(totalPages)}
            className={`px-3 py-1 rounded-md ${
              currentPage === totalPages
                ? 'bg-[#896E9C]'
                : 'bg-[#1E293B] border border-[#896E9C]'
            } hover:bg-[#A38BB4] transition-colors`}
          >
            {totalPages}
          </button>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded-md bg-[#896E9C] disabled:opacity-50 hover:bg-[#A38BB4] transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Upload Modal */}
      <UploadNewSongModal 
        isOpen={isUploadModalOpen}
        onClose={handleCloseModal}
        onSongUploaded={handleSongUploaded}
      />
    </div>
  );
};

export default SongManagement;