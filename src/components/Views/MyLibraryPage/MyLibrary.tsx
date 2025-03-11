import React, { useEffect, useState } from 'react';
import './myLibrary.css';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const MyLibrary: React.FC = () => {
    const [playlists, setPlaylists] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [newPlaylist, setNewPlaylist] = useState({ name: '', description: '', ownerId: 1 });
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [validationErrors, setValidationErrors] = useState({ name: false, description: false, image: false });
    const [editingPlaylist, setEditingPlaylist] = useState<any | null>(null);
    const authContext = useAuth();
    const navigate = useNavigate();
    const BASE_URL = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        const fetchPlaylists = async () => {
            try {
                const response = await fetch(`${BASE_URL}/api/playlists/user`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authContext?.token}`
                    }
                });
                const data = await response.json();
                //console.log('Fetched data:', data);
                if (data.$values && Array.isArray(data.$values)) {
                    setPlaylists(data.$values);
                } else {
                    console.error('Unexpected data format:', data);
                }
            } catch (error) {
                console.error('Error fetching playlists:', error);
            }
        };

        fetchPlaylists();
    }, [BASE_URL, authContext]);

    const filteredPlaylists = playlists.filter((playlist) =>
        playlist.name && playlist.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handlePlaylistClick = (id: string) => {
        navigate(`/playlist/${id}`);
    };

    const handleCreatePlaylist = () => {
        setNewPlaylist({ name: '', description: '', ownerId: 1 });
        setImageFile(null);
        setValidationErrors({ name: false, description: false, image: false });
        setEditingPlaylist(null);
        setModalIsOpen(true);
    };

    const handleEdit = (playlist: any) => {
        setNewPlaylist({ name: playlist.name, description: playlist.description, ownerId: playlist.ownerId });
        setImageFile(null);
        setValidationErrors({ name: false, description: false, image: false });
        setEditingPlaylist(playlist);
        setModalIsOpen(true);
    };

    const handleDelete = async (id: string) => {
        try {
            const response = await fetch(`${BASE_URL}/api/playlists/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authContext?.token}`
                }
            });

            if (response.ok) {
                setPlaylists(playlists.filter(playlist => playlist.id !== id));
                console.log(`Deleted playlist ${id}`);
            } else {
                console.error('Failed to delete playlist');
            }
        } catch (error) {
            console.error('Error deleting playlist:', error);
        }
    };

    const handleCreateOrUpdatePlaylist = async () => {
        const errors = {
            name: newPlaylist.name === '',
            description: newPlaylist.description === '',
            image: imageFile === null && !editingPlaylist
        };
        setValidationErrors(errors);
    
        if (errors.name || errors.description || errors.image) {
            return;
        }
    
        try {
            const formData = new FormData();
            formData.append('Name', newPlaylist.name);
            formData.append('Description', newPlaylist.description);
            formData.append('OwnerId', newPlaylist.ownerId.toString());
            if (imageFile) {
                formData.append('Image', imageFile);
            }
    
            const url = editingPlaylist ? `${BASE_URL}/api/playlists/${editingPlaylist.id}` : `${BASE_URL}/api/playlists`;
            const method = editingPlaylist ? 'PUT' : 'POST';
    
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Authorization': `Bearer ${authContext?.token}`
                },
                body: formData
            });
    
            if (response.ok) {
                const updatedPlaylist = await response.json();
                if (editingPlaylist) {
                    setPlaylists(playlists.map(playlist => playlist.id === updatedPlaylist.id ? updatedPlaylist : playlist));
                    console.log('Updated playlist:', updatedPlaylist);
                } else {
                    setPlaylists([...playlists, updatedPlaylist]);
                    console.log('Created playlist:', updatedPlaylist);
                    window.location.reload();
                }
                setModalIsOpen(false);
                setEditingPlaylist(null);
            } else {
                console.error('Failed to create/update playlist', await response.text());
            }
        } catch (error) {
            console.error('Error creating/updating playlist:', error);
        }
    };

    const handleInputChange = (field: string, value: string) => {
        setNewPlaylist({ ...newPlaylist, [field]: value });
        setValidationErrors({ ...validationErrors, [field]: false });
    };

    return (
        <div className="library-container">
            <div className="library-header">
                <input
                    type="text"
                    placeholder="Пошук у розділі “Моя бібліотека”"
                    className="search-bar"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="create-playlist-button" onClick={handleCreatePlaylist}>
                    <img src="/images/createPlaylist.svg" alt="Create Playlist" />
                </button>
            </div>
            <div className="playlists">
                {filteredPlaylists.map((playlist) => (
                    <div key={playlist.id} className="playlist-item-container">
                        <button
                            className="playlist-item"
                            onClick={() => handlePlaylistClick(playlist.id)}
                        >
                            <img
                                src={playlist.imageUrl ? `${BASE_URL}${playlist.imageUrl}` : `${BASE_URL}/images/playlist-default-icon.svg`}
                                alt={playlist.name}
                                className="playlist-image"
                            />
                            <div className="playlist-info">
                                <h2>{playlist.name}</h2>
                                <div className='playlist-info-sub'>
                                    <p>Плейлист 2025</p>
                                </div>
                            </div>
                        </button>
                        <div className="dropdown">
                            <button className="dropdown-button">...</button>
                            <div className="dropdown-content">
                                <button onClick={() => handleEdit(playlist)}>Редагувати</button>
                                <button onClick={() => handleDelete(playlist.id)}>Видалити</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {modalIsOpen && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h2 className='text-information'>{editingPlaylist ? 'Редагувати плейлист' : 'Створити плейлист'}</h2>
                        <form onSubmit={(e) => { e.preventDefault(); handleCreateOrUpdatePlaylist(); }}>
                            <label>
                                Назва:
                                <input
                                    type="text"
                                    value={newPlaylist.name}
                                    onChange={(e) => handleInputChange('name', e.target.value)}
                                    className={`input-field ${validationErrors.name ? 'input-field-error' : ''}`}
                                />
                            </label>
                            <label>
                                Опис:
                                <input
                                    type="text"
                                    value={newPlaylist.description}
                                    onChange={(e) => handleInputChange('description', e.target.value)}
                                    className={`input-field ${validationErrors.description ? 'input-field-error' : ''}`}
                                />
                            </label>
                            <label>
                                Зображення:
                                <input
                                    type="file"
                                    onChange={(e) => {
                                        setImageFile(e.target.files ? e.target.files[0] : null);
                                        setValidationErrors({ ...validationErrors, image: false });
                                    }}
                                    className={`input-field ${validationErrors.image ? 'input-field-error' : ''}`}
                                />
                            </label>
                            <div className="button-row">
                                <button type="submit" className="btnCreatePlaylist">{editingPlaylist ? 'Зберегти' : 'Створити'}</button>
                                <button type="button" onClick={() => setModalIsOpen(false)} className="btnCreatePlaylist">Скасувати</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyLibrary;