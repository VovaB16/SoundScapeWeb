import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Commons/Auth/AuthContext';
import { useState, useEffect } from 'react';
import './Profile.css';

interface ProfileProps {
    setLoggedIn: (loggedIn: boolean) => void;
}

const Profile: React.FC<ProfileProps> = ({ }) => {
    const navigate = useNavigate();
    const authContext = useAuth();
    const logout = authContext ? authContext.logout : () => {};
    const [userName, setUserName] = useState<string>('');
    const [avatarUrl, setAvatarUrl] = useState<string>('');
    const BASE_URL = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`${BASE_URL}/api/user/me`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authContext?.token}`
                    }
                });
                console.log('Response status:', response.status); 
                if (response.ok) {
                    const data = await response.json();
                    console.log('User data:', data);
                    setUserName(data.username);
                    setAvatarUrl(data.avatarUrl); 
                    console.log('Avatar URL:', data.avatarUrl);
                } else {
                    console.error('Failed to fetch user data:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        if (authContext) {
            console.log('AuthContext:', authContext);
            if (authContext.token) {
                console.log('Token:', authContext.token);
                fetchUserData();
            } else {
                console.error('Token is null or undefined');
            }
        } else {
            console.error('AuthContext is null or undefined');
        }
    }, [authContext]);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="profile-container">
            {avatarUrl && (
                <img
                    src={avatarUrl}
                    alt="User Avatar"
                    className="profile-avatar"
                    onError={(e) => {
                        e.currentTarget.src = `${BASE_URL}/images/default-avatar.png`; 
                    }}
                />
            )}
            <p className="profile-username">Welcome, {userName}</p>
            <button onClick={handleLogout} className="text-white font-bold w-full max-w-md mt-4" style={{ borderRadius: '20px', background: 'rgba(163, 5, 166, 0.50)', padding: '16px 10px' }}>
                Вийти з аккаунта
            </button>
        </div>
    );
};

export default Profile;