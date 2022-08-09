

import {getChannel, oneChannelLoaded} from "../reducers/fileDataReducer";

export const fetchChannel = (channel, agregation, offset=0, limit=400, fileType=0)=>{

    const hardcode_key='R07_20220219_0FFD_736_378_sine31_2mv_Recording_00_SD';

    let key='get_data_by_key'
    if(fileType)key='get_data_by_key_v2'


    return dispatch =>{

        fetch(process.env.REACT_APP_STAS_API+key+'/'+hardcode_key+'/'+channel+'/'+agregation+'/?second_start='+offset+'&seconds_count='+limit, {
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
                    physical_min: json.headers.physical_min,
                    offset: offset,
                    count_seconds: json.count/json.headers.sample_rate,
                    sample_rate: json.headers.sample_rate,
                    limit: limit

                }))

                dispatch(oneChannelLoaded())
            })



    }
}