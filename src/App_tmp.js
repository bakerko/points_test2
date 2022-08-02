

import {Button, Row, Col} from "react-bootstrap";
import React, {useEffect, useState} from 'react';
import fileDataStore from './store/FileDataStore'

import Chart from './components/Chart'
import {useDispatch, useSelector} from "react-redux";

import {fetchChannel} from "./asyncActions/loadChannel";
import Preloader from "./components/Preloader"
import {dropChartData} from "./reducers/fileDataReducer";


function App() {

    const dispatch = useDispatch()
    const agregationsMultipliers = useSelector(state=>state.api.agregationsMultipliers)
    const dataForCharts = useSelector(state=>state.api.dataForCharts)
    const channelsNumber = useSelector(state=>state.api.channelsNumber)

    const showPoints = useSelector(state=>state.api.showPoints)


    const [offset, setOffset] = useState(0);

    const [loadingChannel, setLoadingChannel] = useState(false);
    const [showPreloader, setShowPreloader] = useState(true);

    const [aggregation, setAggregation] = useState(0);

    const [mouseDown, setMouseDown] = useState(0);
    const [mouseMoveStartX, setmouseMoveStartX] = useState(0);

    const minimumShift=5; //percents
    const chartWidth=1600;


    useEffect(() => {

        if(!loadingChannel){
            setLoadingChannel(true)

            console.log("o_O-->showPreloader = "+showPreloader)

            loadAllChannels(agregationsMultipliers[aggregation], channelsNumber, offset, showPoints/agregationsMultipliers[aggregation])
        }

        if(dataForCharts.length==channelsNumber){
            setShowPreloader(false)
        }


    }, [dataForCharts])


    function loadAllChannels(agregation, channelsNumber, offset,  limit) {
        for(let channel=0;channel<channelsNumber;channel++) {

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

    }, [aggregation])


    useEffect(() => {
        if(loadingChannel) {
            dispatch(dropChartData([]))
            setLoadingChannel(false)
            setShowPreloader(true)
        }

        console.log("o_O --> offset = "+offset)

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

            let tmpPercentShift = shiftByChartWidth*100;
            let shiftCount = Math.ceil(Math.abs(showPoints/agregationsMultipliers[aggregation]*shiftByChartWidth))

            shiftCount=4;

            if(Math.abs(shiftByChartWidth*100)>=minimumShift)
                console.log("make shift = "+shiftCount)

                if(delta>0){
                    setmouseMoveStartX(curX)
                    shiftLeftMore(shiftCount)
                }else{
                    setmouseMoveStartX(curX)
                    shiftRightMore(shiftCount)
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



    return (

            <div className="App" onMouseUp={myMouseUp}>


                <Row className="d-flex">
                    <Col md={3}>


                        <Button  className='m-2' onClick={changeScaleDown}>
                            +
                        </Button>

                        <Button className='m-2' onClick={changeScaleUp}>
                            -
                        </Button>

                        <div  className='m-2'>
                            {`Agregation ${aggregation}`}
                        </div>

                    </Col>
                </Row>


                <div style={{width: 1600, height: 800, cursor: 'pointer'}} onMouseDown={myMouseDown} onMouseMove={mouseMove}>

                    <Chart
                        dataForCharts={dataForCharts}
                    />
                    {showPreloader && <Preloader color="#00BFFF" height={80} width={80}  />}
                </div>



            </div>

    );
}


export default App;
