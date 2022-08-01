

import {Button, Row, Col} from "react-bootstrap";
import React, {useEffect, useState} from 'react';
import fileDataStore from './store/FileDataStore'

import Chart from './components/Chart'
import {useDispatch, useSelector} from "react-redux";

import {fetchChannel} from "./asyncActions/loadChannel";
import Preloader from "./components/Preloader";
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


    useEffect(() => {

        if(!loadingChannel){
            setLoadingChannel(true)
            console.log("offset = "+offset)



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

        console.log("aggregation = "+aggregation)

    }, [aggregation])


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


    return (

            <div className="App" >


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


                <div style={{width: 1600, height: 800, cursor: 'pointer'}}>





                    <Chart
                        dataForCharts={dataForCharts}
                    />

                    {showPreloader && <Preloader color="#00BFFF" height={80} width={80}  />}
                </div>



            </div>

    );
}


export default App;
