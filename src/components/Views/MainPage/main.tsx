import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './main.css';
import axios from 'axios';

interface Song {
    id: number;
    imageUrl: string;
    title: string;
    artist: string;
    views: number;
    duration: string;
    filePath: string;
}

interface Artist {
    id: number;
    name: string;
    imageUrl: string;
}

interface Album {
    id: number;
    title: string;
    year: string;
    image: string;
    artist: string;
}

const Main = () => {
    const navigate = useNavigate();
    const [topSongs, setTopSongs] = useState<Song[]>([]);
    const [durations] = useState<{ [key: number]: string }>({});
    const [favorites, setFavorites] = useState<number[]>([]);
    const [favoritesLoaded, setFavoritesLoaded] = useState(false); // New state variable
    const [, setArtists] = useState<Artist[]>([]);
    const [visibleArtists, setVisibleArtists] = useState<Artist[]>([]);
    const [albums, setAlbums] = useState<Album[]>([]);
    const BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const artistContainerRef = useRef<HTMLDivElement>(null);
    const [, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchTopSongs = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/api/tracks`);
                
                // Указываем тип явно
                const songs: Song[] = Array.isArray(response.data.$values) ? response.data.$values : [];
        
                const updatedSongs = songs.slice(0, 10).map((song: Song) => ({ 
                    ...song,
                    imageUrl: `${BASE_URL}${song.imageUrl}`
                }));
        
                setTopSongs(updatedSongs);
            } catch (error) {
                console.error('Error fetching top songs:', error);
            }
        };
        

        const fetchArtists = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/api/artists`);
                const artists = Array.isArray(response.data.$values) ? response.data.$values : [];
                setArtists(artists);
                setVisibleArtists(artists.slice(0, 5));
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
                        year: album.releaseDate.split('-')[0],
                        image: album.imageUrl,
                        artist: album.artistName,
                    })).slice(0, 5);
                    setAlbums(mappedAlbums);
                } else {
                    console.error('Albums data is not an array:', data);
                }
            } catch (error) {
                console.error('Error fetching albums:', error);
            }
        };

        fetchTopSongs();
        fetchArtists();
        fetchAlbums();
    }, []);

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const token = localStorage.getItem('authToken');
                if (!token) throw new Error("No authentication token found!");

                const response = await axios.get(`${BASE_URL}/api/favorites/list`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                if (response.status !== 200) {
                    throw new Error(`Server returned ${response.status}: ${response.statusText}`);
                }

                setFavorites(Array.isArray(response.data) ? response.data : []);
            } catch (error) {
                console.error('Error fetching favorites:', error);
                setFavorites([]);
            } finally {
                setFavoritesLoaded(true);
                setIsLoading(false);
            }
        };

        fetchFavorites();
    }, []);


    const addToFavorites = async (songId: number) => {
        if (favorites.includes(songId)) return;

        try {
            const token = localStorage.getItem('authToken');
            await axios.post(`${BASE_URL}/api/favorites/add/${songId}`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setFavorites(prev => [...prev, songId]);
        } catch (error) {
            console.error('Error adding to favorites:', error);
        }
    };

    const handleArtistClick = (artistId: number) => {
        navigate(`/artist/${artistId}`);
    };

    const scrollArtists = (direction: 'left' | 'right') => {
        const container = artistContainerRef.current;

        if (container) {
            const scrollAmount = 300;
            const currentScroll = container.scrollLeft;
            const newScroll =
                direction === 'left' ? currentScroll - scrollAmount : currentScroll + scrollAmount;

            container.scrollTo({
                left: newScroll,
                behavior: 'smooth',
            });
        }
    };

    return (
        <div className="main">
            <div className="container">
                <div className="block_day-recomendation">
                    <h1>Arctic Monkeys</h1>
                    <p>Рекомендація дня: I Wanna Be Yours</p>
                </div>
                <div className="block_popular-artists">
                    <h2 className="title">Популярні виконавці</h2>
                    <div className="container">
                        <button className="control_item" onClick={() => scrollArtists('left')}>
                            <img src="/images/home_page_images/arrow_left.png" alt="arrow" />
                        </button>

                        <div className="row" ref={artistContainerRef}>
                            {visibleArtists.map((artist) => (
                                <div key={artist.id} className="item" onClick={() => handleArtistClick(artist.id)}>
                                    <div className="image-container">
                                        <img src={`${BASE_URL}${artist.imageUrl}`} alt={artist.name} />
                                    </div>
                                    <p>{artist.name}</p>
                                </div>
                            ))}
                        </div>

                        <button className="control_item" onClick={() => scrollArtists('right')}>
                            <img src="/images/home_page_images/arrow_right.png" alt="arrow" />
                        </button>
                    </div>
                </div>

                <div className="block_top10">
                    <div className="header-main-page">
                        <h2 className="title">TOP 10</h2>
                    </div>

                    <div className="column">
                        <ul>
                            {favoritesLoaded && topSongs.map((song, index) => (
                                <li key={index} className="item">
                                    <div>
                                        <div className="image-container">
                                            <img src={song.imageUrl} alt={song.title} />
                                        </div>
                                        <div className="text">
                                            <p className="name-song">{song.title}</p>
                                            <p className="name-artist">{song.artist}</p>
                                        </div>
                                    </div>

                                    <div className="controls">
                                        <button 
                                            type="button"
                                            className={`btn ${favorites.includes(song.id) ? 'cursor-not-allowed opacity-50' : ''}`}
                                            id="add"
                                            onClick={() => addToFavorites(song.id)}
                                            disabled={favorites.includes(song.id)}
                                        >
                                            <img
                                                className='add-icon-image-main'
                                                src={favorites.includes(song.id) ? '/images/add-icon-active.svg' : '/images/home_page_images/add_icon.png'}
                                                alt="add"
                                            />
                                        </button>
                                        <p className="time">{durations[song.id] || 'Loading...'}</p>
                                        <button type="button" className="btn" id="more">
                                            <img src="/images/home_page_images/more_icon.png" alt="more" />
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>

                <div className="block_best-world-albums">
                    <h2>Найкращі світові альбоми</h2>
                    <div className="row">

                        {albums.slice(0, 4).map((album, index) => (
                            <Link key={index} to={`/album/${album.id}`} className="item">
                                <div className="image-container">
                                    <img src={`${BASE_URL}${album.image}`} alt={album.title} />
                                </div>
                                <p className="name-album-main">{album.title}</p>
                            </Link>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Main;
