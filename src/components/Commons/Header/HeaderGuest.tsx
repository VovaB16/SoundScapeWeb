import { useNavigate } from 'react-router-dom';

const HeaderGuest = () => {
    const navigate = useNavigate();

    return (
        <div className="fixed top-0 left-0 w-full z-50 font-noto-sans bg-black ">
            <header className="flex w-full h-[100px] px-[160px] flex-col justify-center items-center text-white">
                <div className="flex w-full items-center justify-between">

                    <div className="flex items-center gap-4">
                        <img src="/images/logos/Logo.svg" alt="SoundScape Logo" className="h-12 flex-shrink-0" />
                        <span
                            className="text-white font-noto-sans text-[32px]"
                            style={{ fontWeight: 300 }}>
                            SoundScape
                        </span>

                    </div>

                    <div className="flex items-center gap-6">
                        <button onClick={() => navigate('/premium')} className="text-white text-lg font-light">
                            Premium
                        </button>
                        <button onClick={() => navigate('')} className="text-white text-lg font-light">
                            Підтримка
                        </button>

                        <div className="h-12 border-r-2 border-white mx-4"></div>

                        <button onClick={() => navigate('/register-step1')} className="text-white text-lg font-light">
                            Зареєструватися
                        </button>
                        <button
                            onClick={() => navigate('/login')}
                            className="text-white text-lg font-light ">
                            Увійти
                        </button>
                    </div>
                </div>
            </header>
        </div>
    );
};

export default HeaderGuest;