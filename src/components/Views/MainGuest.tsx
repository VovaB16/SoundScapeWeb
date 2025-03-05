import { Link } from 'react-router-dom';
import './MainGuest.css';
import { useState } from 'react';

const MainGuest = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);


    const toggleQuestion = (index: number): void => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const questions = [
        {
            title: 'Як створити плейліст?',
            answer: `За допомогою плейлістів ви можете легко зберігати улюблену музику й ділитися нею з друзями.
            
            Щоб його створити:
            
            1. Натисніть пункт "Моя бібліотека".
            2. Натисніть СТВОРИТИ.
            3. Назвіть плейліст.
            4. Почніть додавати пісні (і ми допоможемо вам у цьому).`
        },
        {
            title: 'Як увімкнути економію трафіку?',
            answer: `1. Натисніть пункт Головна.
            2. Натисніть Налаштування.
            3. Натисніть пункт Економія трафіку.
            4. Увімкніть економію трафіку.`
        },
        {
            title: 'Музику можна слухати тільки у випадковому порядку?',
            answer: `Якщо плейліст відмічено значком "Перемішати", треки будуть відтворюватись у випадковому порядку. 
            
            Якщо значка "Перемішати" немає, пісні в плейлісті можна вибирати.`
        },
        {
            title: 'Де знайти подкасти?',
            answer: `Торкніться Шукати. У розділі Переглянути все торкніться "Подкасти".`
        }
    ];

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

                <div className="full-page-image">
                    <img src=".\images\guestPage\AMM.png" alt="AMM" className="full-page-image-content" />
                    <p className="image-text style-1">Музика навколо</p>
                    <p className="image-text style-2">Ритм веде</p>
                    <p className="image-text style-3">Дихай музикою</p>
                    <p className="image-text style-4">Відчуй звук</p>
                    <p className="image-text style-5">Світ звуків</p>
                    <p className="image-text style-6">Твій ритм</p>
                    <p className="image-text style-7">Поринь у звук</p>
                    <p className="image-text style-8">Ти у ритмі</p>
                    <p className="image-text style-9">Відчуй ритм</p>
                    <p className="image-text style-10">Ти в музиці</p>
                    <p className="image-text style-11">Живи музикою</p>
                    <p className="image-text style-12">Відчуй емоції</p>
                    <p className="image-text style-13">Лови ритм</p>
                    <p className="image-text style-14">Твій стиль</p>
                    <p className="image-text style-15">Світ емоцій</p>
                    <p className="image-text style-16">Слухай серцем</p>
                    <p className="image-text style-17">Ритм усередині</p>
                    <p className="image-text style-18">Музика живе</p>
                </div>

                <div className="main-guest-wrapper">
                    <div className="gradient-square-second">
                        <p className="question-title">Маєте запитання?</p>
                        <div className="questions-container">
                            {questions.map((q, index) => (
                                <div
                                    key={index}
                                    className={`question ${activeIndex === index ? 'active' : ''}`}
                                    onClick={() => toggleQuestion(index)}
                                >
                                    <button className="question-btn">
                                        {q.title}
                                        <span className={`arrow ${activeIndex === index ? 'up' : 'down'}`}></span>
                                    </button>
                                    {activeIndex === index && (
                                        <div className="answer">
                                            <p>{q.answer}</p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="container-end"> 
    <img src={"images/guestPage/AI.png"} alt="DM" className="guest-page-image-end" />

    <div className="guest-page-content-end">
        <h1 className="guest-page-title-end">
            Готовий? вмикати музику!
        </h1>
        <Link to="/register-step1">
            <button className="guest-page-button-end">
                Зареєструватися безкоштовно
            </button>
        </Link>
    </div>
</div>

            </div>
        </>
    );
};

export default MainGuest;

