import React from 'react';
import { HomeOutlined, SearchOutlined } from '@ant-design/icons';

const Sidebar: React.FC = () => {
  return (
    <div className="w-64 bg-gray-800 p-4">
      <div className="text-3xl font-bold mb-8">Medea</div>
      <div className="flex items-center mb-6">
        <SearchOutlined className="mr-2 text-lg" />
        <input
          type="text"
          placeholder="Search"
          className="w-full bg-gray-700 p-2 rounded-lg text-white focus:outline-none"
        />
      </div>
      <div className="mb-6">
        <button className="flex items-center text-lg">
          <HomeOutlined className="mr-2" />
          Your Library
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
