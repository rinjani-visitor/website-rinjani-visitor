'use client'

import React from 'react';
import YouTube from 'react-youtube';

const VideoPlayer = () => {
  const options = {
    width: '400',
    height: '250',
  };

  const onReady = (event) => {
    event.target.pauseVideo();
  };

  return (
    <div className='absolute right-2/4 transform translate-x-1/2 border-8 bottom-10 rounded-3xl overflow-hidden border-[green]'>
      <YouTube
        videoId='4PAwjEyuHB0'
        onReady={onReady}
        opts={options}
      />
    </div>
  );
};

export default VideoPlayer;
