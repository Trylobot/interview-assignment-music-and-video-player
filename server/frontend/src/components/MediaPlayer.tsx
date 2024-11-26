import React from 'react';
import { PlayCircleOutlined, PauseCircleOutlined } from '@ant-design/icons';

const MediaPlayer: React.FC = () => {
  return (
    <div className="bg-gray-800 p-4 flex items-center justify-between">
      <div className="flex items-center">
        <PlayCircleOutlined className="text-3xl mr-4 cursor-pointer" />
        <div>
          <p className="text-lg">In My Feelings</p>
          <p className="text-sm text-gray-400">Drake</p>
        </div>
      </div>
      <div className="flex-1 mx-4">
        <div className="bg-gray-600 h-1 rounded-lg">
          <div className="bg-green-500 h-1 rounded-lg" style={{ width: '40%' }}></div>
        </div>
      </div>
      <div>
        <p>2:49 / 3:37</p>
      </div>
    </div>
  );
};

export default MediaPlayer;