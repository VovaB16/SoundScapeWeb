import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './createUserPage.css';

const CreateUserPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [birthDay, setBirthDay] = useState('');
    const [birthMonth, setBirthMonth] = useState('');
    const [birthYear, setBirthYear] = useState('');
    const [gender, setGender] = useState('');
    const [role, setRole] = useState('');
    const [avatar, setAvatar] = useState<File | null>(null);
    const BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('Username', username);
        formData.append('Email', email);
        formData.append('Password', password);
        formData.append('BirthDay', birthDay);
        formData.append('BirthMonth', birthMonth);
        formData.append('BirthYear', birthYear);
        formData.append('Gender', gender);
        formData.append('Role', role);
        if (avatar) {
            formData.append('Avatar', avatar);
        }

        try {
            const response = await axios.post(`${BASE_URL}/api/user/create`, formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
            });
            console.log('User created successfully:', response.data);
            navigate('/profile'); // Redirect to profile page
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Error creating user:', error.response?.data || error.message);
            } else {
                console.error('Error creating user:', error);
            }
        }
    };

    return (
        <div className="create-user-page-container">
            <form className="create-user-page-form" onSubmit={handleSubmit}>
                <input type="text" placeholder="Ім'я" value={username} onChange={(e) => setUsername(e.target.value)} required autoComplete="off" />
                <input type="email" placeholder="Пошта" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="off" />
                <input type="password" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="off" />
                <input type="number" placeholder="День народження" value={birthDay} onChange={(e) => setBirthDay(e.target.value)} min="1" max="31" required autoComplete="off" />
                <input type="number" placeholder="Місяць народження" value={birthMonth} onChange={(e) => setBirthMonth(e.target.value)} min="1" max="12" required autoComplete="off" />
                <input type="number" placeholder="Рік народження" value={birthYear} onChange={(e) => setBirthYear(e.target.value)} min="1900" max="2025" required autoComplete="off" />
                <select className='select-create-user' value={gender} onChange={(e) => setGender(e.target.value)} required>
                    <option value="" disabled>Виберіть Стать</option>
                    <option value="Male">Чоловік</option>
                    <option value="Female">Жінка</option>
                    <option value="Other">Інше</option>
                </select>
                <select className='select-create-user' value={role} onChange={(e) => setRole(e.target.value)} required>
                    <option value="" disabled>Виберіть Роль</option>
                    <option value="Admin">Адмін</option>
                    <option value="User">Користувач</option>
                </select>
                <input type="file" accept="image/*" onChange={(e) => setAvatar(e.target.files?.[0] || null)} />
                <button type="submit">Створіть користувача</button>
            </form>
        </div>
    );
};

export default CreateUserPage;