import React from 'react';
import YouTube, { YouTubeProps } from 'react-youtube';

type YouTubeThumbnailProps = {
  url: string;
};

const YouTubeThumbnail: React.FC<YouTubeThumbnailProps> = ({ url }) => {
  
  const onPlayerReady: YouTubeProps['onReady'] = (event) => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  };

  const opts: YouTubeProps['opts'] = {
    height: '390',
    width: '640',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };  

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

  // const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  // return (
  //   <div>
  //     <img src={thumbnailUrl} alt="YouTube Thumbnail" className="w-full h-auto rounded-lg shadow-md" />
  //   </div>
  // );

  return (
    <div>
      <YouTube videoId={videoId} opts={opts} onReady={onPlayerReady} />
    </div>
  );

};

export default YouTubeThumbnail;
