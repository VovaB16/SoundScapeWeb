import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './notification.css';

const NotificationPage: React.FC = () => {
    const location = useLocation();
    const message = location.state?.message;
    const authContext = useAuth();
    const user = authContext.user;
    const [isEmailConfirmed, setIsEmailConfirmed] = useState<boolean>(user?.emailConfirmed ?? false);
    const BASE_URL = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        console.log('User object:', user);
        if (!user?.token) {
            console.log('Токен відсутній, запит не виконується!');
            return;
        }

        const fetchEmailConfirmationStatus = async () => {
            try {
                console.log('Виконуємо запит до API...');

                const response = await fetch(`${BASE_URL}/api/user/me`, {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                });

                if (!response.ok) {
                    throw new Error(`HTTP Error! Status: ${response.status}`);
                }

                const data = await response.json();
                //console.log('API Response:', data);

                setIsEmailConfirmed(data.emailConfirmed ?? false);
            } catch (error) {
                console.error('Помилка отримання статусу підтвердження емейлу:', error);
            }
        };

        fetchEmailConfirmationStatus();
    }, [user?.token]);



    return (
        <div className="flex flex-col notification-main">
            <div className="p-6">
                <h1 className="main-text-notification font-size-[32px]">
                    Що нового
                </h1>
                <h2 className='sub-text-notification'>
                    Нові подкасти, шоу й останні релізи від виконавців, на яких ви підписані
                </h2>
            </div>

            {message && (
                <div className="notification-message">
                    <p>{message}</p>
                </div>
            )}

            <div className="flex justify-center items-start center-text-notification">
                <div className="text-center">
                    {isEmailConfirmed ? (
                        <div className="main-container">
                            <div className='line-email'>
                            <h1 className="main-center-text-notification-email">
                                
                                Ваш емейл підтверджено
                                
                            </h1>
                            </div>
                        </div>
                    ) : (
                        <>
                            <h1 className="main-center-text-notification">
                                Зараз для вас немає оновлень
                            </h1>
                            <h2 className="sub-text-notification">
                                Новини з'являтимуться тут. Підпишіться на улюблених виконавців і подкасти, щоб бачити їх оновлення.
                            </h2>
                        </>

                    )}
                </div>
            </div>
        </div>
    );
};

export default NotificationPage;
