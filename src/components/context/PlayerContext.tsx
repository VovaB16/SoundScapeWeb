import React, { createContext, useContext, useEffect, useState } from 'react';

interface Track {
  filePath: string;
  title: string;
  artist: string;
  imageUrl?: string;
}

interface PlayerContextProps {
  currentTrack: Track | null;
  isPlaying: boolean;
  tracks: Track[];
  setCurrentTrack: (track: Track | null) => void;
  setCurrentTrackUrl: (url: string) => void;
  setIsPlaying: (isPlaying: boolean) => void;
  setTracks: (tracks: Track[]) => void;
  currentTrackIndex: number;
  setCurrentTrackIndex: (index: number) => void;
  stopTrack: () => void;
}

const PlayerContext = createContext<PlayerContextProps | undefined>(undefined);

export const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(-1);

  const setCurrentTrackUrl = (url: string) => {
    if (currentTrack) {
      setCurrentTrack({ ...currentTrack, filePath: url });
    }
  };

  const stopTrack = () => {
    setCurrentTrack(null);
    setIsPlaying(false);
  };

  useEffect(() => {
    if (currentTrack) {
      const index = tracks.findIndex(track => track.filePath === currentTrack.filePath);
      if (index !== -1) {
        setCurrentTrackIndex(index);
      }
    }
  }, [currentTrack, tracks]);

  return (
    <PlayerContext.Provider
      value={{
        currentTrack,
        isPlaying,
        tracks,
        setCurrentTrack,
        setCurrentTrackUrl,
        setIsPlaying,
        setTracks,
        currentTrackIndex,
        setCurrentTrackIndex,
        stopTrack,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (context === undefined) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
};