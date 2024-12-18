import React from 'react';
import { getYouTubeId } from './../util/misc';

type YouTubeThumbnailProps = {
  url: string;
};

const YouTubeThumbnail: React.FC<YouTubeThumbnailProps> = ({ url }) => {

  const videoId = getYouTubeId(url);

  if (!videoId) {
    return <div>Invalid YouTube URL</div>;
  }

  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  return (
    <div>
      <img src={thumbnailUrl} alt="YouTube Thumbnail" className="w-full h-auto rounded-lg shadow-md" />
    </div>
  );
};

export default YouTubeThumbnail;
