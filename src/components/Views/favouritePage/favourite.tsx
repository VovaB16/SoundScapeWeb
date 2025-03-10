import React, { useEffect, useState, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import './favourite.css';

const Favourite: React.FC = () => {
    const [tracks, setTracks] = useState<any[]>([]);
    const [currentTrack, setCurrentTrack] = useState<string | null>(null);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [trackEnded, setTrackEnded] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const authContext = useAuth();
    const BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const response = await fetch(`${BASE_URL}/api/favorites/list`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authContext?.token}`
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    console.log('Fetched data:', data); 
                    if (data.$values && Array.isArray(data.$values)) {
                        const tracksWithYear = data.$values.map((track: any) => ({
                            ...track,
                            year: new Date(track.uploadDate).getFullYear()
                        }));
                        setTracks(tracksWithYear);
                    } else {
                        console.error('Unexpected data format:', data);
                    }
                } else {
                    console.error('Failed to fetch favorite songs:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching favorite songs:', error);
            }
        };

        if (authContext?.token) {
            fetchFavorites();
        }
    }, [authContext, BASE_URL]);

    const handlePlayPause = (filePath: string) => {
        if (currentTrack === filePath) {
            if (isPlaying) {
                audioRef.current?.pause();
            } else {
                audioRef.current?.play();
            }
            setIsPlaying(!isPlaying);
        } else {
            if (audioRef.current) {
                audioRef.current.src = `${BASE_URL}${filePath}`;
                audioRef.current.play();
            }
            setCurrentTrack(filePath);
            setIsPlaying(true);
            setTrackEnded(false);
        }
    };

    const handleDeleteTrack = async (trackId: string) => {
        try {
            const response = await fetch(`${BASE_URL}/api/favorites/remove/${trackId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authContext?.token}`
                }
            });
            if (response.ok) {
                setTracks(tracks.filter(track => track.id !== trackId));
            } else {
                console.error('Failed to delete track:', response.statusText);
            }
        } catch (error) {
            console.error('Error deleting track:', error);
        }
    };

    useEffect(() => {
        const handleEnded = () => {
            setTrackEnded(true);
            setIsPlaying(false);
        };

        const audio = audioRef.current;
        if (audio) {
            audio.addEventListener('ended', handleEnded);
        }

        return () => {
            if (audio) {
                audio.removeEventListener('ended', handleEnded);
            }
        };
    }, []);

    const filteredTracks = tracks.filter(track =>
        track.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="favourite-container">
            <audio ref={audioRef} />
            <div className="search-input-container">
                <input
                    type="text"
                    placeholder="Пошук у розділі “Улюблені пісні”"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                />
            </div>
            <div>
                {filteredTracks.map((track) => (
                    <div
                        key={track.id}
                        className={`track-item-favourite ${currentTrack === track.filePath && isPlaying ? 'playing' : trackEnded && currentTrack === track.filePath ? 'ended' : ''}`}
                    >
                        <img src={`${BASE_URL}${track.imageUrl}` || '/images/placeholder.png'} alt={track.title} className="track-image-favourite" />
                        <div className="track-details-favourite">
                            <span className="track-title-favourite">{track.title}</span>
                            <div className="track-sub-details">
                                <span className="track-artist">{track.artist}</span>
                                <span className="track-year">• {track.year}</span>
                            </div>
                        </div>
                        <div className="track-actions">
                            <button className="track-button" onClick={() => handlePlayPause(track.filePath)}>
                                <img
                                    src={currentTrack === track.filePath && isPlaying ? '/images/PauseIcon.svg' : trackEnded && currentTrack === track.filePath ? '/images/PlayIcon.svg' : '/images/PlayIcon.svg'}
                                    alt={isPlaying ? 'Pause' : trackEnded ? 'Stopped' : 'Play'}
                                />
                            </button>
                            <button className="delete-button" onClick={() => handleDeleteTrack(track.id)}>
                                <img src={'/images/deleteIcon.svg'} alt={'Delete'} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Favourite;