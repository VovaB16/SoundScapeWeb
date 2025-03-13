import { useEffect, useState } from 'react';
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

const Main = () => {
    const navigate = useNavigate();
    const [topSongs, setTopSongs] = useState<Song[]>([]);
    const [durations, setDurations] = useState<{ [key: number]: string }>({});
    const [favorites, setFavorites] = useState<number[]>([]);
    const [activeAddButtons, setActiveAddButtons] = useState<number[]>([]);
    const BASE_URL = import.meta.env.VITE_API_BASE_URL;

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
        

        fetchTopSongs();
    }, []);

    const popularArtists = [
        "Taylor Swift",
        "The Weeknd",
        "Bad Bunny",
        "Drake",
        "Billie Eilish"
    ];

    return (
        <div className="main">
            <div className="container">
                <div className="block_day-recomendation">
                    <h1>Arctic Monkeys</h1>
                    <p>Рекомендація дня: I Wanna Be Yours</p>
                </div>

                <div className="block_popular-artists">
                    <h2>Популярні виконавці</h2>
                    <div className="row">
                        {popularArtists.map(artist => (
                            <div key={artist} className="item">
                                <p>{artist}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="block_top10">
                    <h2>TOP 10</h2>
                    <ul>
                        {topSongs.map(song => (
                            <li key={song.id}>
                                <img src={song.imageUrl} alt={song.title} />
                                <p>{song.title} - {song.artist}</p>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="block_best-world-albums">
                    <h2>Найкращі світові альбоми</h2>
                    <div className="row">
                        {["The Tortured Poets Department - Taylor Swift", "Hit Me Hard and Soft - Billie Eilish", "Short n' Sweet - Sabrina Carpenter", "Mañana Será Bonito - Karol G"].map(album => (
                            <div key={album} className="item">
                                <p>{album}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Main;
