document.addEventListener('DOMContentLoaded', function(){
    function loadYouTubeAPI() {
        const tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        document.body.appendChild(tag);
    }
    let player;
    window.onYouTubeIframeAPIReady = function() {
        player = new YT.Player('youtube-player', {
            height: '675',
            width: '100%',
            videoId: document.getElementById('youtube-player').getAttribute('video-id'),
            playerVars: {
                autoplay: 0,
                controls: 0,
                rel: 0
            },
            events: {
                onReady: onPlayerReady,
                onStateChange: onPlayerStateChange
            }
        });
    }
    function onPlayerReady(event) {
        console.log("Player is ready");
    }
    function onPlayerStateChange(event) {
		if (event.data === YT.PlayerState.PLAYING) {
			togglePlayButton();
			isPlaying = true;
		} else if (event.data === YT.PlayerState.PAUSED) {
			togglePlayButton();
			isPlaying = false;
		}
		if (event.data == YT.PlayerState.ENDED) {
			alert('Video ended');
		}
	}
	let isPlaying = false;
	const playPauseButton = document.getElementById('play-pause');
	playPauseButton.addEventListener('click', function() {
		if (isPlaying) {
			player.pauseVideo();
		} else {
			player.playVideo();
		}
		isPlaying = !isPlaying;
	});
	document.querySelector('.youtube-player-wrapper .thumb-img').addEventListener('click', function() {
		if (isPlaying) {
			player.pauseVideo();
		} else {
			player.playVideo();
		}
		isPlaying = !isPlaying;
	});
	function togglePlayButton(){
		document.querySelector('.play-btn').classList.toggle('active');
		document.querySelector('.pause-btn').classList.toggle('show');
		document.querySelector('.youtube-player-wrapper .thumb-img').classList.toggle('hide');
	}
    loadYouTubeAPI();
  })
  