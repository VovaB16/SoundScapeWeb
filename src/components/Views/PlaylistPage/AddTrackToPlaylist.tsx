import React, { useEffect, useState, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useParams } from 'react-router-dom';


const AddTrackToPlaylist: React.FC = () => {
    const { id: playlistId } = useParams<{ id: string }>();
    const [tracks, setTracks] = useState<any[]>([]);
    const [filteredTracks, setFilteredTracks] = useState<any[]>([]);
    const [page, setPage] = useState<number>(1);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [currentTrack, setCurrentTrack] = useState<string | null>(null);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [activeAddButtons, setActiveAddButtons] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const authContext = useAuth();
    const BASE_URL = import.meta.env.VITE_API_BASE_URL;

    const fetchTracks = async (page: number) => {
        try {
            const response = await fetch(`${BASE_URL}/api/tracks?page=${page}&limit=50`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authContext?.token}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                const tracksData = data.$values || [];
                if (tracksData.length < 50) {
                    setHasMore(false);
                }
                setTracks(prevTracks => {
                    const uniqueTracks = new Map();
                    [...prevTracks, ...tracksData].forEach(track => {
                        uniqueTracks.set(track.id, track);
                    });
                    return Array.from(uniqueTracks.values());
                });
            } else {
                console.error('Failed to fetch tracks:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching tracks:', error);
        }
    };

    useEffect(() => {
        fetchTracks(page);
    }, [page]);

    useEffect(() => {
        setFilteredTracks(
            tracks.filter(track =>
                track.title.toLowerCase().includes(searchQuery.toLowerCase())
            )
        );
    }, [searchQuery, tracks]);

    const loadMoreTracks = () => {
        setPage(prevPage => prevPage + 1);
    };

    const handlePlayPause = (trackId: string, filePath: string) => {
        if (currentTrack === trackId) {
            if (isPlaying) {
                audioRef.current?.pause();
            } else {
                audioRef.current?.play();
            }
            setIsPlaying(!isPlaying);
        } else {
            setCurrentTrack(trackId);
            setIsPlaying(true);
            if (audioRef.current) {
                audioRef.current.src = `${BASE_URL}${filePath}`;
                audioRef.current.play();
            }
        }
    };

    const handleAddToPlaylist = async (trackId: string) => {
        try {
            const response = await fetch(`${BASE_URL}/api/playlists/${playlistId}/tracks/${trackId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authContext?.token}`
                }
            });
            if (response.ok) {
                setActiveAddButtons(prevState => [...prevState, trackId]);
                setTimeout(() => {
                    setActiveAddButtons(prevState => prevState.filter(id => id !== trackId));
                }, 200);
            } else {
                alert("Track is already in the playlist");
                //console.error('Failed to add track to playlist:', response.statusText);
            }
        } catch (error) {
            //console.error('Error adding track to playlist:', error);
        }
    };

    return (
        <div className="all-songs-container">
            <input
                type="text"
                placeholder="Пошук трека"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
            />
            <ul className="tracks-list-songs">
                {filteredTracks.map((track) => (
                    <li key={track.id} className="track-item-songs">
                        <img src={`${BASE_URL}${track.imageUrl}` || '/images/placeholder.png'} alt={track.title} className="track-image-songs" />
                        <div className="track-details-songs">
                            <span className="track-title-songs">{track.title}</span>
                            <span className="track-artist-songs">{track.artist}</span>
                        </div>

                        <button
                            onClick={() => handlePlayPause(track.id, track.filePath)}
                            className="play-pause-button-songs"
                        >
                            <img
                                src={currentTrack === track.id && isPlaying ? '/images/PauseIcon.svg' : '/images/PlayIcon.svg'}
                                alt={isPlaying ? 'Pause' : 'Play'}
                            />
                        </button>

                        <button
                            onClick={() => handleAddToPlaylist(track.id)}
                            className="add-to-favorites-button-songs"
                        >
                            <img
                                className="add-icon-image"
                                src={activeAddButtons.includes(track.id) ? '/images/add-icon-active.svg' : '/images/home_page_images/add_icon.png'}
                                alt="add"
                            />
                        </button>

                    </li>
                ))}
            </ul>
            {hasMore && (
                <button onClick={loadMoreTracks} className="load-more-button">
                    Load More
                </button>
            )}
            <audio ref={audioRef} />
        </div>
    );
};

export default AddTrackToPlaylist;