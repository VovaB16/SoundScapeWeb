import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const NavigationMenu = () => {
  const [activeButtons, setActiveButtons] = useState<string[]>([]);
  const [favoriteIconSrc, setFavoriteIconSrc] = useState<string>('/images/favoritesIcon.svg');
  const [libraryIconSrc, setLibraryIconSrc] = useState<string>('/images/libraryIcon.svg');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/favourite') {
      setFavoriteIconSrc('/images/favoriteIcon2.svg');
    } else {
      setFavoriteIconSrc('/images/favoritesIcon.svg');
    }

    if (location.pathname === '/library') {
      setLibraryIconSrc('/images/libraryIcon2.svg');
    } else {
      setLibraryIconSrc('/images/libraryIcon.svg');
    }
  }, [location.pathname]);

  const handleButtonClick = (buttonName: string) => {
    setActiveButtons(prevState =>
      prevState.includes(buttonName)
        ? prevState.filter(name => name !== buttonName)
        : [...prevState, buttonName]
    );
  };

  const handleFavoritesClick = () => {
    navigate('/favourite');
  };

  const handleLibraryClick = () => {
    navigate('/library');
  };

  return (
    <nav className="font-noto-sans">
      <div className="flex w-full h-[92px] p-[24px_330px] justify-between items-center flex-shrink-0 rounded-b-[20px] bg-[#2D0140]">
        <div className="flex items-center gap-4">
          <button className="flex items-center" onClick={handleLibraryClick}>
            <img
              src={libraryIconSrc}
              alt="My Library"
              className="h-8 w-8"
            />
            <span className="ml-2 text-white">Моя бібліотека</span>
          </button>
          <button className="flex items-center" onClick={handleFavoritesClick}>
            <img
              src={favoriteIconSrc}
              alt="Favorite Songs"
              className="h-8 w-8"
            />
            <span className="ml-2 text-white">Улюблені пісні</span>
          </button>
        </div>
        <div className="flex items-center gap-4">
          <button
            className={`flex items-center w-[80px] p-2 justify-center gap-2 rounded-[20px] ${activeButtons.includes('all') ? 'bg-[#660273]' : 'bg-[rgba(102,2,115,0.25)]'
              } text-white`}
            onClick={() => handleButtonClick('all')}
          >
            Усе
          </button>
          <button
            className={`flex items-center w-[80px] p-2 justify-center gap-2 rounded-[20px] ${location.pathname === '/all-songs' ? 'bg-[#660273]' : 'bg-[rgba(102,2,115,0.25)]'
              } text-white`}
            onClick={() => navigate('/all-songs')}
          >
            Музика
          </button>
          <button
            className={`flex items-center w-[80px] p-2 justify-center gap-2 rounded-[20px] ${activeButtons.includes('podcasts') ? 'bg-[#660273]' : 'bg-[rgba(102,2,115,0.25)]'
              } text-white`}
            onClick={() => handleButtonClick('podcasts')}
          >
            Подкасти
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavigationMenu;