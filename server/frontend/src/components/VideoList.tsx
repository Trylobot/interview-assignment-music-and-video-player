// src/components/VideoList.tsx
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../app/store';
import {
  fetchVideosStart,
  fetchVideosSuccess,
  fetchVideosFailure,
} from '../features/videos/videoSlice';
import YouTubeThumbnail from './YouTubeThumbnail';

const VideoList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { videos, loading, error } = useSelector(
    (state: RootState) => state.video
  );

  useEffect(() => {
    const fetchVideos = async () => {
      dispatch(fetchVideosStart()); // Now correctly recognized as needing no arguments
      try {
        // Replace with your API call
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

  if (loading) return <p>Loading videos...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Video List</h2>
      <ul>
        {videos.map((video) => (
          <li key={video.id}>
            <h3>{video.title}</h3>
            <YouTubeThumbnail url={video.url} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VideoList;
