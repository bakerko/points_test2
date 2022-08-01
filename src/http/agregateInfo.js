import {$agregateInfo} from "./index";


export const getAllData = async (limit, offset, channel) => {
    const responce = await $agregateInfo.post('api/utils/getAgregateMultipliers/')
    return responce
}