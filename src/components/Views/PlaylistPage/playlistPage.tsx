import React, { useEffect, useState, useRef } from 'react';  
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './PlaylistPage.css';

interface Track {
    id: string;
    title: string;
    artist: string;
    filePath: string;
    imageUrl?: string;
}

interface Playlist {
    id: string;
    name: string;
    description: string;
    playlistTracks: { $values: Array<{ track: Track }> };
    imageUrl?: string;
}

const PlaylistPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [playlist, setPlaylist] = useState<Playlist | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [durations, setDurations] = useState<{ [key: string]: string }>({});
    const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const BASE_URL = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        const fetchPlaylist = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/api/playlists/${id}`);
                //console.log('Fetched playlist:', response.data);
                setPlaylist(response.data);
            } catch (err) {
                setError('Failed to fetch playlist');
            } finally {
                setLoading(false);
            }
        };

        fetchPlaylist();
    }, [id, BASE_URL]);

    useEffect(() => {
        if (playlist) {
            playlist.playlistTracks.$values.forEach(({ track }) => {
                const audio = new Audio(`${BASE_URL}${track.filePath}`);
                audio.addEventListener('loadedmetadata', () => {
                    const minutes = Math.floor(audio.duration / 60);
                    const seconds = Math.floor(audio.duration % 60).toString().padStart(2, '0');
                    setDurations(prev => ({ ...prev, [track.id]: `${minutes}:${seconds}` }));
                });
            });
        }
    }, [playlist, BASE_URL]);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.addEventListener('ended', handleTrackEnd);
        }
        return () => {
            if (audioRef.current) {
                audioRef.current.removeEventListener('ended', handleTrackEnd);
            }
        };
    }, [currentTrackIndex]);

    const handleTrackEnd = () => {
        if (playlist) {
            const nextTrackIndex = currentTrackIndex + 1;
            if (nextTrackIndex < playlist.playlistTracks.$values.length) {
                setCurrentTrackIndex(nextTrackIndex);
                playTrack(nextTrackIndex);
            } else {
                setIsPlaying(false);
            }
        }
    };

    const playTrack = (index: number) => {
        if (playlist) {
            const track = playlist.playlistTracks.$values[index].track;
            if (audioRef.current) {
                audioRef.current.src = `${BASE_URL}${track.filePath}`;
                audioRef.current.play();
                setIsPlaying(true);
            }
        }
    };

    const handlePlayPause = () => {
        if (isPlaying) {
            audioRef.current?.pause();
            setIsPlaying(false);
        } else {
            playTrack(currentTrackIndex);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!playlist) {
        return <div>No playlist found</div>;
    }

    const tracks = playlist.playlistTracks?.$values.map(pt => pt.track) || [];

    const playlistImageUrl = playlist.imageUrl ? `${BASE_URL}${playlist.imageUrl}` : `${BASE_URL}/images/playlist-default-icon.svg`;
    //console.log(`Playlist image URL: ${playlistImageUrl}`);
    //console.log(`Playlist image: ${playlist.imageUrl}`);

    return (
        <div className="playlist-container">
            <audio ref={audioRef} />
            <div className="playlist-header">
                <img
                    className="playlist-image-page"
                    src={playlistImageUrl}
                    alt="Playlist"
                    onError={(e) => {
                        console.error(`Failed to load image: ${playlistImageUrl}`);
                        e.currentTarget.src = `${BASE_URL}/images/playlist-default-icon.svg`;
                    }}
                />
                <div>
                    <p className='playlist-d'>Плейлист</p>
                    <h1 className="playlist-title">{playlist.name}</h1>
                    <p className="playlist-description">{playlist.description}</p>
                    <div className="playlist-controls">
                        <button onClick={handlePlayPause} className='play-button-playlist2' >
                            <img src={isPlaying ? '/images/PauseIcon.svg' : '/images/PlayIcon.svg'} alt={isPlaying ? 'Pause' : 'Play'} className='play-button-playlist'/>
                        </button>
                    </div>
                </div>
            </div>

            <div className="track-list">
                {tracks.length > 0 ? (
                    tracks.map((track, index) => {
                        const trackImage = track.imageUrl ? `${BASE_URL}${track.imageUrl}` : `${BASE_URL}/images/default-track.png`;
                        console.log(`Track ${index + 1} image URL: ${trackImage}`);
                        return (
                            <div key={track.id} className="track-item">
                                <div className="track-number">{index + 1}</div>
                                <img
                                    className="track-image"
                                    src={trackImage}
                                    alt={track.title}
                                    onError={(e) => e.currentTarget.src = `${BASE_URL}/images/default-track.png`}
                                />
                                <div className="track-info">
                                    <p className="track-title">{track.title}</p>
                                    <p className="track-artist">{track.artist}</p>
                                </div>
                                <p className="track-duration">{durations[track.id] || '00:00'}</p>
                            </div>
                        );
                    })
                ) : (
                    <div>Немає треків</div>
                )}
            </div>
        </div>
    );
};

export default PlaylistPage;