import React from 'react';
import { BallTriangle } from  'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

const Preloader2 = () => {

    return (
        <div style={{position: "absolute", top:"50%", left: "40%"}}>
            <BallTriangle/>
        </div>
    );
};

export default Preloader2;