import axios from "axios";

const $fileData = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

const $agregateInfo = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';

const stasApi = axios.create({
    baseURL: process.env.REACT_APP_STAS_API

})





export{
    $fileData,
    $agregateInfo,
    stasApi
}