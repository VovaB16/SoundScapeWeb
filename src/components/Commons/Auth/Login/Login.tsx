import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleLogin = async () => {
        try {
            const response = await fetch('https://localhost:7179/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ Email: email, Password: password })
            });

            if (!response.ok) {
                throw new Error('Невірний логін або пароль');
            }

            const data = await response.json();
            console.log('Login successful', data);
            navigate('/main');
        } catch (error) {
            setError((error as Error).message);
        }
    };

    return (
        <div className="flex h-screen">
            <div className="w-1/2 flex flex-col justify-between items-center p-8 bg-cover bg-center" style={{ backgroundImage: "linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), url('/images/SUM.png')", borderRadius: '20px' }}>
                <div></div>
                <div className="flex items-center mb-8">
                    <img src="/images/logos/Logo.svg" alt="Logo" className="w-12 h-12" />
                    <span className="text-white ml-4" style={{ fontFamily: 'Noto Sans', fontSize: '32px', fontWeight: 300 }}>SoundScape</span>
                </div>
            </div>

            <div className="w-1/2 flex flex-col justify-center items-center p-8">
                <h2 className="text-3xl font-bold mb-[48px]">Логін</h2>
                <div className="w-full max-w-md">
                    <form className="w-full" onSubmit={(e) => e.preventDefault()}>
                        <div className="mb-4">
                            <label className="text-white font-['Noto_Sans'] text-[16px] font-bold leading-normal mb-2 block" htmlFor="email">
                                Адреса електронної пошти
                            </label>
                            <input
                                className="flex w-[400px] p-[16px_10px] items-center gap-[10px] rounded-[8px] border border-[#B3B3B3] text-[#B3B3B3] font-['Noto_Sans'] text-[16px] font-normal leading-normal focus:outline-none focus:ring-2 focus:ring-[#A305A6] placeholder-[#B3B3B3]"
                                id="email"
                                type="email"
                                placeholder="name@dooomain.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="text-white font-['Noto_Sans'] text-[16px] font-bold leading-normal mb-2 block" htmlFor="password">
                                Пароль
                            </label>
                            <div className="relative">
                                <div className="flex items-center w-[400px] p-[16px_10px] pr-[40px] rounded-[8px] border border-[#B3B3B3] focus-within:ring-2 focus-within:ring-[#A305A6]">
                                    <input
                                        className="flex-1 text-[#B3B3B3] font-['Noto_Sans'] text-[16px] font-normal leading-normal bg-transparent focus:outline-none"
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        onClick={toggleShowPassword}
                                        className="ml-2"
                                    >
                                        <img
                                            src={showPassword ? '/images/hideIcon.svg' : '/images/viewIcon.svg'}
                                            alt={showPassword ? 'Сховати пароль' : 'Показати пароль'}
                                            className="w-6 h-6"
                                        />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {error && <p className="text-red-500 mb-4">{error}</p>}

                        <div className="flex items-center mb-3" style={{ gap: '123px' }}>
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="rememberMe"
                                    className="mr-2"
                                />
                                <label
                                    htmlFor="rememberMe"
                                    className="text-[var(--Gray,#B3B3B3)] font-['Noto_Sans'] text-[14px] font-normal leading-normal"
                                >
                                    Запам'ятати мене
                                </label>
                            </div>
                            <Link
                                to="/forgot-password"
                                className="text-white text-center font-['Noto_Sans'] text-[14px] font-bold leading-normal underline decoration-solid decoration-[4%] underline-offset-auto"
                            >
                                Забули пароль?
                            </Link>
                        </div>

                        <div className="flex items-center justify-between mb-[48px]">
                            <button
                                className="flex w-[400px] p-[16px_10px] justify-center items-center gap-[10px] rounded-[20px] bg-[rgba(163,5,166,0.50)] text-white font-['Noto_Sans'] text-[16px] font-normal leading-normal hover:bg-[rgba(163,5,166,0.7)]"
                                type="button"
                                onClick={handleLogin}
                            >
                                <span className="text-[#FFF] font-['Noto Sans'] text-[16px] font-normal leading-normal">
                                    Далі
                                </span>
                            </button>
                        </div>
                    </form>


                    <div className="flex flex-col items-start gap-8 self-stretch mb-[40px]">
                        <button
                            className="flex p-4 flex-row items-center gap-4 w-[400px] rounded-[20px] border border-[#B3B3B3]"
                            type="button"
                        >
                            <img src="/images/googleLogo.svg" alt="Google" className="w-6 h-6" />
                            <span className="text-[#B3B3B3] font-['Noto_Sans'] text-[16px] font-bold leading-normal">
                                Продовжити через Google
                            </span>
                        </button>

                        <button
                            className="flex p-4 flex-row items-center gap-4 w-[400px] rounded-[20px] border border-[#B3B3B3] hover:text-white"
                            type="button"
                        >
                            <img src="/images/facebookLogo.svg" alt="Facebook" className="w-6 h-6" />
                            <span className="text-[#B3B3B3] font-['Noto_Sans'] text-[16px] font-bold leading-normal">
                                Продовжити через Facebook
                            </span>
                        </button>

                        <button
                            className="flex p-4 flex-row items-center gap-4 w-[400px] rounded-[20px] border border-[#B3B3B3] hover:text-white"
                            type="button"
                        >
                            <img src="/images/AppleLogo.svg" alt="Apple" className="w-6 h-6" />
                            <span className="text-[#B3B3B3] font-['Noto_Sans'] text-[16px] font-bold leading-normal">
                                Продовжити через Apple
                            </span>
                        </button>
                    </div>

                    <div className="">
                        <span className="text-[#B3B3B3] font-['Noto_Sans'] text-[16px] font-normal leading-normal">
                            Немає акаунта?
                        </span>
                        <Link
                            to="/register-step1"
                            className="text-white font-['Noto_Sans'] text-[16px] font-bold leading-normal underline decoration-solid decoration-[0.64px] underline-offset-auto ml-2 hover:text-[#7A057E]"
                        >
                            Зареєструватися в SoundScape
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;