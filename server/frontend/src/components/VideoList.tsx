import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../app/store';
import {
  fetchVideosStart,
  fetchVideosSuccess,
  fetchVideosFailure,
} from '../features/videos/videoSlice';
import YouTubeThumbnail from './YouTubeThumbnail';
import YouTube, { YouTubeProps } from 'react-youtube';
import { Modal, Input, Button } from 'antd';
import { getYouTubeId } from './../util/misc';


type VideoProps = {
  id: number;
  name: string;
  url: string;
  createdAt: number;
  updatedAt: number;
};

const VideoList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { videos, loading, error } = useSelector((state: RootState) => state.video);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentVideo, setCurrentVideo] = useState<VideoProps|null>(null);

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

  useEffect(() => {
    fetchVideos();
  }, [dispatch]);

  const showModal = (video:VideoProps) => {
    setCurrentVideo(video);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setCurrentVideo(null);
  };

  const handleCreate = () => {
    setCurrentVideo(null);
    setIsModalVisible(true);
  };

  const handleSave = async () => {
    if (currentVideo) {
      const path = currentVideo.id ? `/videos/${currentVideo.id}` : '/videos';
      const method = currentVideo.id ? 'PUT' : 'POST';
      const headers = { 'Content-Type': 'application/json' };
      try {
        const response = await fetch( path, {
          method,
          headers,
          body: JSON.stringify({
            id: currentVideo.id,
            name: currentVideo.name,
            url: currentVideo.url,
            createdAt: currentVideo.createdAt || Math.floor(Date.now() / 1000),
            updatedAt: Math.floor(Date.now() / 1000),
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        await fetchVideos();
        handleCancel();
      } catch (err) {
        console.error('Failed to save video:', err);
        dispatch(fetchVideosFailure('Failed to save video'));
      }
    }
  };

  if (loading) return <p>Loading videos...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Video List</h2>
      <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {videos.map((video) => (
          <li key={video.id} className="cursor-pointer" onClick={() => showModal(video)}>
            <YouTubeThumbnail url={video.url} />
            <h3 className="text-lg font-semibold mb-2">{video.name}</h3>
          </li>
        ))}
      </ul>

      <br/>
      <Button type="primary" onClick={handleCreate}>Create</Button>

      <Modal
        title="Edit Video"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <div className="space-y-4">
          <Input
            className="mb-2"
            value={currentVideo?.name||''}
            placeholder="Video Title"
            onChange={(e) =>
              setCurrentVideo(prev => ({ 
                ...(prev as VideoProps), 
                name: e.target.value 
              }))
            }
          />
          <Input
            value={currentVideo?.url||''}
            placeholder="Video URL"
            onChange={(e) =>
              setCurrentVideo(prev => ({ 
                ...(prev as VideoProps), 
                url: e.target.value 
              }))
            }
          />
          <YouTube videoId={getYouTubeId(currentVideo?.url||'') || undefined} 
            opts={{
              width: '472',
              height: '275',
              playerVars: {
                autoplay: 0,
              },
            }} />
          <Button type="primary" onClick={handleSave}>Save</Button>
          
        </div>
      </Modal>
    </div>
  );
};

export default VideoList;
