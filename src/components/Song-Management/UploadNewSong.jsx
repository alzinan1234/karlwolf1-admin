"use client";
import React, { useState } from 'react';

const UploadNewSong = ({ onBack, onSongUploaded }) => {
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
    onBack();
  };

  const handlePublish = () => {
    const newSong = {
      id: Date.now(), // Simple ID generation
      title: formData.title || 'New Song',
      artistImage: '/image/song-1.png', // Default image
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
  };

  const genres = ['Pop', 'Rock', 'Hip Hop', 'Jazz', 'Classical', 'Electronic', 'Country', 'R&B'];
  const languages = ['English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese', 'Japanese', 'Korean'];

  return (
    <div className="min-h-screen p-8 text-[#F9FAFB]">
      {/* Header */}
      <div className="flex items-center mb-8">
        <button 
          onClick={onBack}
          className="mr-4 p-2 hover:bg-[#312B36] rounded-lg transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <h1 className="text-2xl font-semibold">Upload New Song</h1>
      </div>

      {/* Main Content */}
      <div className="bg-[#312B36] rounded-lg p-8">
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
        <div className="flex justify-end space-x-4">
          <button
            onClick={handleCancel}
            className="px-6 py-3 bg-[#1D1B25] text-[#F9FAFB] rounded-md border border-[#896E9C] hover:bg-[#2A374B] transition-colors"
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
  );
}; 

export default UploadNewSong;