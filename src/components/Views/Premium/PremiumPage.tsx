import React from 'react';
import './PremiumPage.css';


const Premium: React.FC = () => {
    function scrollToCards() {
        const targetElement = document.getElementById('cards-section');
        if (targetElement) {
            const rect = targetElement.getBoundingClientRect();
            window.scrollBy({
                top: rect.top - 250, 
                behavior: 'smooth'
            });
        }
    }
    
    
    
    return (
        <div className="premium-container">
            <h1 className="premium-title">
                Слухайте без обмежень. Спробуйте <br />  безкоштовно з Premium Individual<br /> протягом 1 місяць.
            </h1>
            <p className="premium-subtitle">
                Потім усього 4,99 USD на місяць. Можна скасувати будь-коли.
            </p>
            <div className="button-container">
                <button className="primary-button">Почати</button>
                <button className="secondary-button" onClick={scrollToCards}>Переглянути всі підписки</button>
            </div>
            <p className="premium-note">
                Лише Premium Individual. Безкоштовно протягом 1 місяця, потім 4,99 USD на місяць. Пропозиція доступна, лише якщо ви раніше не користувалися Premium-підпискою.<br /> Пропозиція діє до 26 лютого 2025 р.
            </p>
            <div className="premium-benefits">
                <div className="benefits-left">
                    <h2 className="benefits-title">Усі Premium-підписки пропонують</h2>
                </div>
                <div className="benefits-right ">
                    <div className="benefits-list">
                        <div className="benefit-item">
                            <img src="\images\checkmark.svg" alt="Checkmark" className="benefit-icon" />
                            <span>Музика без реклами</span>
                        </div>
                        <div className="benefit-item">
                            <img src="\images\checkmark.svg" alt="Checkmark" className="benefit-icon" />
                            <span>Завантажуйте, щоб слухати офлайн</span>
                        </div>
                        <div className="benefit-item">
                            <img src="\images\checkmark.svg" alt="Checkmark" className="benefit-icon" />
                            <span>Слухайте треки в будь-якому порядку</span>
                        </div>
                        <div className="benefit-item">
                            <img src="\images\checkmark.svg" alt="Checkmark" className="benefit-icon" />
                            <span>Висока якість звуку</span>
                        </div>
                        <div className="benefit-item">
                            <img src="\images\checkmark.svg" alt="Checkmark" className="benefit-icon" />
                            <span>Прослуховування разом із друзями в реальному часі</span>
                        </div>
                        <div className="benefit-item">
                            <img src="\images\checkmark.svg" alt="Checkmark" className="benefit-icon" />
                            <span>Керування чергою прослуховування</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="cards-container" id="cards-section">
                <div className="card individual">
                    <div className="card-badge">Безкоштовно на 1 місяць</div>
                    <h3 className="card-title-sale">Individual</h3>
                    <p className="card-price-month"><strong>Безкоштовно на 1 місяць</strong></p>
                    <p className="card-price">Потім 4,99 USD на місяць</p>
                    <div className="line-container">
                        <div className="line"></div>
                    </div>
                    <ul className="card-benefits">
                        <li>1 акаунт Premium</li>
                        <li>Можна скасувати будь-коли</li>
                    </ul>
                    <button className="card-button">Спробуйте безкоштовно протягом 1 місяця</button>
                    <p className="card-info">Безкоштовно протягом 1 місяця, потім 4,99 USD на місяць. Пропозиція доступна, лише якщо ви раніше не користувалися Premium-підпискою. Діють Умови. Пропозиція діє до 26 лютого 2025 р..</p>
                </div>
                <div className="card student">
                    <div className="card-badge">Безкоштовно на 1 місяць</div>
                    <h3 className="card-title-sale">Student</h3>
                    <p className="card-price-month"><strong>Безкоштовно на 1 місяць</strong></p>
                    <p className="card-price">Потім 2,49 USD на місяць</p>
                    <div className="line-container">
                        <div className="line"></div>
                    </div>
                    <ul className="card-benefits">
                        <li>1 акаунти Premium</li>
                        <li>Знижка для студентів, що відповідають умовам</li>
                        <li>Можна скасувати будь-коли</li>
                    </ul>
                    <button className="card-button">Спробуйте безкоштовно протягом 1 місяця</button>
                    <p className="card-info">Безкоштовно протягом 1 місяця, потім 4,99 USD на місяць. Пропозиція доступна, лише якщо ви раніше не користувалися Premium-підпискою. Діють Умови. Пропозиція діє до 26 лютого 2025 р..</p>
                </div>
                <div className="card duo">
                    <h3 className="card-title">Duo</h3>
                    <p className="card-price-month"><strong>6.49 USD на місяць</strong></p>
                    <div className="line-container">
                        <div className="line"></div>
                    </div>
                    <ul className="card-benefits">
                        <li>2 акаунтіи Premium</li>
                        <li>Можна скасувати будь-коли</li>
                    </ul>
                    <button className="card-button">Отримайте Premium Duo</button>
                    <p className="card-info">Для двох користувачів, які проживають за однією адресою. Діють Умови.</p>
                </div>
                <div className="card fatily">
                    <h3 className="card-title">Fatily</h3>
                    <p className="card-price-month"><strong>7.99 USD на місяць</strong></p>
                    <div className="line-container">
                        <div className="line"></div>
                    </div>
                    <ul className="card-benefits">
                        <li>До 6 акаунтів Premium</li>
                        <li>Контролюйте контент із віковими обмеженнями</li>
                        <li>Можна скасувати будь-коли</li>
                    </ul>
                    <button className="card-button">Отримайте Premium Family</button>
                    <p className="card-info">Для 6 членів сім’ї, які проживають за однією адресою. Діють Умови.</p>
                </div>
            </div>

            <div className="payment-methods-section">
                <p className="payment-text">Оплачуйте зручним для вас способом.<br /> Можна скасувати будь-коли.</p>
                <div className="payment-methods-container">
                    <div className="payment-method">
                        <img src="\images\visa.svg" alt="Method 1" />
                    </div>
                    <div className="payment-method">
                        <img src="\images\mastercard.svg" alt="Method 2" />
                    </div>
                    <div className="payment-method">
                        <img src="\images\discover.svg" alt="Method 3" />
                        <div className="red-circle"></div>
                    </div>

                    <div className="payment-method">
                        <img src="\images\american_express.svg" alt="Method 4" />
                    </div>
                    <div className="payment-method">
                        <img src="\images\paypal.svg" alt="Method 5" />
                    </div>
                </div>
            </div>


        </div>
    );
};

export default Premium;