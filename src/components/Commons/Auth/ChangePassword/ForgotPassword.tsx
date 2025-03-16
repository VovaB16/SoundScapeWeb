import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const BASE_URL = import.meta.env.VITE_API_BASE_URL;

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!email) {
            setEmailError(true);
            setErrorMessage('Будь ласка, введіть адресу електронної пошти.');
            return;
        }
        setEmailError(false);
        setErrorMessage('');
        try {
            const response = await fetch(`${BASE_URL}/api/auth/request-password-reset`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ Email: email }),
            });
            if (response.ok) {
                navigate('/forgot-password/EmailSent');
            } else {
                setEmailError(true);
                setErrorMessage('Введіть коректну адресу.');
            }
        } catch (error) {
            console.error('Error:', error);
            setEmailError(true);
            setErrorMessage('An error occurred while sending the password reset link.');
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
                <h6 
                    className="mb-6"
                    style={{ color: '#FFF', fontFamily: 'Noto Sans', fontSize: '48px', fontStyle: 'normal', fontWeight: 700, lineHeight: 'normal' }}
                >
                    Скидання пароля
                </h6>
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
                        className={`w-full p-3 mb-2 text-white ${emailError ? 'border-[#EC0D0D]' : 'border-[#B3B3B3]'}`}
                        style={{ borderRadius: '8px', border: '1px solid', background: '#000' }}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {emailError && (
                        <p className="text-[#EC0D0D] text-[14px] mt-1">
                            {errorMessage}
                        </p>
                    )}
                    <button 
                        type="submit"
                        className="text-white font-bold w-full max-w-md mt-12 bg-[rgba(163,5,166,0.50)] hover:bg-[rgba(163,5,166,0.7)]" 
                        style={{ 
                            borderRadius: '20px', 
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