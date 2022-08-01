

import {getChannel} from "../reducers/fileDataReducer";

export const fetchChannel = (channel, agregation, offset=0, limit=400)=>{

    const hardcode_key='R07_20220219_0FFD_736_378_sine31_2mv_Recording_00_SD';

    return dispatch =>{


        fetch(process.env.REACT_APP_STAS_API+hardcode_key+'/'+channel+'/'+agregation+'/?offset='+offset+'&limit='+limit, {
            //mode: 'no-cors',
            method: "GET",
            headers:{
                "Access-Control-Allow-Origin": "*"
            }
        })
            .then(response=>response.json())
            .then(json=>{
                 //console.log("----->channel = "+channel)

                dispatch(getChannel({
                    label:json.headers.label,
                    channel: channel,
                    data: json.data,
                    physical_max: json.headers.physical_max,
                    physical_min: json.headers.physical_min

                }))
            })



    }
}