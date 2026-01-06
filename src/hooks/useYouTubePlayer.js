import { useEffect, useRef, useState } from 'react';

const useYouTubePlayer = (videoId, options = {}) => {
  const playerRef = useRef(null);
  const [player, setPlayer] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const loadYouTubeAPI = () => {
      if (window.YT && window.YT.Player) {
        initializePlayer();
      } else {
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        
        window.onYouTubeIframeAPIReady = initializePlayer;
      }
    };

    const initializePlayer = () => {
      if (playerRef.current && window.YT) {
        const newPlayer = new window.YT.Player(playerRef.current, {
          height: '315',
          width: '560',
          videoId: videoId,
          playerVars: {
            autoplay: 0,
            controls: 1,
            modestbranding: 1,
            rel: 0,
            showinfo: 0,
            ...options.playerVars
          },
          events: {
            onReady: (event) => {
              setPlayer(event.target);
              setIsReady(true);
            },
            onStateChange: (event) => {
              setIsPlaying(event.data === window.YT.PlayerState.PLAYING);
            }
          }
        });
      }
    };

    loadYouTubeAPI();

    return () => {
      if (player) {
        player.destroy();
      }
    };
  }, [videoId, options.playerVars]);

  const playVideo = () => {
    if (player) {
      player.playVideo();
    }
  };

  const pauseVideo = () => {
    if (player) {
      player.pauseVideo();
    }
  };

  const stopVideo = () => {
    if (player) {
      player.stopVideo();
    }
  };

  return {
    playerRef,
    player,
    isReady,
    isPlaying,
    playVideo,
    pauseVideo,
    stopVideo
  };
};

export default useYouTubePlayer;
