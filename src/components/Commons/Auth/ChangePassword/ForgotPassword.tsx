import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await fetch('https://localhost:7179/api/auth/request-password-reset', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ Email: email }),
            });
            if (response.ok) {
                navigate('/forgot-password/EmailSent');
            } else {
                alert('Failed to send password reset link.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while sending the password reset link.');
        }
    };

    return (
        <div className="flex h-screen">
            <div 
                className="w-1/2 flex flex-col justify-between items-center p-8 bg-cover bg-center" 
                style={{ backgroundImage: "linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), url('/images/SUM.png')", borderRadius: '20px' }}
            >
                <div></div>
                <div className="flex items-center mb-8">
                    <img src="/images/logos/Logo.svg" alt="Logo" className="w-12 h-12" />
                    <span className="text-white ml-4" style={{ fontFamily: 'Noto Sans', fontSize: '32px', fontWeight: 300 }}>SoundScape</span>
                </div>
            </div>

            <div className="w-1/2 flex flex-col justify-center items-center p-8 text-left">
                <h2 
                    className="mb-6"
                    style={{ color: '#FFF', fontFamily: 'Noto Sans', fontSize: '48px', fontStyle: 'normal', fontWeight: 700, lineHeight: 'normal' }}
                >
                    Скидання пароля
                </h2>
                <p 
                    className="mb-6 max-w-md mt-12"
                    style={{ color: '#B3B3B3', fontFamily: 'Noto Sans', fontSize: '16px', fontStyle: 'normal', fontWeight: 400, lineHeight: 'normal' }}
                >
                    Введіть адресу електронної пошти, пов'язаної з вашим акаунтом SoundScape, і ми надішлемо вам електронний лист з посиланням на скидання пароля.
                </p>
                <form onSubmit={handleSubmit} className="w-full max-w-md">
                    <label 
                        className="text-white font-['Noto_Sans'] text-[16px] font-bold leading-normal mb-2 block text-left mt-12" 
                        htmlFor="email"
                    > 
                        Адреса електронної пошти
                    </label>
                    <input 
                        id="email"
                        type="email" 
                        placeholder="Адреса електронної пошти" 
                        className="w-full p-3 mb-6 text-white" 
                        style={{ borderRadius: '8px', border: '1px solid #B3B3B3', background: '#000' }}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button 
                        type="submit"
                        className="text-white font-bold w-full max-w-md mt-12" 
                        style={{ 
                            borderRadius: '20px', 
                            background: 'rgba(163, 5, 166, 0.50)', 
                            display: 'flex', 
                            padding: '16px 10px', 
                            justifyContent: 'center', 
                            alignItems: 'center', 
                            gap: '10px'
                        }}
                    >
                        Надіслати посилання
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;