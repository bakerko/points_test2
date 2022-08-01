import axios from "axios";
import {setCountItems} from "../reducers/fileDataReducer";

const fileData = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

export const getCountItems = ()=>{
    return async (dispatch)=>{
        const responce = await fileData.post('api/utils/getCountRows/1')
        dispatch(setCountItems(responce.data))
    }
}