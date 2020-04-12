import React from 'react';
import Slider from 'react-slick';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './styles.css';

import PrimaryButton from '../../components/PrimaryButton';
import Preloader from '../../components/Preloader';
import FilmPreview from '../../components/FilmPreview';
import genresToString from '../../services/genresStringify';

const settings = {
    dots: false,
    fade: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    arrows: true,
    slidesToScroll: 1,
    className: "films-slides"
};

const FilmsCarousel = (props) => {
        return (
            <div className="films-slides-container">
                {!props.loading ? (
                    <React.Fragment>
                    {props.showed ? (
                            <React.Fragment>
                                {(props.films && props.films.length > 0) ? (
                                    <React.Fragment>
                                        <Slider {...settings}>
                                            {props.films.map((film) => (
                                                <FilmPreview film={film}/>
                                            ))}
                                        </Slider>
                                        <div className="films-slides-container__get-films-button-container">
                                            <PrimaryButton onClick={props.getFilmsFunc} content={"Подобрать фильмы снова"}/>
                                        </div>
                                    </React.Fragment>
                                ) : (
                                    <React.Fragment>
                                        <FilmPreview/>
                                        <div className="films-slides-container__get-films-button-container">
                                            <PrimaryButton onClick={props.getFilmsFunc} content={"Подобрать фильмы снова"}/>
                                        </div>
                                    </React.Fragment>
                                )}
                            </React.Fragment>
                        ) : (
                            <div className="films-slides-container__get-films-button-container">
                                <PrimaryButton onClick={props.getFilmsFunc} content={"Подобрать фильмы"}/>
                            </div>
                        )}
                    </React.Fragment>

                ) : (
                    <Preloader/>
                )}
            </div>
        )
};
export default FilmsCarousel;
