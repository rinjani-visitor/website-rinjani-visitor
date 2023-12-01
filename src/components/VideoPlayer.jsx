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
    <div
      className='static mx-auto w-80 md:w-auto md:absolute md:-left-24 md:bottom-12 border-8 rounded-3xl overflow-hidden border-rinjaniVisitor-green'
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
