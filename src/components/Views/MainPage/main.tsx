import './main.css';

const Main = () => {
    return (
        <div className="main">

            <div className="container">
                <div className="block_day-recomendation">
                    <div className="content">
                        <h1>Arctic Monkeys</h1>
                        <div className="row">
                            <div className="item">
                                <img src="images/home_page_images/music_icon.png" alt="songImage" />
                            </div>
                            <div className="item">
                                <div className="under-title">
                                    <img src="/images/home_page_images/ellipse-8.png" alt="" />
                                    <p>Рекомендація дня</p>
                                </div>
                                <div className="song-name">
                                    <p className="name">I Wanna Be Yours</p>
                                    <button type="button" className="btn" id="share">
                                        <img src="/images/home_page_images/share_icon.png" alt="Share" />
                                    </button>
                                </div>
                                <div className="controls">
                                    <button type="button" className="btn" id="play">
                                        <img src="/images/home_page_images/player_icon.png" alt="play" />
                                    </button>
                                    <button type="button" className="btn" id="add">
                                        <img src="/images/home_page_images/add_icon.png" alt="add" />
                                    </button>
                                    <button type="button" className="btn" id="more">
                                        <img src="/images/home_page_images/more_icon.png" alt="more" />
                                    </button>
                                </div>
                            </div>
                            <div className="item">
                                <p className="artist-information">
                                    With their nervy and literate indie rock sound, Arctic Monkeys are a respected, adventurous, and successful group that could easily be called Britain's biggest band of the early 21st century.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="block_popular-artists">
                    <h2 className="title">Популярні виконавці</h2>
                    <div className="container">
                        <button className="control_item">
                            <img src="/images/home_page_images/arrow_left.png" alt="arrow" />
                        </button>

                        <div className="row">
                            <div className="item">
                                <div className="image-container">
                                    <img src="/images/artist-example-icon.png" />
                                </div>
                                <p>Bad Bunny</p>
                            </div>
                            <div className="item">
                                <div className="image-container">
                                    <img src="/images/artist-example-icon.png" />
                                </div>
                                <p>Bad Bunny</p>
                            </div>
                            <div className="item">
                                <div className="image-container">
                                    <img src="/images/artist-example-icon.png" />
                                </div>
                                <p>Bad Bunny</p>
                            </div>
                            <div className="item">
                                <div className="image-container">
                                    <img src="/images/artist-example-icon.png" />
                                </div>
                                <p>Bad Bunny</p>
                            </div>
                            <div className="item">
                                <div className="image-container">
                                    <img src="/images/artist-example-icon.png" />
                                </div>
                                <p>Bad Bunny</p>
                            </div>
                        </div>

                        <button className="control_item">
                            <img src="/images/home_page_images/arrow_right.png" alt="arrow" />
                        </button>
                    </div>
                </div>
                <div className="block_top10">
                    <h2 className="title">TOP 10</h2>
                    <div className="column">
                        <ul>
                            <li className="item">
                                <div>
                                    <div className="image-container">
                                        <img src="images/song-example-icon.png" />
                                    </div>
                                    <div className="text">
                                        <p className="name-song">Espresso</p>
                                        <p className="name-artist">Sabrina Carpenter</p>
                                    </div>
                                </div>
                                <div>
                                    <p className="count-views">1 833 572 218</p>
                                </div>
                                <div className="controls">
                                    <button type="button" className="btn" id="add">
                                        <img src="/images/home_page_images/add_icon.png" alt="add" />
                                    </button>
                                    <p className="time">2:55</p>
                                    <button type="button" className="btn" id="more">
                                        <img src="/images/home_page_images/more_icon.png" alt="more" />
                                    </button>
                                </div>
                            </li>
                            <li className="item">
                                <div>
                                    <div className="image-container">
                                        <img src="images/song-example-icon.png" />
                                    </div>
                                    <div className="text">
                                        <p className="name-song">Espresso</p>
                                        <p className="name-artist">Sabrina Carpenter</p>
                                    </div>
                                </div>
                                <div>
                                    <p className="count-views">1 833 572 218</p>
                                </div>
                                <div className="controls">
                                    <button type="button" className="btn" id="add">
                                        <img src="/images/home_page_images/add_icon.png" alt="add" />
                                    </button>
                                    <p className="time">2:55</p>
                                    <button type="button" className="btn" id="more">
                                        <img src="/images/home_page_images/more_icon.png" alt="more" />
                                    </button>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="block_best-world-albums">
                    <h2 className="title">Найкращі світові альбоми</h2>
                    <div className="row">
                        <div className="item">
                            <div className="image-container">
                                <img src="/images/album-example-icon.png" />
                            </div>
                            <p className="name-album">Short n’ Sweet</p>
                            <p className="name-artist">Sabrina Carpenter</p>
                        </div>
                        <div className="item">
                            <div className="image-container">
                                <img src="/images/album-example-icon.png" />
                            </div>
                            <p className="name-album">Short n’ Sweet</p>
                            <p className="name-artist">Sabrina Carpenter</p>
                        </div>
                        <div className="item">
                            <div className="image-container">
                                <img src="/images/album-example-icon.png" />
                            </div>
                            <p className="name-album">Short n’ Sweet</p>
                            <p className="name-artist">Sabrina Carpenter</p>
                        </div>
                        <div className="item">
                            <div className="image-container">
                                <img src="/images/album-example-icon.png" />
                            </div>
                            <p className="name-album">Short n’ Sweet</p>
                            <p className="name-artist">Sabrina Carpenter</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Main;