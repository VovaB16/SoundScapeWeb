import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './album.css';
import TrackPlayer from '../TrackPlayer/TrackPlayer';

interface Track {
    id: string;
    title: string;
    artist: string;
    filePath: string;
    imageUrl?: string;
}

interface Album {
    id: string;
    title: string;
    description: string;
    albumTracks: { $values: Array<{ track: Track }> };
    imageUrl?: string;
    artistName: string;
    releaseDate: string;
}

interface Artist {
    id: string;
    name: string;
    imageUrl: string;
}

const AlbumPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [album, setAlbum] = useState<Album | null>(null);
    const [artists, setArtists] = useState<Artist[]>([]);
    const [albums, setAlbums] = useState<Album[]>([]);
    const [tracks, setTracks] = useState<Track[]>([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [durations, setDurations] = useState<{ [key: string]: string }>({});
    const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
    const [, setTrackEnded] = useState<boolean>(false);
    const BASE_URL = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        const fetchAlbum = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/api/albums/${id}`);
                setAlbum(response.data);
            } catch (err) {
                setError('Failed to fetch album');
            } finally {
                setLoading(false);
            }
        };

        fetchAlbum();
    }, [id, BASE_URL]);

    useEffect(() => {
        const fetchTracks = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/api/tracks`);
                const tracks = Array.isArray(response.data.$values) ? response.data.$values.slice(0, 15) : [];
                setTracks(tracks);
            } catch (error) {
                console.error('Error fetching tracks:', error);
            }
        };

        fetchTracks();
    }, [BASE_URL]);

    useEffect(() => {
        if (tracks.length > 0) {
            tracks.forEach((track) => {
                const audio = new Audio(`${BASE_URL}${track.filePath}`);
                audio.addEventListener('loadedmetadata', () => {
                    const minutes = Math.floor(audio.duration / 60);
                    const seconds = Math.floor(audio.duration % 60).toString().padStart(2, '0');
                    setDurations(prev => ({ ...prev, [track.id]: `${minutes}:${seconds}` }));
                });
            });
        }
    }, [tracks, BASE_URL]);

    useEffect(() => {
        const fetchArtists = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/api/artists`);
                const artists = Array.isArray(response.data.$values) ? response.data.$values : [];
                setArtists(artists.slice(0, 5));
            } catch (error) {
                console.error('Error fetching artists:', error);
            }
        };

        const fetchAlbums = async () => {
            try {
                const response = await fetch(`${BASE_URL}/api/albums/artist/25`);
                const data = await response.json();
                const albumsArray = data.$values || [];
                if (Array.isArray(albumsArray)) {
                    const mappedAlbums: Album[] = albumsArray.map((album: any) => ({
                        id: album.id,
                        title: album.title,
                        description: album.description,
                        albumTracks: album.albumTracks,
                        imageUrl: album.imageUrl,
                        artistName: album.artistName,
                        releaseDate: album.releaseDate,
                    })).slice(0, 5);
                    setAlbums(mappedAlbums);
                } else {
                    console.error('Albums data is not an array:', data);
                }
            } catch (error) {
                console.error('Error fetching albums:', error);
            }
        };

        fetchArtists();
        fetchAlbums();
    }, [BASE_URL]);

    const playTrack = (index: number) => {
        if (tracks.length > 0) {
            const track = tracks[index];
            setCurrentTrack(track);
            setIsPlaying(true);
        }
    };

    const handleArtistClick = (id: string) => {
        navigate(`/artist/${id}`);
    };

    const handleAlbumClick = (id: string) => {
        
        const token = localStorage.getItem('authToken'); 

        if (!token) {
            
            alert('Please login to view this album');
            return;
        }

        navigate(`/album/${id}`);
    };

    const handlePlayPause = () => {
        if (isPlaying) {
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

    if (!album) {
        return <div>No album found</div>;
    }

    const albumImageUrl = album.imageUrl ? `${BASE_URL}${album.imageUrl}` : `${BASE_URL}/images/album-default-icon.svg`;


    return (
        <div className='album-page'>
            <div className="album-container-album">
                <div className="album-header">
                    <img
                        className="album-image-page"
                        src={albumImageUrl}
                        alt="Album"
                        onError={(e) => {
                            console.error(`Failed to load image: ${albumImageUrl}`);
                            e.currentTarget.src = `${BASE_URL}/images/album-default-icon.svg`;
                        }}
                    />
                    <div>
                        <p className='album-d'>Альбом</p>
                        <h1 className="album-title-album">{album.title}</h1>
                        <p className="album-description">{album.description}</p>
                        <p className="album-artist">{album.artistName}</p>

                        <div className="album-controls">
                            <button onClick={handlePlayPause} className='play-button-album2' >
                                <img src={isPlaying ? '/images/PauseIcon.svg' : '/images/PlayIcon.svg'} alt={isPlaying ? 'Pause' : 'Play'} className='play-button-album' />
                            </button>
                            <div className="dropdown-album">
                                <button className="dropdown-button">...</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="album-content">
    <div className="track-list">
        {tracks.length > 0 ? (
            tracks.map((track, index) => {
                return (
                    <div key={track.id} className="track-item-album">
                        <div className="track-number">{index + 1}</div>
                        
                        <div className="track-info">
                            <p className="track-title-album">{track.title}</p>
                            <p className="track-artist">{track.artist}</p>
                        </div>

                        <div className="track-duration-album">{durations[track.id]}</div>

                        <button type="button" className="album-btn" id="more">
                            <img src="/images/AddCircle.svg" alt="more" className="addalbum" />
                        </button>
                    </div>
                );
            })
        ) : (
            <div>Немає треків</div>
        )}
    </div>
</div>


                <div className="recommended-artists">
                    <h5 className='album-recommendation-text-album'>Рекомендуємо</h5>
                    <div className="artist-list">
                        {artists.map((artist) => (
                            <div
                                key={artist.id}
                                className="artist-item"
                                onClick={() => handleArtistClick(artist.id)}
                                style={{ cursor: 'pointer' }}
                            >
                                <img
                                    src={`${BASE_URL}${artist.imageUrl}`}
                                    alt={artist.name}
                                    className="artist-image"
                                />
                                <p className="artist-name">{artist.name}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {currentTrack && (
                    <TrackPlayer
                        track={`${BASE_URL}${currentTrack.filePath}`}
                        trackTitle={currentTrack.title}
                        trackArtist={currentTrack.artist}
                        trackCover={currentTrack.imageUrl || '/images/placeholder.png'}
                        isPlaying={isPlaying}
                        onPlayPause={() => setIsPlaying(!isPlaying)}
                        onTrackEnd={() => setTrackEnded(true)}
                        onPreviousTrack={() => {
                            if (currentTrackIndex > 0) {
                                setCurrentTrackIndex(currentTrackIndex - 1);
                                playTrack(currentTrackIndex - 1);
                            }
                        }}
                        onNextTrack={() => {
                            if (currentTrackIndex < tracks.length - 1) {
                                setCurrentTrackIndex(currentTrackIndex + 1);
                                playTrack(currentTrackIndex + 1);
                            } else {
                                setCurrentTrackIndex(0);
                                playTrack(0);
                            }
                        }}
                    />
                )}
            </div>
            <div className="recommended-albums">
            <h5 className="album-recommendation-text-album">Альбоми</h5>
            <div className="album-list">
                {albums.map((album, index) => (
                    <div key={index} className="album-item" onClick={() => handleAlbumClick(album.id)}>
                        <img src={`${BASE_URL}${album.imageUrl}`} alt={album.title} className="album-image" />
                        <p className="album-title2">{album.title}</p>
                        <p className="album-year">2025 • Альбом</p>
                    </div>
                ))}
            </div>
        </div>
        </div>
    );
};

export default AlbumPage;