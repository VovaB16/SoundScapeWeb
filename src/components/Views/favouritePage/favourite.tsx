import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import TrackPlayer from '../TrackPlayer/TrackPlayer';
import './favourite.css';

const Favourite: React.FC = () => {
    const [tracks, setTracks] = useState<any[]>([]);
    const [currentTrack, setCurrentTrack] = useState<string | null>(null);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [trackEnded, setTrackEnded] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const authContext = useAuth();
    const BASE_URL = import.meta.env.VITE_API_BASE_URL;

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
            setIsPlaying(!isPlaying);
        } else {
            setCurrentTrack(filePath);
            setIsPlaying(true);
            setTrackEnded(false);
        }
    };

    const handlePreviousTrack = () => {
        const currentIndex = filteredTracks.findIndex(track => track.filePath === currentTrack);
        if (currentIndex > 0) {
            const previousTrack = filteredTracks[currentIndex - 1];
            setCurrentTrack(previousTrack.filePath);
            setIsPlaying(true);
        }
    };

    const handleNextTrack = () => {
        const currentIndex = filteredTracks.findIndex(track => track.filePath === currentTrack);
        if (currentIndex < filteredTracks.length - 1) {
            const nextTrack = filteredTracks[currentIndex + 1];
            setCurrentTrack(nextTrack.filePath);
            setIsPlaying(true);
        }
    };
    

    const filteredTracks = tracks.filter(track =>
        track.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleDelete = async (trackId: string) => {
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

    return (
        <div className="favourite-container">
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
                {filteredTracks.length === 0 ? (
                    <div className="no-tracks-message1">
                        Ви ще не додали улюблені треки
                    </div>
                ) : (
                    filteredTracks.map((track) => (
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
                                <div className="dropdown">
                                <button className="dropdown-button">...</button>
                                <div className="dropdown-content">
                                    <button onClick={() => handleDelete(track.id)}>Видалити</button>
                                </div>
                            </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
            {currentTrack && (
                <TrackPlayer
                    track={`${BASE_URL}${currentTrack}`}
                    trackTitle={tracks.find(track => track.filePath === currentTrack)?.title || ''}
                    trackArtist={tracks.find(track => track.filePath === currentTrack)?.artist || ''}
                    trackCover={tracks.find(track => track.filePath === currentTrack)?.imageUrl || '/images/placeholder.png'}
                    isPlaying={isPlaying}
                    onPlayPause={() => setIsPlaying(!isPlaying)}
                    onTrackEnd={() => setTrackEnded(true)}
                    onPreviousTrack={handlePreviousTrack}
                    onNextTrack={handleNextTrack}
                />
            )}
        </div>
    );
};

export default Favourite;