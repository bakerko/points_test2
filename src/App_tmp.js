

import {Button, Row, Col} from "react-bootstrap";
import React, {useEffect, useState} from 'react';
import fileDataStore from './store/FileDataStore'

import Chart from './components/Chart3'
import {useDispatch, useSelector} from "react-redux";

import {fetchChannel} from "./asyncActions/loadChannel";
import PreloaderV2 from "./components/PreloaderV2"
import {dropChannelLoaded, dropChartData} from "./reducers/fileDataReducer";
import {fetchData} from "./asyncActions/loadData";
import ChartAxeX from "./components/ChartAxeX";
import ChartAxeY from "./components/ChartAxeY";



function App() {

    const dispatch = useDispatch()
    const agregationsMultipliers = useSelector(state=>state.api.agregationsMultipliers)
    const [aggregation, setAggregation] = useState(0);

    const startData = useSelector(state=>state.api.startData)
    const chartGridLines = useSelector(state=>state.api.chartGridLines)

    const dataForCharts = useSelector(state=>state.api.dataForCharts)
    const channelsNumber = useSelector(state=>state.api.channelsNumber)
    const loadedChannelsCount = useSelector(state=>state.api.loadedChannelsCount)

    const showPoints = useSelector(state=>state.api.showPoints)

    const secondsOnScreenArray = useSelector(state=>state.api.secondsOnScreenArray)//array
    const [secondsOnScreen, setSecondsOnScreen] = useState(3);

    const [fileType, setFileType] = useState(0);


    const [showChannels, setShowChannels] = useState(5);
    const [offset, setOffset] = useState(0);
    const [loadingChannel, setLoadingChannel] = useState(false);
    const [showPreloader, setShowPreloader] = useState(true);

    const [needLoad, setNeedLoad] = useState(false);

    const [limit, setLimit] = useState(secondsOnScreenArray[secondsOnScreen]);



    const [mouseDown, setMouseDown] = useState(0);
    const [mouseMoveStartX, setmouseMoveStartX] = useState(0);

    const minimumShift=10; //percents
    const chartWidth=1600;




    useEffect(() => {


    })


    useEffect(() => {

        if(needLoad){
            setShowPreloader(true)
            setNeedLoad(false)

            if(startData==''){
                dispatch(fetchData())
            }

            loadAllChannels(agregationsMultipliers[aggregation], showChannels, offset, limit, fileType)
        }
    }, [needLoad])


    useEffect(() => {
        if(loadedChannelsCount==showChannels){
            setShowPreloader(false)
            dispatch(dropChannelLoaded())
        }
    }, [loadedChannelsCount])


    function loadAllChannels(agregation, showChannels, offset,  limit, fileType=0) {

        for(let channel=0;channel<showChannels;channel++) {
            dispatch(fetchChannel(channel, agregation, offset,  limit, fileType))
        }
    }


    useEffect(() => {
        setLimit(secondsOnScreenArray[secondsOnScreen])
        dispatch(dropChartData())
        setNeedLoad(true)

        //console.log("offset = "+offset)

    }, [aggregation, showChannels, secondsOnScreen, offset, fileType])




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

    const myMouseUp=(e)=>{
        //setMouseDown(0)


        let curX = e.pageX;
        let delta = curX-mouseMoveStartX;
        let tmp = delta

        let shiftByChartWidth = delta/chartWidth;

        let shiftCount = Math.floor(Math.abs(secondsOnScreenArray[secondsOnScreen]*shiftByChartWidth))

        if(Math.abs(shiftByChartWidth*100)>=minimumShift&&!showPreloader) {

            if (delta > 0) {
                setmouseMoveStartX(curX)
                shiftLeftMore(shiftCount)
            } else {
                setmouseMoveStartX(curX)
                shiftRightMore(shiftCount)
            }
        }

    }

    const myMouseDown=(e)=> {
        //if (mouseDown == 0) {
        //    setMouseDown(1)
            setmouseMoveStartX(e.pageX)
        //}
    }

    const mouseMove=(e)=>{
        let tmp = e.pageX;

        //console.log("mouseDown = "+mouseDown)
/*
        if(mouseDown){
            let curX = e.pageX;
            let delta = curX-mouseMoveStartX;
            let tmp = delta

            let shiftByChartWidth = delta/chartWidth;

            let shiftCount = Math.floor(Math.abs(secondsOnScreenArray[secondsOnScreen]*shiftByChartWidth))

            if(Math.abs(shiftByChartWidth*100)>=minimumShift&&!showPreloader) {

                setMouseDown(0)

                if (delta > 0) {
                    setmouseMoveStartX(curX)
                    shiftLeftMore(shiftCount)
                } else {
                    setmouseMoveStartX(curX)
                    shiftRightMore(shiftCount)
                }
            }
        }*/
    }

    function screenToLeft(){
        shiftLeftMore(secondsOnScreenArray[secondsOnScreen])
    }

    function screenToRight(){
        shiftRightMore(secondsOnScreenArray[secondsOnScreen])
    }

    function shiftLeftMore(shiftCount){

        if(showPreloader)return;

        setLimit(shiftCount)

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

        setLimit(shiftCount)

       // console.log("dataForCharts + shiftRightMore")
       // console.log(dataForCharts.length)

        if(dataForCharts.length==0)return;

        let tmpMax = dataForCharts[0].count_seconds;

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


    function changeSecondsOnScreen(event){
        if(showPreloader)return;

        if(secondsOnScreen!==event.target.value){
            setSecondsOnScreen(event.target.value)
        }
    }


    function changeAggregation(event){
        if(showPreloader)return;

        if(aggregation!==event.target.value){
            setAggregation(event.target.value)
        }
    }

    function changeFileType(event){
        if(event.target.value==0){
            if(fileType!=0)setFileType(0)
        }else{
            if(fileType!=1)setFileType(1)
        }
    }


/*
    <ChartAxeY
        key={i}
        dataForCharts={oneChart}
    />
  */

    return (


            <div className="App" onMouseUp={myMouseUp}>

                    <div style={{width: "100%", display: "flex"}}>

                        <div style={{marginLeft:"15px"}}>
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

                        <div style={{marginLeft:"15px"}}>
                            <div style={{marginLeft:"5px"}}>Channels count:</div>
                            <select defaultValue={showChannels} onChange={changeShowChunnels}>

                                {[...Array(channelsNumber)].map((x,i)=>
                                    <option key={i} value={i+1}>{i+1}</option>
                                )}

                            </select>
                        </div>


                        <div style={{marginLeft:"15px"}}>
                            <div style={{marginLeft:"5px"}}>Seconds on Screen:</div>
                            <select defaultValue={secondsOnScreen} onChange={changeSecondsOnScreen}>

                                {secondsOnScreenArray.map((item,i)=>
                                    <option key={i} value={i}>Interval {item} seconds</option>
                                )}

                            </select>
                        </div>

                        <div style={{marginLeft:"15px"}}>
                            <div>Move by {secondsOnScreenArray[secondsOnScreen]} seconds (screen):</div>

                            <div style={{width:"100%", display: "flex"}}>
                                <div style={{width:"40%"}}>
                                    <button onClick={screenToLeft}>Left {secondsOnScreenArray[secondsOnScreen]}</button>
                                </div>
                                <div style={{width:"40%"}}>
                                    <button onClick={screenToRight}>Right {secondsOnScreenArray[secondsOnScreen]}</button>
                                </div>
                            </div>
                        </div>

                        <div style={{marginLeft:"15px"}}>
                            <div style={{marginLeft:"5px"}}>Type of Reading file:</div>
                            <select defaultValue={0} onChange={changeFileType}>


                                <option key={0} value={0}>First type (old one)</option>
                                <option key={1} value={1}>Second type (new one)</option>


                            </select>
                        </div>


                    </div>



                <div style={{paddingLeft:"2%", width: 1600, height: 120, cursor: 'pointer'}} onMouseDown={myMouseDown} onMouseMove={mouseMove}>

                    {dataForCharts.map((oneChart,i)=>
                        <div key={i} style={{width: "100%", height:"100%", display:"flex", paddingTop:"1%"}}>

                            <div style={{width: "7%", margin: "auto"}}>
                                {oneChart.label}
                            </div>

                            <div style={{width: "4%", height:"100%", textAlign: "right",  fontSize:" 72%"}}>
                                {[...Array(chartGridLines)].map((x,index2)=>{
                                    return (<div key={index2}>{(Math.min(...oneChart.data)+index2*((Math.max(...oneChart.data)-Math.min(...oneChart.data))/(chartGridLines-1))).toString().slice(0, 8)}</div>)
                                })}


                            </div>

                            <div style={{width: "88%", height:"100%"}}>
                                <Chart
                                    key={i}
                                    dataForCharts={oneChart}
                                />
                            </div>


                        </div>
                    )}


                    <div style={{width: "100%", height: "100%", display:"flex"}}>

                        <div style={{width: "12%", height: "100%"}}>
                            {dataForCharts[0]&&[...Array(1)].map((x,index)=>{

                                let tmpDate = new Date(startData)

                                if(index==0){
                                    if (dataForCharts[0].offset == 0) {

                                        return (<div key={index}>
                                            {tmpDate.toLocaleString('en-GB', { timeZone: 'UTC' })}
                                        </div>)
                                    }else {
                                        tmpDate.setSeconds(tmpDate.getSeconds() + dataForCharts[0].offset);

                                        return (<div key={index}>
                                            {tmpDate.toLocaleString('en-GB', { timeZone: 'UTC' })}
                                        </div>)
                                    }
                                }

                            })}


                        </div>


                        <div style={{width: "89%", height:"100%"}}>


                            <div style={{width: "100%", display:"flex", justifyContent:"space-between", fontSize:"72%", marginLeft:"4px"}}>
                                {dataForCharts[0]&&[...Array(dataForCharts[0].data.length)].map((x,index)=>{

                                    let tmpRate=dataForCharts[0].data.length/dataForCharts[0].limit

                                    let tmpLable=Math.floor(((index%tmpRate)/tmpRate)*100)/100
                                    tmpLable=tmpLable+(index-index%tmpRate)/tmpRate

                                      return (<div key={index}>
                                        {dataForCharts[0].offset+tmpLable}
                                    </div>)
                                })}
                            </div>
                        </div>
                    </div>







                    {showPreloader && <PreloaderV2 color="#00BFFF" height={80} width={80}  />}
                </div>



            </div>

    );
}


export default App;
