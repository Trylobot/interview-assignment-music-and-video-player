import React from 'react';

type YouTubeThumbnailProps = {
  url: string;
};

const YouTubeThumbnail: React.FC<YouTubeThumbnailProps> = ({ url }) => {
  // Extract the YouTube video ID from the link
  const getYouTubeId = (url: string): string | null => {
    const regExp =
      /(?:youtube(?:-nocookie)?\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regExp);
    return match && match[1] ? match[1] : null;
  };

  const videoId = getYouTubeId(url);

  if (!videoId) {
    return <div>Invalid YouTube URL</div>;
  }

  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  return (
    <div>
      <img src={thumbnailUrl} alt="YouTube Thumbnail" />
    </div>
  );
};

export default YouTubeThumbnail;

// Usage example:
// <YouTubeThumbnail url="https://www.youtube.com/watch?v=dQw4w9WgXcQ" />
