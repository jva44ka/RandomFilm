import React from 'react';

import './styles.css';

const PrimaryButton = ({onClick, content}) => {
    return (
        <React.Fragment>
            <button className="primary-button" onClick={onClick}>{content}</button>
        </React.Fragment>
    )
};

export  default PrimaryButton;