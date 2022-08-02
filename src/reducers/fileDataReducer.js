import {useState} from "react";

const GET_CHANNEL = "GET_CHANNEL"
const DROP_CHART_DATA = "DROP_CHART_DATA"

const defaultState={
    channelsNumber:5,
    agregationsMultipliers:[40, 50, 100, 125, 200, 250, 400, 500, 1000],
    //agregationsMultipliers:[400, 500, 1000],
    dataLoaded: false,
    dataForCharts:[],
    pointsOnScreen: 400,
    //showPoints: 160000
    showPoints: 16000
}

export default function fileDataReducer(state=defaultState, action){
    switch(action.type){
        case GET_CHANNEL:
            return {
                ...state,
                dataForCharts: [...state.dataForCharts, action.payload]
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

