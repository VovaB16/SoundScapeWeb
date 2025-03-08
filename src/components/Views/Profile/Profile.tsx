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
    const logout = authContext ? authContext.logout : () => { };

    const [isEditing, setIsEditing] = useState(false);
    const [userName, setUserName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [avatarUrl, setAvatarUrl] = useState<string>('');
    const [, setAccountCreationDate] = useState<string>('');
    const [playlistsCount] = useState<number>(0);
    const [subscriptionsCount] = useState<number>(0);
    const [birthDay, setBirthDay] = useState('');
    const [birthMonth, setBirthMonth] = useState('');
    const [birthYear, setBirthYear] = useState('');
    const [gender, setGender] = useState('');
    const [newAvatar, setNewAvatar] = useState<File | null>(null);
    const [showForm, setShowForm] = useState(false);
    const [isEmailConfirmed, setIsEmailConfirmed] = useState<boolean>(false);
    const BASE_URL = import.meta.env.VITE_API_BASE_URL;

    const fetchUserData = async () => {
        try {
            const response = await fetch(`${BASE_URL}/api/user/me`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authContext?.token}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                setUserName(data.username);
                setEmail(data.email);
                setAvatarUrl(`${BASE_URL}${data.avatarUrl}?t=${new Date().getTime()}`);
                setAccountCreationDate(data.accountCreationDate);
                setBirthDay(data.birthDay);
                setBirthMonth(data.birthMonth);
                setBirthYear(data.birthYear);
                setGender(data.gender);
                setIsEmailConfirmed(data.emailConfirmed);
            } else {
                console.error('Failed to fetch user data');
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
            setShowForm(true);
        }
    };

    useEffect(() => {
        if (authContext?.token) {
            fetchUserData();
        }
    }, [authContext]);

    const handleSave = async () => {
        const formData = new FormData();
        formData.append("Username", userName);
        formData.append("Email", email);
        formData.append("BirthDay", birthDay);
        formData.append("BirthMonth", birthMonth);
        formData.append("BirthYear", birthYear);
        formData.append("Gender", gender);

        if (newAvatar) {
            formData.append("Avatar", newAvatar);
        }

        try {
            const response = await fetch(`${BASE_URL}/api/user/update`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${authContext?.token}`
                },
                body: formData
            });

            if (response.ok) {
                console.log('User updated successfully');
                window.location.reload();
                await fetchUserData();
                setIsEditing(false);
            } else {
                const errorText = await response.text();
                console.error('Failed to update user data:', errorText);
            }
        } catch (error) {
            console.error('Error updating user data:', error);
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await handleSave();
    };

    const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setNewAvatar(file);
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setNewAvatar(null);
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    return (
        <div className="profile-wrapper">
            <div className="profile-container">
                <div className="profile-header">
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
                    <div className="profile-info">
                        <p className="profile-username">{userName}</p>
                        <div className="profile-details-container">
                            <div className="profile-details-line"></div>
                            <div className="profile-details">
                                <p>2025</p>
                                <p>{playlistsCount} Плейлисти</p>
                                <p>{subscriptionsCount} Підписки</p>
                            </div>
                        </div>
                    </div>
                </div>

                {isEditing ? (
                    <div className={`edit-form-wrapper ${showForm ? 'show' : ''}`}>
                        <form onSubmit={handleSubmit} className="edit-form">
                            <input
                                type="text"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                placeholder="Ім'я користувача"
                                required
                                className="form-input"
                            />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                                required
                                className="form-input"
                            />
                            <input
                                type="number"
                                value={birthDay}
                                onChange={(e) => setBirthDay(e.target.value)}
                                placeholder="День народження"
                                required
                                className="form-input"
                            />
                            <input
                                type="number"
                                value={birthMonth}
                                onChange={(e) => setBirthMonth(e.target.value)}
                                placeholder="Місяць народження"
                                required
                                className="form-input"
                            />
                            <input
                                type="number"
                                value={birthYear}
                                onChange={(e) => setBirthYear(e.target.value)}
                                placeholder="Рік народження"
                                required
                                className="form-input"
                            />
                            <select value={gender} onChange={(e) => setGender(e.target.value)} required className="form-input">
                                <option value="">Оберіть стать</option>
                                <option value="male">Чоловік</option>
                                <option value="female">Жінка</option>
                                <option value="other">Інше</option>
                            </select>
                            <input type="file" onChange={handleAvatarChange} className="form-input" />
                            <div className="button-container">
                                <button type="submit" className="btnEdit btn-save">Зберегти</button>
                                <button type="button" className="btnEdit btn-cancel" onClick={handleCancelEdit}>Скасувати</button>
                            </div>
                        </form>
                    </div>
                ) : (
                    <> </>
                )}

                {!isEmailConfirmed && (
                    <button className="btnEdit">Підтвердити емейл</button>
                )}


                <button className="btn btn-edit" onClick={handleEditClick}>Редагувати профіль</button>
                <button className="btn btn-settings">Налаштування</button>
                <button className="btn btn-support">Підтримка</button>
                <button onClick={handleLogout} className="btn btn-logout">Вийти</button>
            </div>

            <div className="profile-lists-container">
                <div className="list-header">
                    <h3>Підписки</h3>
                    <a href="#" className="show-all">Показати всі</a>
                </div>
                <ul>
                    {[...Array(5)].map((_, index) => (
                        <li key={index}>
                            <div className="playlist-item">
                                <div>
                                    <img src="/images/profilePage/subscribe.svg" alt="Subscription Avatar" className="subscription-avatar" />
                                </div>
                                <p className="subscription-name">Підписка {index + 1}</p>
                            </div>
                        </li>
                    ))}
                </ul>

                <div className="list-header">
                    <h3>Плейлисти</h3>
                    <a href="#" className="show-all">Показати всі</a>
                </div>
                <ul>
                    {[...Array(5)].map((_, index) => (
                        <li key={index}>
                            <div className="playlist-item">
                                <div className="playlist-avatar-container">
                                    <img src="/images/profilePage/playlistAvatar.svg" alt="Playlist Avatar" className="playlist-avatar" />
                                </div>
                                <p className="playlist-name">Плейлист {index + 1}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Profile;