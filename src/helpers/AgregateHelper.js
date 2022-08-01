import React from 'react';

const AgregateHelper = () => {
    let shiftMultiplier=[]
    let maxScale = 1

    function setShiftMultiplier(mas){
        shiftMultiplier=mas
        maxScale=mas.length
    }

    function getShiftMultiplier(mas){
        return shiftMultiplier
    }




    return (
        <div>

        </div>
    );
};

export default AgregateHelper;