import {useState} from "react";

const GET_CHANNEL = "GET_CHANNEL"
const DROP_CHART_DATA = "DROP_CHART_DATA"

const ONE_CHANNEL_LOADED = "ONE_CHANNEL_LOADED"
const DROP_CHANNEL_LOADED = "DROP_CHANNEL_LOADED"

const LOAD_DATA = "LOAD_DATA"


const defaultState={
    channelsNumber:17,
    //agregationsMultipliers:[2, 4, 5, 8, 10, 20, 25, 40, 50, 100, 125, 200, 250, 400, 500, 1000],

    agregationsMultipliers:[1000, 500, 400, 250, 200, 125, 100, 50, 40, 25, 20, 10, 8, 5, 4, 2],
    //agregationsMultipliers:[100, 125, 200, 250, 400, 500, 1000],
    //agregationsMultipliers:[400, 500, 1000],

    startData: '',

    loadedChannelsCount:0,
    chartGridLines:6,

    dataLoaded: false,
    dataForCharts:[],
    secondsOnScreenArray:[1,2,5,10,30,60],
    pointsOnScreen: 400,
    //showPoints: 160000
    showPoints: 16000
}

export default function fileDataReducer(state=defaultState, action){
    switch(action.type){
        case GET_CHANNEL:
           // console.log("length--> = "+state.dataForCharts.length)

            return {
                ...state,
                dataForCharts: [...state.dataForCharts, action.payload]
            }

        case LOAD_DATA:
            //console.log("action.payload =" +action.payload)
            return {
                ...state,
                startData: action.payload
            }

            /*
            let channelExist=false
            if(state.dataForCharts.length>0){
                state.dataForCharts.map((item, i)=>{
                    if(item.channel==action.payload.channel)
                        channelExist=true
                })
            }

            //console.log("---> channelExist = "+channelExist)

            if(channelExist)
            return {
                ...state,
                dataForCharts: state.dataForCharts.map((item, i)=>{
                    if(item.channel==action.payload.channel){
                        let delta = action.payload.offset - item.offset

                        let tmpArray=[]
                        if(delta>0){
                            tmpArray=item.data.filter((innerItem, i2)=>{
                                if(i2>=item.sample_rate*(Math.abs(delta))){
                                    return true
                                }
                            })
                            item.data=[...tmpArray, ...action.payload.data]

                        }else{
                            //console.log("<=0")

                            tmpArray=item.data.filter((innerItem, i2)=>{
                                if(i2<item.sample_rate*(item.limit-Math.abs(delta))){
                                    return true
                                }
                            })

                            item.data=[...action.payload.data, ...tmpArray]

                        }

                        item.offset = action.payload.offset

                        return item
                    }else{
                        return item
                    }
                })
            }

            if(!channelExist)
            return {
                ...state,
                dataForCharts: [...state.dataForCharts, action.payload]
            }*/

        case ONE_CHANNEL_LOADED:
            return {
                ...state,
                loadedChannelsCount: state.loadedChannelsCount+1
            }

        case DROP_CHANNEL_LOADED:
            return {
                ...state,
                loadedChannelsCount: 0
            }

        case DROP_CHART_DATA:
            return {
                ...state,
                dataForCharts: []
            }

        default:
            return state
    }
}

export const getChannel = (payload)=>({type:GET_CHANNEL, payload})

export const dropChartData = (payload)=>({type:DROP_CHART_DATA, payload})

export const dropChannelLoaded = (payload)=>({type:DROP_CHANNEL_LOADED, payload})
export const oneChannelLoaded = (payload)=>({type:ONE_CHANNEL_LOADED, payload})

export const loadSomeData = (payload)=>({type:LOAD_DATA, payload})

