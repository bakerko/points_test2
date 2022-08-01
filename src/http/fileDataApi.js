import {$fileData, stasApi} from "./index";

export const getSignalNewBack = async (limit, offset, channel, agregation) => {
    const hardcode_key='R07_20220219_0FFD_736_378_sine31_2mv_Recording_00_SD';

/*
        console.log('offset = '+offset)
        console.log('channel = '+channel)
        console.log('agregation = '+agregation)
*/
    console.log('before getSignalNewBack')

    const responce = await stasApi.get('/'+hardcode_key+'/'+channel+'/'+agregation+'/?offset='+offset+'&limit='+limit, {
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
        responseType: "json",
    })

    return responce
}

/*
export const getSignal = async (limit, offset, channel) => {
    const responce = await stasApi.post('get-signal/', {
        "limit": 1000,
        "offset": 0,
        "channel_id": 16
    })
    return responce
}*/
/*
export const getRoot = async (limit, offset, channel) => {
    const responce = await stasApi.post('/')
    return responce
}*/

export const getAllData22 = async (limit, offset, channel) => {
    const responce = await $fileData.post('api/utils/getSomeData/'+limit+'/'+offset+'/'+channel)
    return responce
}

export const getAllData = async (limit, offset, channel) => {
    const responce = await $fileData.post('api/utils/getSomeData/'+limit+'/'+offset+'/'+channel)
    return responce
}

export const getAgr1 = async (limit, offset, channel)=> {
    const responce = await $fileData.post('api/utils/get1/'+limit+'/'+offset+'/'+channel)
    return responce
}

export const getAgr2 = async (limit, offset, channel)=> {
    const responce = await $fileData.post('api/utils/get2/'+limit+'/'+offset+'/'+channel)
    return responce
}

export const getAgr3 = async (limit, offset, channel)=> {
    const responce = await $fileData.post('api/utils/get3/'+limit+'/'+offset+'/'+channel)
    return responce
}

export const getAgr4 = async (limit, offset, channel)=> {
    const responce = await $fileData.post('api/utils/get4/'+limit+'/'+offset+'/'+channel)
    return responce
}

export const getAgr5 = async (limit, offset, channel)=> {
    const responce = await $fileData.post('api/utils/get5/'+limit+'/'+offset+'/'+channel)
    return responce
}

export const getAgr6 = async (limit, offset, channel)=> {
    const responce = await $fileData.post('api/utils/get6/'+limit+'/'+offset+'/'+channel)
    return responce
}

export const getAgr7 = async (limit, offset, channel)=> {
    const responce = await $fileData.post('api/utils/get7/'+limit+'/'+offset+'/'+channel)
    return responce
}

export const getAgr8 = async (limit, offset, channel)=> {
    const responce = await $fileData.post('api/utils/get8/'+limit+'/'+offset+'/'+channel)
    return responce
}

export const getAgr9 = async (limit, offset, channel)=> {
    const responce = await $fileData.post('api/utils/get9/'+limit+'/'+offset+'/'+channel)
    return responce
}

export const getAgr10 = async (limit, offset, channel)=> {
    const responce = await $fileData.post('api/utils/get10/'+limit+'/'+offset+'/'+channel)
    return responce
}

export const getAgr11 = async (limit, offset, channel)=> {
    const responce = await $fileData.post('api/utils/get11/'+limit+'/'+offset+'/'+channel)
    return responce
}




export const getAllData_indexes = async (limit, offset) => {
    const responce = await $fileData.post('api/utils/getIndexes0/'+limit+'/'+offset)
    return responce
}

export const getAgr1_indexes = async (limit, offset, channel)=> {
    const responce = await $fileData.post('api/utils/getIndexes1/'+limit+'/'+offset)
    return responce
}

export const getAgr2_indexes = async (limit, offset, channel)=> {
    const responce = await $fileData.post('api/utils/getIndexes2/'+limit+'/'+offset)
    return responce
}

export const getAgr3_indexes = async (limit, offset, channel)=> {
    const responce = await $fileData.post('api/utils/getIndexes3/'+limit+'/'+offset)
    return responce
}

export const getAgr4_indexes = async (limit, offset, channel)=> {
    const responce = await $fileData.post('api/utils/getIndexes4/'+limit+'/'+offset)
    return responce
}

export const getAgr5_indexes = async (limit, offset, channel)=> {
    const responce = await $fileData.post('api/utils/getIndexes5/'+limit+'/'+offset)
    return responce
}

export const getAgr6_indexes = async (limit, offset, channel)=> {
    const responce = await $fileData.post('api/utils/getIndexes6/'+limit+'/'+offset)
    return responce
}

export const getAgr7_indexes = async (limit, offset, channel)=> {
    const responce = await $fileData.post('api/utils/getIndexes7/'+limit+'/'+offset)
    return responce
}

export const getAgr8_indexes = async (limit, offset, channel)=> {
    const responce = await $fileData.post('api/utils/getIndexes8/'+limit+'/'+offset)
    return responce
}

export const getAgr9_indexes = async (limit, offset, channel)=> {
    const responce = await $fileData.post('api/utils/getIndexes9/'+limit+'/'+offset)
    return responce
}

export const getAgr10_indexes = async (limit, offset, channel)=> {
    const responce = await $fileData.post('api/utils/getIndexes10/'+limit+'/'+offset)
    return responce
}

export const getAgr11_indexes = async (limit, offset, channel)=> {
    const responce = await $fileData.post('api/utils/getIndexes11/'+limit+'/'+offset)
    return responce
}


export const getCountRows = (channel)=> {
   const tmpMax=100000;
    const shiftMultiplier=[
        25, 40, 50, 100, 125, 200, 250, 400, 500, 1000
    ]

    return tmpMax/shiftMultiplier[channel]
}

/*
const getAgr = [
    getAllData,
    getAgr1,
    getAgr2,
    getAgr3,
    getAgr4,
    getAgr5,
    getAgr6,
    getAgr7,
    getAgr8,
    getAgr9,
    getAgr10,
    getAgr11,
]*/

