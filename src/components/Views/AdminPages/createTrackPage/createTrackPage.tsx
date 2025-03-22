import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../../context/AuthContext';
import './createTrackPage.css';
import { useNavigate } from 'react-router-dom';

const CreateTrackPage: React.FC = () => {
    const [trackName, setTrackName] = useState('');
    const [trackFile, setTrackFile] = useState<File | null>(null);
    const [trackImage, setTrackImage] = useState<File | null>(null);
    const [isTrackNameValid, setIsTrackNameValid] = useState(true);
    const [isTrackFileValid, setIsTrackFileValid] = useState(true);
    const [isTrackImageValid, setIsTrackImageValid] = useState(true);
    const navigate = useNavigate();
    const BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const authContext = useContext(AuthContext);
    const token = authContext?.token;

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const isFormValid = trackName && trackFile && trackImage;
        setIsTrackNameValid(!!trackName);
        setIsTrackFileValid(!!trackFile);
        setIsTrackImageValid(!!trackImage);

        if (!isFormValid) {
            return;
        }

        const formData = new FormData();
        formData.append('title', trackName);
        if (trackFile) {
            formData.append('trackFile', trackFile);
        }
        if (trackImage) {
            formData.append('imageFile', trackImage);
        }

        try {
            const response = await axios.post(`${BASE_URL}/api/tracks/add-track`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`, 
                },
            });
            console.log('Track created successfully:', response.data);
            navigate("/profile");
        } catch (error) {
            console.error('Error creating track:', error);
            if (axios.isAxiosError(error) && error.response) {
                console.error('Response data:', error.response.data);
                console.error('Response status:', error.response.status);
                console.error('Response headers:', error.response.headers);
            }
        }
    };

    return (
        <div className="create-track-page-container">
            <form className="create-track-page-form" onSubmit={handleSubmit}>
                <div>
                    <label className="create-track-page-label" htmlFor="trackName">Назва трека:</label>
                    <input
                        className={`create-track-page-input ${!isTrackNameValid ? 'invalid' : ''}`}
                        type="text"
                        id="trackName"
                        value={trackName}
                        onChange={(e) => {
                            setTrackName(e.target.value);
                            setIsTrackNameValid(!!e.target.value);
                        }}
                        required
                    />
                </div>
                <div>
                    <label className="create-track-page-label" htmlFor="trackFile">Трек:</label>
                    <input
                        className={`create-track-page-input ${!isTrackFileValid ? 'invalid' : ''}`}
                        type="file"
                        id="trackFile"
                        accept="audio/*"
                        onChange={(e) => {
                            setTrackFile(e.target.files?.[0] || null);
                            setIsTrackFileValid(!!e.target.files?.[0]);
                        }}
                        required
                    />
                </div>
                <div>
                    <label className="create-track-page-label" htmlFor="trackImage">Картинка трека:</label>
                    <input
                        className={`create-track-page-input ${!isTrackImageValid ? 'invalid' : ''}`}
                        type="file"
                        id="trackImage"
                        accept="image/*"
                        onChange={(e) => {
                            setTrackImage(e.target.files?.[0] || null);
                            setIsTrackImageValid(!!e.target.files?.[0]);
                        }}
                        required
                    />
                </div>
                <button className="create-track-page-button" type="submit">Створити трек</button>
            </form>
        </div>
    );
};

export default CreateTrackPage;