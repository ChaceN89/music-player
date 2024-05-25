
export function extractSongData(){
    return 
}

export function getAlbumArt(tag) {
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
  
export function getSongData(tag) {
    return {
        title: tag.title || 'Unknown',
        artist: tag.artist || 'Unknown',
        album: tag.album || 'Unknown'
    };
}
  
export function getAudioDuration(filePath, setDuration) {
    const audio = new Audio(filePath);
    audio.onloadedmetadata = () => {
        setDuration(`${Math.floor(audio.duration / 60)}:${Math.floor(audio.duration % 60).toString().padStart(2, '0')}`);
    };
    audio.onerror = () => {
        setDuration('Unknown');
    };
}
  