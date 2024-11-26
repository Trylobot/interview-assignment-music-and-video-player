import React from 'react';
import VideoList from './components/VideoList';
import Sidebar from './components/Sidebar';
import MediaPlayer from './components/MediaPlayer';

function App() {
  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <div className="flex-1 overflow-y-auto p-8">
          <VideoList />
        </div>
        <MediaPlayer />
      </div>
    </div>
  );
}

export default App;
