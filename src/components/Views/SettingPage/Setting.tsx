import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Setting.css';
import { AuthContext } from '../../context/AuthContext';

const Setting: React.FC = () => {
    const authContext = useContext(AuthContext);
    const logout = authContext ? authContext.logout : () => { };
    const navigate = useNavigate();

    const [displayPanel, setDisplayPanel] = useState(false);
    const [autoPlay, setAutoPlay] = useState(false);
    const [monoAudio, setMonoAudio] = useState(false);
    const [deviceAccess, setDeviceAccess] = useState(false);
    const [skipPauses, setSkipPauses] = useState(false);
    const [volumeNormalization, setVolumeNormalization] = useState(false);
    const [podcastVolumeControl, setPodcastVolumeControl] = useState(false);
    const [recentArtists, setRecentArtists] = useState(false);
    const [listeningActivity, setListeningActivity] = useState(false);
    const [privateSession, setPrivateSession] = useState(false);

    useEffect(() => {
        setDisplayPanel(JSON.parse(localStorage.getItem('displayPanel') || 'false'));
        setAutoPlay(JSON.parse(localStorage.getItem('autoPlay') || 'false'));
        setMonoAudio(JSON.parse(localStorage.getItem('monoAudio') || 'false'));
        setDeviceAccess(JSON.parse(localStorage.getItem('deviceAccess') || 'false'));
        setSkipPauses(JSON.parse(localStorage.getItem('skipPauses') || 'false'));
        setVolumeNormalization(JSON.parse(localStorage.getItem('volumeNormalization') || 'false'));
        setPodcastVolumeControl(JSON.parse(localStorage.getItem('podcastVolumeControl') || 'false'));
        setRecentArtists(JSON.parse(localStorage.getItem('recentArtists') || 'false'));
        setListeningActivity(JSON.parse(localStorage.getItem('listeningActivity') || 'false'));
        setPrivateSession(JSON.parse(localStorage.getItem('privateSession') || 'false'));
    }, []);

    useEffect(() => {
        localStorage.setItem('displayPanel', JSON.stringify(displayPanel));
    }, [displayPanel]);

    useEffect(() => {
        localStorage.setItem('autoPlay', JSON.stringify(autoPlay));
    }, [autoPlay]);

    useEffect(() => {
        localStorage.setItem('monoAudio', JSON.stringify(monoAudio));
    }, [monoAudio]);

    useEffect(() => {
        localStorage.setItem('deviceAccess', JSON.stringify(deviceAccess));
    }, [deviceAccess]);

    useEffect(() => {
        localStorage.setItem('skipPauses', JSON.stringify(skipPauses));
    }, [skipPauses]);

    useEffect(() => {
        localStorage.setItem('volumeNormalization', JSON.stringify(volumeNormalization));
    }, [volumeNormalization]);

    useEffect(() => {
        localStorage.setItem('podcastVolumeControl', JSON.stringify(podcastVolumeControl));
    }, [podcastVolumeControl]);

    useEffect(() => {
        localStorage.setItem('recentArtists', JSON.stringify(recentArtists));
    }, [recentArtists]);

    useEffect(() => {
        localStorage.setItem('listeningActivity', JSON.stringify(listeningActivity));
    }, [listeningActivity]);

    useEffect(() => {
        localStorage.setItem('privateSession', JSON.stringify(privateSession));
    }, [privateSession]);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="setting-container">
            <h1 className="setting-title">Налаштування</h1>
            <ul className="setting-list">
                <li className="setting-list-item">
                    <div className="setting-list-item-content">
                        <span className="setting-list-item-title">Акаунт</span>
                        <span className="setting-list-item-subtitle">Змінити способи входу</span>
                    </div>
                    <button className="setting-button" onClick={handleLogout}>Змінити</button>
                </li>
                
                <li className="setting-list-item">
                    <div className="setting-list-item-content">
                        <span className="setting-list-item-title">Відображення</span>
                        <span className="setting-list-item-subtitle">Показувати панель "Відтворюється" після натискання кнопки "Відтворити"</span>
                    </div>
                    <label className="switch">
                        <input type="checkbox" checked={displayPanel} onChange={() => setDisplayPanel(!displayPanel)} />
                        <span className="slider round"></span>
                    </label>
                </li>
                <hr className='hr-settings'/>
                <h1 className="setting-title-subtitle">Керування прослуховуванням</h1>
                <li className="setting-list-item">
                    <div className="setting-list-item-content">
                        <span className="setting-list-item-title">Автовідтворення</span>
                        <span className="setting-list-item-subtitle">Відтворення схожого контенту після закінчення прослуховування треків.
                        </span>
                    </div>
                    <label className="switch">
                        <input type="checkbox" checked={autoPlay} onChange={() => setAutoPlay(!autoPlay)} />
                        <span className="slider round"></span>
                    </label>
                </li>
                <li className="setting-list-item">
                    <div className="setting-list-item-content">
                        <span className="setting-list-item-title">Монозвук</span>
                        <span className="setting-list-item-subtitle">Лівий і правий динаміки відтворюють одну аудіодоріжку.</span>
                    </div>
                    <label className="switch">
                        <input type="checkbox" checked={monoAudio} onChange={() => setMonoAudio(!monoAudio)} />
                        <span className="slider round"></span>
                    </label>
                </li>
                <li className="setting-list-item">
                    <div className="setting-list-item-content">
                        <span className="setting-list-item-title">Доступ до музики, що відтворюється на пристрої
                        </span>
                        <span className="setting-list-item-subtitle">Інші додатки матимуть доступ для відображення прослуховуваної на пристрої музики.
                        </span>
                    </div>
                    <label className="switch">
                        <input type="checkbox" checked={deviceAccess} onChange={() => setDeviceAccess(!deviceAccess)} />
                        <span className="slider round"></span>
                    </label>
                </li>
                
                <hr className='hr-settings'/>
                <h1 className="setting-title-subtitle">Регулювання гучності
                </h1>
                <li className="setting-list-item">
                    <div className="setting-list-item-content">
                        <span className="setting-list-item-title">Регулювання гучності
                        </span>
                        <span className="setting-list-item-subtitle">Однаковий рівень гучності для всіх треків.
                        </span>
                    </div>
                    <label className="switch">
                        <input type="checkbox" checked={volumeNormalization} onChange={() => setVolumeNormalization(!volumeNormalization)} />
                        <span className="slider round"></span>
                    </label>
                </li>
                <li className="setting-list-item">
                    <div className="setting-list-item-content">
                        <span className="setting-list-item-title">Контроль гучності для подкастів</span>
                        <span className="setting-list-item-subtitle">Автоматичне регулювання рівня гучності подкастів для чистого та збалансованого звучання.
                        </span>
                    </div>
                    <label className="switch">
                        <input type="checkbox" checked={podcastVolumeControl} onChange={() => setPodcastVolumeControl(!podcastVolumeControl)} />
                        <span className="slider round"></span>
                    </label>
                </li>{/*
                <hr className='hr-settings'/>
                <h1 className="setting-title-subtitle">Прослухане вами

                </h1>
                <li className="setting-list-item">
                    <div className="setting-list-item-content">
                        <span className="setting-list-item-title">Нещодавно прослухані виконавці
                        </span>
                        <span className="setting-list-item-subtitle">У вашому профілі користувачі можуть переглянути нещодавно прослуханих вами виконавців.

                        </span>
                    </div>
                    <label className="switch">
                        <input type="checkbox" checked={recentArtists} onChange={() => setRecentArtists(!recentArtists)} />
                        <span className="slider round"></span>
                    </label>
                </li>
                <li className="setting-list-item">
                    <div className="setting-list-item-content">
                        <span className="setting-list-item-title">Прослухане вами
                        </span>
                        <span className="setting-list-item-subtitle">Ваші підписники можуть переглянути, що ви слухаєте, у режимі реального часу.

                        </span>
                    </div>
                    <label className="switch">
                        <input type="checkbox" checked={listeningActivity} onChange={() => setListeningActivity(!listeningActivity)} />
                        <span className="slider round"></span>
                    </label>
                </li>
                <li className="setting-list-item">
                    <div className="setting-list-item-content">
                        <span className="setting-list-item-title">Приватний сеанс</span>
                        <span className="setting-list-item-subtitle">Тимчасово приховайте прослухане вами від підписників.
                        </span>
                    </div>
                    <label className="switch">
                        <input type="checkbox" checked={privateSession} onChange={() => setPrivateSession(!privateSession)} />
                        <span className="slider round"></span>
                    </label>
                </li>*/}
            </ul>
        </div>
    );
};

export default Setting;