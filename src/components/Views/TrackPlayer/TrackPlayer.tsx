import React, { useEffect, useRef, useState } from "react";
import "./TrackPlayer.css";

interface TrackPlayerProps {
    track: string | null;
    trackTitle: string;
    trackArtist: string;
    trackCover: string;
    isPlaying: boolean;
    onPlayPause: () => void;
    onTrackEnd: () => void;
    onPreviousTrack: () => void;
    onNextTrack: () => void;
}

const TrackPlayer: React.FC<TrackPlayerProps> = ({
    track,
    trackTitle,
    trackArtist,
    trackCover,
    isPlaying,
    onPlayPause,
    onTrackEnd,
    onPreviousTrack,
    onNextTrack,
}) => {
    const audioRef = useRef(new Audio());
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const [volume, setVolume] = useState(1);
    const savedTimeRef = useRef<number>(0);
    const [isRandomActive, setIsRandomActive] = useState(false);
    const [isRepeatActive, setIsRepeatActive] = useState(false);

    useEffect(() => {
        audioRef.current.volume = volume;
    }, [volume]);

    useEffect(() => {
        if (isPlaying) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }
    }, [isPlaying]);

    useEffect(() => {
        if (track) {
            audioRef.current.src = track;
            audioRef.current.currentTime = savedTimeRef.current;

            const handleCanPlayThrough = () => {
                if (isPlaying) {
                    audioRef.current.play();
                }
            };

            audioRef.current.addEventListener('canplaythrough', handleCanPlayThrough);

            return () => {
                audioRef.current.removeEventListener('canplaythrough', handleCanPlayThrough);
            };
        }
    }, [track, isPlaying]);

    useEffect(() => {
        if (track) {
            audioRef.current.src = track;
            audioRef.current.currentTime = savedTimeRef.current;
            if (isPlaying) {
                audioRef.current.play();
            }
        }

        const handleEnded = () => {
            onTrackEnd();
            onNextTrack();
        };

        const handleTimeUpdate = () => {
            setCurrentTime(audioRef.current.currentTime);
        };

        const handleLoadedMetadata = () => {
            setDuration(audioRef.current.duration);
        };

        const audio = audioRef.current;
        audio.addEventListener("ended", handleEnded);
        audio.addEventListener("timeupdate", handleTimeUpdate);
        audio.addEventListener("loadedmetadata", handleLoadedMetadata);

        return () => {
            audio.removeEventListener("ended", handleEnded);
            audio.removeEventListener("timeupdate", handleTimeUpdate);
            audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
            audio.pause(); 
            audio.currentTime = 0;
        };
    }, [track, onTrackEnd, onNextTrack]);

    useEffect(() => {
        if (!isPlaying) {
            savedTimeRef.current = currentTime;
        }
    }, [isPlaying, currentTime]);

    const toggleRandom = () => {
        setIsRandomActive(prevState => !prevState);
    };
    const toggleRepeat = () => {
        setIsRepeatActive(prevState => !prevState);
    };

    const handlePlayPause = () => {
        if (isPlaying) {
            savedTimeRef.current = audioRef.current.currentTime;
            audioRef.current.pause();
        } else {
            audioRef.current.currentTime = savedTimeRef.current;
            audioRef.current.play();
        }
        onPlayPause();
    };

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTime = parseFloat(e.target.value);
        audioRef.current.currentTime = newTime;
        setCurrentTime(newTime);
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setVolume(parseFloat(e.target.value));
    };

    const handleNextTrack = () => {
        savedTimeRef.current = 0;
        onNextTrack();
    };

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    return (
        <div className="track-player">
            <img src={`${BASE_URL}${trackCover}`} alt="Track Cover" className="track-cover" onError={(e) => e.currentTarget.src = '/images/placeholder.png'} />

            <div className="track-info">
                <div className="track-title">{trackTitle}</div>
                <div className="track-artist">{trackArtist}</div>
            </div>

            <div className="track-controls">
                <div className="track-controls-btn">
                <button 
                className={`control-button repeat-button ${isRepeatActive ? "active" : ""}`} 
                onClick={toggleRepeat}
            >
                <img 
                    src={isRepeatActive ? "/images/repeatIconActive.svg" : "/images/repeat-rounded.svg"} 
                    alt="Repeat" 
                    className="control-icon repeat-icon" 
                />
            </button>
                    <button className="control-button previous-button" onClick={onPreviousTrack}>
                        <img src="/images/skip-previous-rounded.svg" alt="Previous" className="control-icon previous-icon" />
                    </button>

                    <button onClick={handlePlayPause} className="play-pause-button">
                        <img
                            src={isPlaying ? "/images/PauseIcon.svg" : "/images/PlayIcon.svg"}
                            alt={isPlaying ? "Pause" : "Play"}
                            className="play-pause-icon-trackPlayer"
                        />
                    </button>
                    <button className="control-button next-button" onClick={handleNextTrack}>
                        <img src="/images/skip-next-rounded.svg" alt="Next" className="control-icon next-icon" />
                    </button>

                    <button 
            className={`control-button random-button ${isRandomActive ? "active" : ""}`} 
            onClick={toggleRandom}
        >
            <img 
                src={isRandomActive ? "/images/randomIconActive.png" : "/images/random-track.svg"} 
                alt="Shuffle" 
                className="control-icon random-icon" 
            />
        </button>
                </div>

                <div className="progress-container">
                    <div
                        className="progress-bar"
                        style={{ "--progress-width": `${(currentTime / duration) * 100}%` } as React.CSSProperties}
                    >
                        <input
                            type="range"
                            min="0"
                            max={duration}
                            value={currentTime}
                            onChange={handleSeek}
                        />
                    </div>
                    <div className="controls-player-time">
                        <span className="time-track-player">{formatTime(currentTime)}</span>
                        <span className="time-track-player">{formatTime(duration)}</span>
                    </div>
                </div>
            </div>

            <div className="volume-control">
                <img src="/images/microphone.svg" alt="Left Icon 1" className="volume-icon" />
                <img src="/images/listPlayer.svg" alt="Left Icon 2" className="volume-icon" />
                <img src="/images/volume-icon.svg" alt="Volume" className="volume-icon" />
                <div className="progress-bar-volume" style={{ position: 'relative' }}>
                    <div
                        className="progress-bar-volume-fill"
                        style={{ width: `${volume * 100}%` }}
                    />
                    <input
                        className="volume-slider"
                        type="range"
                        min="0"
                        max="1"
                        step="0.05"
                        value={volume}
                        onChange={handleVolumeChange}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            opacity: 0,
                            cursor: 'pointer'
                        }}
                    />
                </div>

                <img src="/images/sizePlayerContainer.svg" alt="Right Icon 1" className="volume-icon" />
                <img src="/images/sizePlayer.svg" alt="Right Icon 2" className="volume-icon" />
            </div>
        </div>
    );
};

export default TrackPlayer;