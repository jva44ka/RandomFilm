import React from 'react';

import './styles.css';

import loadingImg from './loadingGif.svg';

const Preloader = () => {
    return (
        <React.Fragment>
            <div className="preloader">
                <img src={loadingImg} className="preloader__image" width="200" height="200"/>
            </div>
        </React.Fragment>
    )
};

export default Preloader;