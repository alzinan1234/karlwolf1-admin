import React from 'react';

const TopSong = () => {
  const songs = [
    {
      id: 1,
      title: '2Am Vibes',
      artistImage: '/image/song-1.png', // Replace with actual image path
      plays: 3458,
      bangs: 1234,
    },
    {
      id: 2,
      title: 'Ghetto Love',
      artistImage: '/image/song-2.png', // Replace with actual image path
      plays: 2890,
      bangs: 987,
    },
    {
      id: 3,
      title: 'Midnight Dreams',
      artistImage: '/image/song-3.png', // Replace with actual image path
      plays: 2123,
      bangs: 784,
    },
    {
      id: 4,
      title: 'Echoes of the Past',
      artistImage: '/image/song-1.png', // Replace with actual image path
      plays: 1557,
      bangs: 542,
    },
  ];

  return (
    <div className="w-full h-full p-6 bg-[#312B36] rounded-lg flex flex-col justify-start items-start gap-5">
      <div className="w-full flex justify-start items-center gap-4">
        <div className="flex-1 flex flex-col justify-start items-start gap-3">
          <div className="text-[#F9FAFB] text-lg font-semibold leading-7">Top Song</div>
        </div>
      </div>
      <div className="w-full bg-[rgba(30,41,59,0.20)] overflow-hidden rounded-md border border-[#896E9C]">
        <div className="flex flex-col justify-center items-start gap-1">
          {/* Table Header */}
          <div className="w-full px-8 py-4 border-b border-[#896E9C] flex justify-between items-center">
            <div className="flex-1 text-[#F9FAFB] text-xs font-semibold leading-4 tracking-wide">NO</div>
            <div className="flex-[3] text-[#F9FAFB] text-xs font-semibold leading-4 tracking-wide">Song</div>
            <div className="flex-1 text-[#F9FAFB] text-xs font-semibold leading-4 tracking-wide text-center">Plays</div>
            <div className="flex-1 text-[#F9FAFB] text-xs font-semibold leading-4 tracking-wide text-right">Bangs</div>
          </div>

          {/* Table Rows */}
          {songs.map((song) => (
            <div
              key={song.id}
              className="w-full h-15 px-8 py-2 flex justify-between items-center"
            >
              <div className="flex-1 text-[#F9FAFB] text-sm font-semibold leading-5 tracking-wide">
                {song.id}
              </div>
              <div className="flex-[3] flex items-center gap-4">
                <img src={song.artistImage} alt={song.title} className="w-10 h-10 rounded-[8px]" />
                <div className="text-[#F9FAFB] text-sm font-semibold leading-5 tracking-wide">
                  {song.title}
                </div>
              </div>
              <div className="flex-1 text-[#F9FAFB] text-sm font-normal leading-5 tracking-wide text-center">
                {song.plays.toLocaleString()}
              </div>
              <div className="flex-1 text-[#F9FAFB] text-sm font-normal leading-5 tracking-wide text-right">
                {song.bangs.toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopSong;