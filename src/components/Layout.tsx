
import TrackPlayer from "./Views/TrackPlayer/TrackPlayer";
import { usePlayer } from "./context/PlayerContext";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { currentTrack, isPlaying, setIsPlaying, setCurrentTrack, tracks, currentTrackIndex, setCurrentTrackIndex } = usePlayer();
    const BASE_URL = import.meta.env.VITE_API_BASE_URL;


    const handlePreviousTrack = () => {
        if (currentTrackIndex > 0) {
            const previousTrack = tracks[currentTrackIndex - 1];
            setCurrentTrack(previousTrack); 
            setCurrentTrackIndex(currentTrackIndex - 1);
            setIsPlaying(true);
        }
    };

    const handleNextTrack = () => {
        if (currentTrackIndex < tracks.length - 1) {
            const nextTrack = tracks[currentTrackIndex + 1];
            setCurrentTrack(nextTrack);
            setCurrentTrackIndex(currentTrackIndex + 1); 
            setIsPlaying(true); 
        }
    };

    const trackUrl = currentTrack?.filePath?.startsWith("http") 
        ? currentTrack.filePath 
        : `${BASE_URL}${currentTrack?.filePath}`;

    const trackCoverUrl = currentTrack?.imageUrl?.startsWith("http") 
        ? currentTrack.imageUrl 
        : `${BASE_URL}${currentTrack?.imageUrl || "/images/placeholder.png"}`;

    return (
        <div className="app-layout">
            <div className="content">{children}</div>
            {currentTrack && (
                <TrackPlayer
                    track={trackUrl}
                    trackTitle={currentTrack.title}
                    trackArtist={currentTrack.artist}
                    trackCover={trackCoverUrl}
                    isPlaying={isPlaying}
                    onPlayPause={() => setIsPlaying(!isPlaying)}
                    onTrackEnd={handleNextTrack} 
                    onPreviousTrack={handlePreviousTrack} 
                    onNextTrack={handleNextTrack} 
                />
            )}
        </div>
    );
};

export default Layout;
