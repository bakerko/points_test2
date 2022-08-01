import {
    getSignalNewBack,
    getCountRows
} from '../src/http/fileDataApi'



import {Button, Row, Col} from "react-bootstrap";
import React, {useState, useEffect } from 'react';
import Chart from './components/Chart'

import Chart_test from './components/Chart_test'

import Preloader from './components/Preloader'
import {useDispatch, useSelector} from "react-redux";

import {setCount} from "./reducers/fileDataReducer";
import {getCountItems} from "./actions/fileData";
import Chart_test2 from "./components/Chart_test2"


function App() {




    const [fileData, setFileData] = useState(0);

    const [channel, setChannel] = useState(1);

    const [showPreloader, setShowPreloader] = useState(false);
    const [dataLoaded, setDataLoaded] = useState(false);

    const [mouseDown, setMouseDown] = useState(0);
    const [mouseMoveStartX, setmouseMoveStartX] = useState(0);

    const shiftMultiplier=[  //from helper
        100, 125, 200, 250, 400, 500, 1000
    ]

    const channelMass = [
        0,1,2,3,4,5,6
    ]

    const channelsCount=5;//load in helper


    /*network
    const channelMass = [
        1,2,3,4,5
    ]
*/

    ///////////////////for test

    const [movesCount, setMovesCount] = useState(0);

    //////////////////////////////

    const maxScale=shiftMultiplier.length; //from helper

    const mouseMoveShift=4;
    const chartWidth=1600;
    const [pointsNumber, setPointsNumber] = useState(400);

    //const mouseMoveShiftPixels=(chartWidth/pointsNumber)*mouseMoveShift;//chart_width/pointsNumber * mouseMoveShift

    const mouseMoveShiftPixels=16;//chart_width/pointsNumber * mouseMoveShift

    const [agrCount, setAgrCount] = useState([]);

    const [agrIndexes, setAgrIndexes] = useState([]);


/////////full current layer/ all points
    const [agrPointsMass, setAgrPointsMass] = useState([
        []
    ])

    const [agrIndexesMass, setAgrIndexesMass] = useState([
        []
    ])

    const [isLayerLoading, setIsLayerLoading] = useState(false)
    const [isLayerLoaded, setIsLayerLoaded] = useState([])

    const [layerFirstFrame, setLayerFirstFrame] = useState([])
    const [layerFirstFrameIndexes, setLayerFirstFrameIndexes] = useState([])

    const [isFrameLoading, setIsFrameLoading] = useState(false)

    const [isLayerFirstShow, setIsLayerFirstShow] = useState([])

////////////////////////


    const [dataForCharts, setDataForCharts] = useState([
            [
                [],
                []
            ]
        ]
    );

    const [scale, setScale] = useState(0);

    const [shift, setShift] = useState(0);
    const [maxShift, setMaxShift] = useState(0);



    useEffect(() => {

       // console.log('dataLoaded =' + dataLoaded)
        if(!dataLoaded)
            getStart();
    });

    //load from database
    //load from local Array




    const getData = async (tmpScale=0, curShift=0) => {



        if(isLayerFirstShow[tmpScale] === undefined){

            if(layerFirstFrame[tmpScale]!==undefined){

                console.log('o_O from preload')

                setAgrIndexes(layerFirstFrameIndexes[tmpScale])
                setDataForCharts(layerFirstFrame[tmpScale])

                let tmpMass = []
                tmpMass[tmpScale]=true

                setIsLayerFirstShow(tmpMass)

                preloadLayer(tmpScale)
                return
            }
        }


        if(isLayerLoading){
            await getDataDB(tmpScale, curShift)
            return;
        }

        if(isLayerLoaded[tmpScale]===true){

            getDataFromPreload(tmpScale, curShift)

        }else{


            ///////////first loading somewhere here

            //console.log('--->first loading somewhere here')


            getDataDB(tmpScale, curShift)

            //preloadLayer(tmpScale)

            //getDataDBFirstFrame(tmpScale+1, curShift)//no first frame yet


        }

    }

    const getDataFromPreload = (tmpScale, curShift)=>{
        let tmpDataForCharts = dataForCharts;
        let loadReady=0;

        let tmpAgrIndexes = agrIndexesMass[tmpScale].slice(curShift, curShift+pointsNumber)
        setAgrIndexes(tmpAgrIndexes)
        loadReady++

        for(let curChannel=0;curChannel<channelsCount;curChannel++){

            let tmpArray = agrPointsMass[tmpScale][channelMass[curChannel]].slice(curShift, curShift+pointsNumber)

            tmpDataForCharts[curChannel]=tmpArray;
            loadReady++;

            if(loadReady==channelsCount+1){

                console.log('--> tmpDataForCharts')
                console.log(tmpDataForCharts)

                setDataForCharts(tmpDataForCharts)
            }
        }
    }

    const preloadLayer = async (tmpScale)=>{

        setIsLayerLoading(true)

        let loadReady=0;

        /*
        let tmpAgrIndexesMass = agrIndexesMass;

        if(!tmpAgrIndexesMass[tmpScale])
            tmpAgrIndexesMass[tmpScale]=[];

        getAgrFunctions_indexes[tmpScale](agrCount[tmpScale], 0).then((tmpData)=>{

            tmpData.data.map((value) => {
                tmpAgrIndexesMass[tmpScale].push(value.id);
            })

            loadReady++;

            setAgrIndexesMass(tmpAgrIndexesMass)

        })
*/

        let tmpAgrPointsMass = agrPointsMass;

        if(!tmpAgrPointsMass[tmpScale])
            tmpAgrPointsMass[tmpScale]=[]

        for(let curChannel=0;curChannel<channelsCount;curChannel++){

            //las param not tmpScale but agregation
            getSignalNewBack(agrCount[tmpScale], 0, channelMass[curChannel], shiftMultiplier[tmpScale]).then((tmpData)=>{
                //console.log(tmpData.data)


                let oneChannelData = formChartArrays(tmpData.data)
                tmpAgrPointsMass[tmpScale][channelMass[curChannel]]=oneChannelData;
                loadReady++;

                //setShowPreloader(false);
                setAgrPointsMass(tmpAgrPointsMass)

                if(loadReady==channelsCount+1){
                    let tmpIsLayerLoaded = isLayerLoaded;
                    isLayerLoaded[tmpScale]=true
                    setIsLayerLoaded(isLayerLoaded)

                    setIsLayerLoading(false)

                    console.log('o_O layer loaded')
                }
            })
        }
    }



    //const getData = async (tmpScale=0, curShift=0) => {//just for one table at start
    const getDataDB = async (tmpScale=0, curShift=0) => {//just for one table at start

        //here i need to check do i have fully loaded layer in agrPointsMass[tmpScale]
        //agrCount[tmpScale] - number of points in agregation
        //and maybe im loading that data right now isLayerLoading

        if(showPreloader)return;

        setShowPreloader(true);

        let loadReady=0;
        let tmpShift=curShift

       //console.log('tmpShift = '+tmpShift)

        tmpShift = Math.ceil(tmpShift); //убрать в функцию которая это генерирует

        //console.log('tmpShift = '+tmpShift)

        let tmpDataForCharts = [];

        /*
        let tmpAgrIndexes=[]


        getAgrFunctions_indexes[tmpScale](pointsNumber, tmpShift).then((tmpData)=>{

            //console.log('pointsNumber = '+pointsNumber);
            //console.log(tmpData.data);


            tmpData.data.map((value) => {
                tmpAgrIndexes.push(value.id);
            })

            loadReady++;
            setAgrIndexes(tmpAgrIndexes)
        })
*/

        for(let curChannel=0;curChannel<channelsCount;curChannel++){

            /*
            console.log('--->curChannel = '+curChannel)

            console.log('--->pointsNumber = '+pointsNumber)
            console.log('--->tmpShift = '+tmpShift)
            console.log('--->channelMass[curChannel] = '+channelMass[curChannel])
            console.log('--->shiftMultiplier[tmpScale] = '+shiftMultiplier[tmpScale])

            console.log('--->tmpScale = '+tmpScale)
*/
            getSignalNewBack(pointsNumber, tmpShift, channelMass[curChannel], shiftMultiplier[tmpScale]).then((tmpData)=>{

                //console.log('tmpData')
                //console.log(tmpData)
                if(tmpData.data.data){
                    console.log('tmpData')
                }


                let oneChartData = formChartArrays(tmpData.data.data)

                /*
                console.log("oneChartData")
                console.log(oneChartData)
*/
                tmpDataForCharts[curChannel]=oneChartData;

                //console.log('tmpDataForCharts.length = '+tmpDataForCharts.length)

                //setDataForCharts([])


                loadReady++;
                setShowPreloader(false);

                //console.log("loadReady = "+loadReady)
                //console.log("channelsCount = "+channelsCount)

                if(loadReady==channelsCount){

                    console.log('--> tmpDataForCharts')
                    console.log(tmpDataForCharts)

                    setDataForCharts(tmpDataForCharts)
                }
            })



/*            let oneChartData = formChartArrays(tmpData.data.rows)
            tmpDataForCharts.push(oneChartData);*/

        }




    }



    const getDataDBFirstFrame = async (tmpScale=0, curShift=0) => {//just for one table at start

        if(isFrameLoading)
            return
        else
            setIsFrameLoading(true)


        if(tmpScale>maxScale)return


        let loadReady=0;
        let tmpShift=curShift

        tmpShift = Math.ceil(tmpShift); //убрать в функцию которая это генерирует


        let tmpDataForCharts = layerFirstFrame
        let tmpAgrIndexes=layerFirstFrameIndexes

        if(tmpDataForCharts[tmpScale]!==undefined)
            return
        else {
            tmpDataForCharts[tmpScale] = []
            tmpAgrIndexes[tmpScale] = []
        }

/*
        getAgrFunctions_indexes[tmpScale](pointsNumber, tmpShift).then((tmpData)=>{

            tmpData.data.map((value) => {
                tmpAgrIndexes[tmpScale].push(value.id);
            })

            loadReady++;
            setLayerFirstFrameIndexes(tmpAgrIndexes)
        })*/


        for(let curChannel=0;curChannel<channelsCount;curChannel++){


            getSignalNewBack(pointsNumber, tmpShift, channelMass[curChannel], shiftMultiplier[tmpScale]).then((tmpData)=>{

                let oneChartData = formChartArrays(tmpData.data)
                tmpDataForCharts[tmpScale][curChannel]=oneChartData;

                loadReady++;
                setShowPreloader(false);

                if(loadReady==channelsCount+1){

                    /*
                    console.log('--> tmpDataForCharts')
                    console.log(tmpDataForCharts[tmpScale])
                    console.log(tmpAgrIndexes[tmpScale])
*/
                    setLayerFirstFrame(tmpDataForCharts)
                    setIsFrameLoading(false)
                }
            })


        }
    }



    const getStartData = async () => {//get start shift


        if (shift !== 0) return 0

        let countRows= await getCountRows(channelMass[0])
        //countRows = countRows.data //they are not in data

        //console.log(countRows)

        let baseCount = 0
        if (countRows)
        if(agrCount.length===0){
            baseCount = countRows

            let tmpAgrMass=agrCount

            shiftMultiplier.map((value)=>{
                tmpAgrMass.push(Math.ceil(baseCount/value))
            })

            setAgrCount(tmpAgrMass)
        }
        return countRows

    }

    const getStart = async () => {//get start shift

        setDataLoaded(true)

        setShowPreloader(true);

        let tmpNumber = await getStartData();

        //console.log('tmpNumber = '+tmpNumber)

        let baseShift = (tmpNumber - pointsNumber) / 2 //baseCount always >= agrCount
        if(baseShift<0)baseShift=0

        setShift(baseShift)

        console.log()

        await getData(0, baseShift, channel);
    }

    const formChartArrays = (data) => {
        //let labelsArray = []
        let valuesArray = []

        if (data)
        data.map((oneData) => {


            /*
            if (oneData.origin_id) {
                labelsArray.push(oneData.origin_id)
                //labelsArray.push(0)//keys only for 1st chart
            }else {
                if(oneData.id)
                    labelsArray.push(oneData.id)
                else
                    labelsArray.push(0)
            }
*/
            //valuesArray.push(oneData.value)
            valuesArray.push(oneData)
        })
/*
        return [
            labelsArray,
            valuesArray
        ]
*/

        return valuesArray
    }

    const getBaseShift=()=>{
        let baseShift = (agrCount[scale] - pointsNumber) / 2 //baseCount always >= agrCount
        if(baseShift<0)baseShift=0

        return baseShift
    }

    const getShiftByScale=(tmpScale)=>{
        let baseShift = (agrCount[tmpScale] - pointsNumber) / 2 //baseCount always >= agrCount
        if(baseShift<0)baseShift=0

        return baseShift
    }

        const selectScale = async(event) => {
            let curValue = event.target.value
            setScale(curValue)

            let newShift = changeShiftWeight(curValue)
            await getData(Number(curValue), newShift, channel)

        }


    const changeScaleUp = async() => {
        if(showPreloader)return;

        let tmpScale=scale

        if(tmpScale+1<maxScale){
            tmpScale+=1
        }

        setScale(tmpScale)

        if(tmpScale!=scale){
            changeShiftWeight(tmpScale)
        }
    }



    useEffect(() => {
        //console.log('useEffect')

        if(dataLoaded)
            getData(scale, shift, channel);
    }, [scale])


    /* //some code
    const changeScaleUp = () => {

        console.log('changeScaleUp');
        setScale((prevState) => prevState+1<maxScale ? prevState + 1 : prevState);
        changeShiftWeight(scale);
    }

    const changeScaleDown = () => {
        console.log('changeScaleDown');
        setScale((prevState) => prevState-1>=0 ? prevState - 1 : prevState);
    }
*/

    const changeScaleDown = async() => {
        if(showPreloader)return;

        let tmpScale=scale

        if(tmpScale-1>=0){
            tmpScale-=1
        }

        setScale(tmpScale)

        let newShift = changeShiftWeight(tmpScale)

        if(tmpScale!=scale) {
            changeShiftWeight(tmpScale)
        }
    }

    const changeShiftWeight=(newScale)=>{

        let oldBaseShift = getBaseShift()
        let tmpShift = (shift-oldBaseShift)*shiftMultiplier[scale]

        if(shiftMultiplier[newScale])
            tmpShift=Math.ceil(tmpShift/shiftMultiplier[newScale])

        tmpShift = tmpShift+getShiftByScale(newScale)

        if(agrCount[newScale]<=pointsNumber) {
            tmpShift = getShiftByScale(newScale)
        }

        if(agrCount[newScale]>pointsNumber&&shift==0){
            tmpShift = getShiftByScale(newScale)
        }

        setShift(tmpShift)

        return tmpShift
    }


    const shiftLeft = async() => {
        shiftLeftMore(1)
    }

    const shiftRight = async() => {
        shiftRightMore(1)
    }


    const shiftLeftMore = async(toShift) => {
        let tmpShift=shift

        if(tmpShift-toShift>=0){

            tmpShift-=toShift
        }else{
            tmpShift=0;
        }
        setShift(tmpShift)

        if(tmpShift)
            if(tmpShift!=shift)
                await getData(scale, Number(tmpShift), channel)
    }


    const shiftRightMore = async(toShift) => {
        let tmpShift=shift

        if(tmpShift+toShift<agrCount[scale]-pointsNumber){
            tmpShift+=toShift
        }else{
            tmpShift=agrCount[scale]-pointsNumber-1

            if(tmpShift<0)tmpShift=0
        }

        setShift(tmpShift)

        if(typeof tmpShift !== undefined)
            if(tmpShift!=shift)
                await getData(scale, Number(tmpShift), channel)
    }


    const selectChannel = async(event) => {
        let curValue = event.target.value
        setChannel(curValue)

        await getData(scale, shift, curValue)
    }

    const zoom=(event)=> {

        //no zoom by mouse wheel by now
        /*
        //console.log('--zoom--')
        event.preventDefault();

        if (event.deltaY < 0) {
            changeScaleDown()
        }else{
            changeScaleUp()
        }
*/
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

        if(mouseDown){
            let curX = e.pageX;
            let delta = curX-mouseMoveStartX;
            let tmp = delta

                 //console.log('delta = '+delta)
            let shiftCount = Math.ceil(Math.abs(delta/mouseMoveShiftPixels))


            if(Math.abs(tmp)>=mouseMoveShiftPixels)
            if(delta>0){
                setmouseMoveStartX(curX)
                shiftLeftMore(mouseMoveShift*shiftCount)
            }else{
                setmouseMoveStartX(curX)
                shiftRightMore(mouseMoveShift*shiftCount)
            }
        }
    }

    /*
    const dispatch = useDispatch();
    const count = useSelector(state=>state.repos.countItems)

    const onCountClick=()=>{
        dispatch(getCountItems())
    }
*/
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
                                {`Agregation ${scale}`}
                            </div>

                            </Col>
                        </Row>


                <div style={{width: 1600, height: 800, cursor: 'pointer'}} onMouseDown={myMouseDown} onMouseMove={mouseMove}   onWheel = {zoom}>





                    <Chart
                        dataForCharts={dataForCharts}
                        agrIndexes={agrIndexes}

                    />

                    {showPreloader && <Preloader color="#00BFFF" height={80} width={80}  />}
                </div>



            </div>



        );
    }


export default App;
