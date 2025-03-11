import { useNavigate } from 'react-router-dom';

const SuccessfulPasswordChange = () => {
    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate('/main');
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

            <div className="w-1/2 flex flex-col justify-center items-center p-8 text-left">
                <div>
                    <h2 className="mb-6" style={{ color: '#FFF', fontFamily: 'Noto Sans', fontSize: '48px', fontStyle: 'normal', fontWeight: 700, lineHeight: 'normal' }}>
                        Готово
                    </h2>
                        <p className="mb-6 max-w-md" style={{ color: '#B3B3B3', fontFamily: 'Noto Sans', fontSize: '16px', fontStyle: 'normal', fontWeight: 400, lineHeight: 'normal' }}>
                            Ваш пароль успішно оновлено, ви ввійшли в акаунт.
                        </p>
                </div>
                <button
                    onClick={handleButtonClick}
                    className="text-white font-bold w-full max-w-md mt-100 bg-[rgba(163,5,166,0.50)] hover:bg-[rgba(163,5,166,0.7)]"
                    style={{ 
                        borderRadius: '20px', 
                        display: 'flex', 
                        padding: '16px 10px', 
                        justifyContent: 'center', 
                        alignItems: 'center', 
                        gap: '10px',
                        
                    }}
                >
                    Слухайте музику
                </button>
            </div>
        </div>
    );
};

export default SuccessfulPasswordChange;