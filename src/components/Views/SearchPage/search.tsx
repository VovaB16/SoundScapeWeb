import React, { useEffect, useState } from "react";
import "./search.css";

interface SearchResult {
  id: number;
  type: string;
  name: string;
  artist: string;
  year: number;
  songsCount: number;
  image: string;
  audio: string;
}

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const SearchPage: React.FC = () => {
  const [searchHistory, setSearchHistory] = useState<SearchResult[]>([]);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  
  useEffect(() => {
    const storedHistory = localStorage.getItem("searchHistory");
    if (storedHistory) {
      setSearchHistory(JSON.parse(storedHistory));
    }
  }, []);

  const handleSearch = async (query: string) => {
   if (!query.trim()) return;

   try {
       const response = await fetch(`${BASE_URL}/api/search?q=${query}`);
       if (!response.ok) throw new Error("error on searhing tracks");

       const data = await response.json();
       setSearchResults(data.results || []);

       // Обновляем историю поиска
       const updatedHistory = [data.results[0], ...searchHistory].slice(0, 5);
       setSearchHistory(updatedHistory);
       localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
   } catch (error) {
       console.error("Search error:", error);
   }
};

  return (
    <div className="container">
      <div className="search-results">
        <p className="title">Результати пошуку</p>
        <div className="items">
          {searchResults.map((result) => (
            <div className="item" key={result.id}>
              <div className="image">
                <img src={result.image} alt={result.name} />
              </div>
              <div className="content">
                <p className="type">{result.type}</p>
                <p className="name">{result.name}</p>
                <div className="info">
                  <div className="info-block">
                    <img src="dot.svg" alt="" />
                    <p>{result.artist}</p>
                  </div>
                  <div className="info-block">
                    <img src="dot.svg" alt="" />
                    <p>{result.year}</p>
                  </div>
                  <div className="info-block">
                    <img src="dot.svg" alt="" />
                    <p>{result.songsCount} пісень</p>
                  </div>
                </div>
              </div>
              <div className="controls">
                <audio id="audio" src={result.audio}></audio>
                <div className="controls">
                  <button id="playPause">
                    <img src="player.svg" alt="Play" />
                  </button>
                  <button id="addFavourite">
                    <img src="add.svg" alt="add" />
                  </button>
                  <button className="moreInfo" id="moreInfo">
                    <img src="dot.svg" alt="more" />
                    <img src="dot.svg" alt="" />
                    <img src="dot.svg" alt="" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="search-history">
        <p className="title">Останні пошукові запити</p>
        <div className="items">
          {searchHistory.map((historyItem) => (
            <div className="item" key={historyItem.id}>
              <div className="image">
                <img src={historyItem.image} alt={historyItem.name} />
              </div>
              <div className="content">
                <p className="type">{historyItem.type}</p>
                <p className="name">{historyItem.name}</p>
                <div className="info">
                  <div className="info-block">
                    <img src="dot.svg" alt="" />
                    <p>{historyItem.artist}</p>
                  </div>
                  <div className="info-block">
                    <img src="dot.svg" alt="" />
                    <p>{historyItem.year}</p>
                  </div>
                  <div className="info-block">
                    <img src="dot.svg" alt="" />
                    <p>{historyItem.songsCount} пісень</p>
                  </div>
                </div>
              </div>
              <div className="controls">
                <audio id="audio" src={historyItem.audio}></audio>
                <div className="controls">
                  <button id="playPause">
                    <img src="player.svg" alt="Play" />
                  </button>
                  <button id="addFavourite">
                    <img src="add.svg" alt="add" />
                  </button>
                  <button className="moreInfo" id="moreInfo">
                    <img src="dot.svg" alt="more" />
                    <img src="dot.svg" alt="" />
                    <img src="dot.svg" alt="" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
