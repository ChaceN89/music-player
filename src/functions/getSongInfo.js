
export function extractSongData(fileName) {
    return new Promise((resolve, reject) => {
      // Create an absolute path for the audio file
      const filePath = `/music-files/${fileName}`;
      const absolutePath = `${window.location.origin}${filePath}`;
  
      let songInfo = {
        title: '',
        artist: '',
        album: '',
        duration: '',
        albumArt: ''
      };
  
      window.jsmediatags.read(absolutePath, {
        onSuccess: (tag) => {
          // Update songInfo with extracted metadata
          const songData = getSongData(tag.tags);
          songInfo.title = songData.title;
          songInfo.artist = songData.artist;
          songInfo.album = songData.album;
          songInfo.albumArt = getAlbumArt(tag.tags);
  
          // Get the duration of the audio file
          getAudioDuration(absolutePath, duration => {
            songInfo.duration = duration;
            resolve(songInfo);
          });
        },
        onError: (error) => {
          console.log(error);
          reject(error);
        }
      });
    });
  }

function getAlbumArt(tag) {
    if (tag.picture) {
      const { data, format } = tag.picture;
      let base64String = "";
      for (let i = 0; i < data.length; i++) {
        base64String += String.fromCharCode(data[i]);
      }
      const albumArt = `data:${format};base64,${window.btoa(base64String)}`;
      return albumArt;
    } else {
      return '/images/default_art.png'; // Path to default album art
    }
  }
  
function getSongData(tag) {
    return {
        title: tag.title || 'Unknown',
        artist: tag.artist || 'Unknown',
        album: tag.album || 'Unknown'
    };
}
  
function getAudioDuration(filePath, setDuration) {
    const audio = new Audio(filePath);
    audio.onloadedmetadata = () => {
        setDuration(`${Math.floor(audio.duration / 60)}:${Math.floor(audio.duration % 60).toString().padStart(2, '0')}`);
    };
    audio.onerror = () => {
        setDuration('Unknown');
    };
}
  