import React from 'react';
import { BallTriangle } from  'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

const Preloader = () => {




    return (
        <div className="loader">
            <BallTriangle/>
        </div>
    );
};

export default Preloader;