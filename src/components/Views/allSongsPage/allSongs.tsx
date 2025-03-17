import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import TrackPlayer from "../TrackPlayer/TrackPlayer";
import "./allSongs.css";

const AllSongs: React.FC = () => {
  const [tracks, setTracks] = useState<any[]>([]);
  const [filteredTracks, setFilteredTracks] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [currentTrack, setCurrentTrack] = useState<string | null>(null);
  const [currentTrackUrl, setCurrentTrackUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeAddButtons, setActiveAddButtons] = useState<string[]>([]);
  const authContext = useAuth();
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const fetchTracks = async (page: number) => {
    try {
      const response = await fetch(`${BASE_URL}/api/tracks?page=${page}&limit=50`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authContext?.token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        const tracksData = data.$values || [];
        if (tracksData.length < 50) {
          setHasMore(false);
        }
        setTracks((prevTracks) => {
          const uniqueTracks = new Map();
          [...prevTracks, ...tracksData].forEach((track) => {
            uniqueTracks.set(track.id, track);
          });
          return Array.from(uniqueTracks.values());
        });
      } else {
        console.error("Failed to fetch tracks:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching tracks:", error);
    }
  };

  useEffect(() => {
    fetchTracks(page);
  }, [page]);

  useEffect(() => {
    setFilteredTracks(
      tracks.filter((track) =>
        track.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, tracks]);

  const loadMoreTracks = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePlayPause = (trackId: string, filePath: string) => {
    if (currentTrack === trackId) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentTrack(trackId);
      setCurrentTrackUrl(`${BASE_URL}${filePath}`);
      setIsPlaying(true);
    }
  };

  const handleTrackEnd = () => {
    setIsPlaying(false);
    handleNextTrack();
  };

  const handlePreviousTrack = () => {
    const currentIndex = filteredTracks.findIndex(track => track.id === currentTrack);
    if (currentIndex > 0) {
      const previousTrack = filteredTracks[currentIndex - 1];
      setCurrentTrack(previousTrack.id);
      setCurrentTrackUrl(`${BASE_URL}${previousTrack.filePath}`);
      setIsPlaying(true);
    } else {
      setCurrentTrackUrl(`${BASE_URL}${filteredTracks[currentIndex].filePath}`);
      setIsPlaying(true);
    }
  };

  const handleNextTrack = () => {
    const currentIndex = filteredTracks.findIndex(track => track.id === currentTrack);
    if (currentIndex < filteredTracks.length - 1) {
      const nextTrack = filteredTracks[currentIndex + 1];
      setCurrentTrack(nextTrack.id);
      setCurrentTrackUrl(`${BASE_URL}${nextTrack.filePath}`);
      setIsPlaying(true);
    } else {
      // Loop back to the first track
      setCurrentTrack(filteredTracks[0].id);
      setCurrentTrackUrl(`${BASE_URL}${filteredTracks[0].filePath}`);
      setIsPlaying(true);
    }
  };

  const handleAddToFavorites = async (trackId: string) => {
    if (favorites.includes(trackId)) {
        alert('This track is already in your favorites.');
        return;
    }

    try {
        const response = await fetch(`${BASE_URL}/api/favorites/add/${trackId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authContext?.token}`
            }
        });
        if (response.ok) {
            setFavorites(prev => [...prev, trackId]);
            setActiveAddButtons(prevState => [...prevState, trackId]);
            setTimeout(() => {
                setActiveAddButtons(prevState => prevState.filter(id => id !== trackId));
            }, 200);
        } else {
            console.error('Failed to add to favorites:', response.statusText);
        }
    } catch (error) {
        console.error('Error adding to favorites:', error);
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
            <img
              src={`${BASE_URL}${track.imageUrl}` || "/images/placeholder.png"}
              alt={track.title}
              className="track-image-songs"
            />
            <div className="track-details-songs">
              <span className="track-title-songs">{track.title}</span>
              <span className="track-artist-songs">{track.artist}</span>
            </div>

            <button
              onClick={() => handlePlayPause(track.id, track.filePath)}
              className="play-pause-button-songs"
            >
              <img
                src={
                  currentTrack === track.id && isPlaying
                    ? "/images/PauseIcon.svg"
                    : "/images/PlayIcon.svg"
                }
                alt={isPlaying ? "Pause" : "Play"}
              />
            </button>
            <button
                            onClick={() => handleAddToFavorites(track.id)}
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

      {currentTrackUrl && (
        <TrackPlayer
          track={currentTrackUrl}
          isPlaying={isPlaying}
          onPlayPause={() => setIsPlaying(!isPlaying)}
          onTrackEnd={handleTrackEnd}
          trackTitle={filteredTracks.find(track => track.id === currentTrack)?.title || ""}
          trackArtist={filteredTracks.find(track => track.id === currentTrack)?.artist || ""}
          trackCover={filteredTracks.find(track => track.id === currentTrack)?.imageUrl || "/images/placeholder.png"}
          onPreviousTrack={handlePreviousTrack}
          onNextTrack={handleNextTrack}
        />
      )}
    </div>
  );
};

export default AllSongs;