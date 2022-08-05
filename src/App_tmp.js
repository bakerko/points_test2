

import {Button, Row, Col} from "react-bootstrap";
import React, {useEffect, useState} from 'react';
import fileDataStore from './store/FileDataStore'

import Chart from './components/Chart'
import {useDispatch, useSelector} from "react-redux";

import {fetchChannel} from "./asyncActions/loadChannel";
import PreloaderV2 from "./components/PreloaderV2"
import {dropChartData} from "./reducers/fileDataReducer";



function App() {

    const dispatch = useDispatch()
    const agregationsMultipliers = useSelector(state=>state.api.agregationsMultipliers)

    const dataForCharts = useSelector(state=>state.api.dataForCharts)
    const channelsNumber = useSelector(state=>state.api.channelsNumber)

    const showPoints = useSelector(state=>state.api.showPoints)

    const secondsOnScreen = useSelector(state=>state.api.secondsOnScreen)

    const [showChannels, setShowChannels] = useState(5);


    const [offset, setOffset] = useState(0);

    const [loadingChannel, setLoadingChannel] = useState(false);
    const [showPreloader, setShowPreloader] = useState(true);

    const [aggregation, setAggregation] = useState(0);

    const [mouseDown, setMouseDown] = useState(0);
    const [mouseMoveStartX, setmouseMoveStartX] = useState(0);

    const minimumShift=10; //percents
    const chartWidth=1600;




    useEffect(() => {

    })


    useEffect(() => {

        if(!loadingChannel){
            setLoadingChannel(true)

            console.log("o_O-->showChannels = "+showChannels)

            loadAllChannels(agregationsMultipliers[aggregation], showChannels, offset, secondsOnScreen)
        }

        if(dataForCharts.length==showChannels){
            setShowPreloader(false)
        }

    }, [dataForCharts])


    function loadAllChannels(agregation, showChannels, offset,  limit) {
        for(let channel=0;channel<showChannels;channel++) {

            dispatch(fetchChannel(channel, agregation, offset,  limit))
        }

    }


    useEffect(() => {
        if(loadingChannel) {
            dispatch(dropChartData([]))
            setLoadingChannel(false)
            setShowPreloader(true)
        }

        //console.log("aggregation = "+aggregation)

    }, [aggregation, showChannels])


    useEffect(() => {

        if(loadingChannel) {
            dispatch(dropChartData([]))
            setLoadingChannel(false)
            setShowPreloader(true)
        }

        //console.log("o_O --> offset = "+offset)

    }, [offset])


    const changeScaleDown = () => {
        if(showPreloader)return;

        //need to recalculate Shift //or use globalShift from agregation 0

        if(aggregation-1>=0){
            setAggregation(aggregation-1)
        }
    }

    const changeScaleUp = () => {
        if(showPreloader)return;


        if(aggregation+1<agregationsMultipliers.length){
            setAggregation(aggregation+1)
        }

    }

    const myMouseUp=()=>{
        setMouseDown(0)

    }

    const myMouseDown=(e)=>{
        setMouseDown(1)
        setmouseMoveStartX(e.pageX)

    }

    const mouseMove=(e)=>{
        let tmp = e.pageX;

        //console.log("mouseDown = "+mouseDown)

        if(mouseDown){
            let curX = e.pageX;
            let delta = curX-mouseMoveStartX;
            let tmp = delta

            let shiftByChartWidth = delta/chartWidth;

            let shiftCount = Math.floor(Math.abs(secondsOnScreen*shiftByChartWidth))

            if(Math.abs(shiftByChartWidth*100)>=minimumShift) {

                if (delta > 0) {
                    setmouseMoveStartX(curX)
                    shiftLeftMore(shiftCount)
                } else {
                    setmouseMoveStartX(curX)
                    shiftRightMore(shiftCount)
                }
            }
        }
    }

    function shiftLeftMore(shiftCount){

        if(showPreloader)return;

        if(offset-shiftCount>0){
            setOffset(offset-shiftCount)
        }else{
            if(offset){
                setOffset(0)
            }
        }
    }

    function shiftRightMore(shiftCount){//need check on max_count

        if(showPreloader)return;

        console.log("dataForCharts + shiftRightMore")
        console.log(dataForCharts.length)

        if(dataForCharts.length==0)return;

        let tmpMax = dataForCharts[0].count;

        if(offset+shiftCount<=tmpMax){
            setOffset(offset + shiftCount)
        }else{
            setOffset(tmpMax - offset)
        }
    }


    function changeShowChunnels(event){
        if(showPreloader)return;

        if(showChannels!==event.target.value&&showChannels<=channelsNumber){
            setShowChannels(event.target.value)
        }
    }


    function changeAggregation(event){
        if(showPreloader)return;

        if(aggregation!==event.target.value){
            setAggregation(event.target.value)
        }

    }


    return (

            <div className="App" onMouseUp={myMouseUp}>
                    <div style={{width: "100%", display: "flex"}}>

                        <div style={{marginLeft:"10px"}}>
                            <div style={{marginLeft:"5px"}}>Aggregation:</div>
                            <select defaultValue={aggregation} onChange={changeAggregation}>
                                {
                                    agregationsMultipliers.map((item, i)=> (
                                            <option key={i} value={i}>{item}</option>
                                        )
                                    )
                                }
                            </select>
                        </div>

                        <div style={{marginLeft:"10px"}}>
                            <div style={{marginLeft:"5px"}}>Channels count:</div>
                            <select defaultValue={showChannels} onChange={changeShowChunnels}>

                                {[...Array(channelsNumber)].map((x,i)=>
                                    <option key={i} value={i+1}>{i+1}</option>
                                )}

                            </select>
                        </div>
                    </div>



                <div style={{width: 1600, height: 800, cursor: 'pointer'}} onMouseDown={myMouseDown} onMouseMove={mouseMove}>


                    <Chart
                        dataForCharts={dataForCharts}
                    />
                    {showPreloader && <PreloaderV2 color="#00BFFF" height={80} width={80}  />}
                </div>



            </div>

    );
}


export default App;
