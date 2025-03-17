import React from 'react';
import './notification.css';

const NotificationPage: React.FC = () => {
    return (
        <div className=" flex flex-col notification-main">
            <div className="p-6">
                <h1 className="main-text-notification font-size-[32px]">
                    Що нового
                </h1>
                <h2 className='sub-text-notification'>Нові подкасти, шоу й останні релізи від виконавців, на яких ви підписані</h2>
            </div>

            <div className="flex justify-center items-start center-text-notification">
                <div className="text-center">
                    <h1 className="main-center-text-notification">
                        Зараз для вас немає оновлень
                    </h1>
                    <h2 className="sub-text-notification">
                        Новини з'являтимуться тут. Підпишіться на улюблених виконавців і подкасти, щоб бачити їх оновлення.
                    </h2>
                </div>
            </div>

        </div>
    );

};

export default NotificationPage;