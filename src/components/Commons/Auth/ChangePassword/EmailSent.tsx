import { useNavigate } from 'react-router-dom';

const EmailSent = () => {
    const navigate = useNavigate();

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
                <h2 className="mb-6 text-left" style={{ color: '#FFF', fontFamily: 'Noto Sans', fontSize: '48px', fontStyle: 'normal', fontWeight: 700, lineHeight: 'normal' }}>
                    Перевірте вхідні повідомлення
                </h2>
                <p className="mb-6 max-w-md" style={{ color: '#B3B3B3', fontFamily: 'Noto Sans', fontSize: '16px', fontStyle: 'normal', fontWeight: 400, lineHeight: 'normal' }}>
                    Ми надіслали вам електронний лист. Дотримуйтесь інструкцій, щоб отримати доступ до акаунта SoundScape.
                </p>
                <button 
                    onClick={() => navigate('/login')}
                    className="text-white font-bold w-full max-w-md mb-4 bg-[rgba(163,5,166,0.50)] hover:bg-[rgba(163,5,166,0.7)]" 
                    style={{ 
                        borderRadius: '20px', 
                        display: 'flex', 
                        padding: '16px 10px', 
                        justifyContent: 'center', 
                        alignItems: 'center', 
                        gap: '10px'
                    }}
                >
                    Назад на сторінку входу
                </button>
                <button 
                    onClick={() => navigate('/forgot-password')}
                    className="text-white font-bold w-full max-w-md" 
                    style={{ 
                        borderRadius: '20px', 
                        border: '1px solid rgba(163, 5, 166, 0.50)', 
                        background: 'transparent', 
                        display: 'flex', 
                        padding: '16px 10px', 
                        justifyContent: 'center', 
                        alignItems: 'center', 
                        gap: '10px'
                    }}
                >
                    Змінити адресу ел. пошти
                </button>
            </div>
        </div>
    );
};

export default EmailSent;
