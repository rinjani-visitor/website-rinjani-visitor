'use client'

import React from 'react';
import YouTube from 'react-youtube';

const VideoPlayer = () => {
  const options = {
    width: '100%',
    height: '250',
  };

  const onReady = (event) => {
    event.target.pauseVideo();
  };

  return (
    <div
      className='border-8 md:w-4/5  rounded-3xl overflow-hidden border-rinjaniVisitor-green'
    >
      <YouTube
        videoId='4PAwjEyuHB0'
        onReady={onReady}
        opts={options}
      />
    </div>
  );
};

export default VideoPlayer;
