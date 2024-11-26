import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../app/store';
import {
  fetchVideosStart,
  fetchVideosSuccess,
  fetchVideosFailure,
} from '../features/videos/videoSlice';
import YouTubeThumbnail from './YouTubeThumbnail';
import { Modal, Input } from 'antd';

const VideoList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { videos, loading, error } = useSelector((state: RootState) => state.video);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentVideo, setCurrentVideo] = useState<{ name: string; url: string } | null>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      dispatch(fetchVideosStart());
      try {
        const response = await fetch('/videos');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        dispatch(fetchVideosSuccess(data));
      } catch (err) {
        if (err instanceof Error) {
          dispatch(fetchVideosFailure(err.message));
        } else {
          dispatch(fetchVideosFailure('An unknown error occurred'));
        }
      }
    };

    fetchVideos();
  }, [dispatch]);

  const showModal = (video: { name: string; url: string }) => {
    setCurrentVideo(video);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setCurrentVideo(null);
  };

  if (loading) return <p>Loading videos...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Video List</h2>
      <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {videos.map((video) => (
          <li key={video.id} className="cursor-pointer" onClick={() => showModal(video)}>
            <h3 className="text-lg font-semibold mb-2">{video.name}</h3>
            <YouTubeThumbnail url={video.url} />
          </li>
        ))}
      </ul>

      <Modal
        title="Edit Video"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        {currentVideo && (
          <div className="space-y-4">
            <Input
              className="mb-2"
              value={currentVideo.name}
              placeholder="Video Title"
              onChange={(e) =>
                setCurrentVideo({ ...currentVideo, name: e.target.value })
              }
            />
            <Input
              value={currentVideo.url}
              placeholder="Video URL"
              onChange={(e) =>
                setCurrentVideo({ ...currentVideo, url: e.target.value })
              }
            />
          </div>
        )}
      </Modal>
    </div>
  );
};

export default VideoList;
