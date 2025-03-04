import { Link } from 'react-router-dom';
import './MainGuest.css';

const MainGuest = () => {
    return (
        <>
            <div className="main-guest-wrapper">

                <img src={"images/guestPage/DM.png"} alt="DM" className="main-guest-image" />

                <div className="main-guest-content">
                    <div className="quote">
                        <p className="quote-text">
                            "Музика може змінити світ, тому що вона<br /> здатна змінювати людей."
                            <span className="quote-author"> – Боно (U2)</span>
                        </p>
                    </div>

                    <h1 className="main-guest-title">
                        Насолоджуйся мільйонами треків <br /> і подкастів без жодних витрат
                    </h1>
                    <Link to="/register-step1">
                        <button className="main-guest-button">
                            Зареєструватися безкоштовно
                        </button>
                    </Link>
                </div>

                <div className="gradient-square">
                    <div className="small-square">
                        <div className="circle">
                            <img src=".\images\guestPage\tabler_playlist.svg" alt="Картинка" className="circle-imageTabler" />
                        </div>
                        <div className="text-container">
                            <p className="bold-text">Інтелектуальні рекомендації</p>
                            <p className="small-text">персоналізовані плейлисти на основі твоїх уподобань</p>
                        </div>
                    </div>
                    <div className="small-square">
                        <div className="circle">
                            <img src=".\images\guestPage\Vector.svg" alt="Картинка" className="circle-imageVector" />
                        </div>
                        <div className="text-container">
                            <p className="bold-text">Висока якість звуку</p>
                            <p className="small-text">насолоджуйся чистим звучанням у будь-який момент</p>
                        </div>
                    </div>
                    <div className="small-square">
                        <div className="circle">
                            <img src=".\images\guestPage\Group.svg" alt="Картинка" className="circle-imageGroup" />
                        </div>
                        <div className="text-container">
                            <p className="bold-text">Локальний контент</p>
                            <p className="small-text">підтримка незалежних артистів і регіональних хітів</p>
                        </div>
                    </div>
                    <div className="small-square">
                        <div className="circle">
                            <img src=".\images\guestPage\Vector1.svg" alt="Картинка" className="circle-imageVector1" />
                        </div>
                        <div className="text-container">
                            <p className="bold-text">Інтуїтивний інтерфейс</p>
                            <p className="small-text">стильний та зручний дизайн для швидкого доступу до улюблених треків</p>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
};

export default MainGuest;