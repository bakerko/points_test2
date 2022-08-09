

import {loadSomeData} from "../reducers/fileDataReducer";

export const fetchData = (channel, agregation, offset=0, limit=400)=>{

    const hardcode_key='R07_20220219_0FFD_736_378_sine31_2mv_Recording_00_SD';

    return dispatch =>{

        fetch(process.env.REACT_APP_STAS_API+'get_data_by_key'+'/headers/'+hardcode_key+'/', {
            //mode: 'no-cors',
            method: "GET",
            headers:{
                "Access-Control-Allow-Origin": "*"
            }
        })
            .then(response=>response.json())
            .then(json=>{

                dispatch(loadSomeData(json.headers.data))
            })



    }
}