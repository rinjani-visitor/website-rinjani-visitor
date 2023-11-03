'use client'

import Youtube from 'react-youtube'

const VideoPlayer = () => {
  const option = {
    width: "400px",
    height: "250px"
  }

  return (
    <div className='absolute right-2/4 translate-x-1/2 border-8 bottom-10 rounded-3xl overflow-hidden border-[green]'>
      <Youtube
        videoId='4PAwjEyuHB0'
        onReady={(event) => event.target.pauseVideo()}
        opts = {option}
      />
    </div>
  )
}

export default VideoPlayer