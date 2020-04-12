import React from 'react';

import './styles.css';

import loadingImg from './loadingGif.svg';

const Preloader = () => {
    return (
        <React.Fragment>
            <img src={loadingImg} className="preloader" width="200" height="200"/>
        </React.Fragment>
    )
};

export default Preloader;