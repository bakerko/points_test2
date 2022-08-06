import React, {useState, useEffect } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

import { Line } from 'react-chartjs-2';




const Chart = ({
                   dataForCharts
               }) => {


    /*    console.log('fileAgr1000Data = '+fileAgr1000Data.data)
        console.log('fileAgr2000Data = '+fileAgr2000Data.data)*/

/*
    console.log('dataForCharts')
    console.log(dataForCharts)
*/

    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
    );

    const agrIndexes=[]

    const colors=[
        'rgb(255, 50, 50)',
        'rgb(99, 250, 132)',
        'rgb(130, 99, 250)',
        'rgb(130, 250, 250)',
        'rgb(250, 250, 100)'

    ]

    const options = {
        responsive: true,
        animation: {
            duration: 0
        },
        plugins: {
            /*
            legend: {
                display: false,
                labels: {
                    usePointStyle: true,
                },
            },*/

            title: {
                display: true,
                text: 'Charts',
            },
        },

        /*
        scales: {
            y: {
                max:11,
                min:0
            }
        },
*/
    };



    const [data, setData] = useState(null);



    function getNewCoords(min, max, newBase, coordsArray){

        let delta = max - min

        //console.log("delta = "+delta)

        let tmpArray = coordsArray.map((item, index)=>{


            let tmpCoord = item-min


            tmpCoord = tmpCoord*100/delta

            tmpCoord = newBase*tmpCoord/100

            return tmpCoord
        })

        //console.log(tmpArray);

        return tmpArray

    }


    useEffect(() => {
        if(dataForCharts.length<=1)return;


        //sort dataForCharts
        let sortedCharts=[]
        dataForCharts.map((item,i)=>{
            sortedCharts[item.channel]=item
        })

        let lablesArray=[]
        if(dataForCharts[0]){
            let labelOffset=dataForCharts[0].offset
            let rate = dataForCharts[0].sample_rate

            dataForCharts[0].data.map((item, i)=>{
                //let tmpI=i+1

                let tmpLable=Math.floor(((i%rate)/rate)*100)/100
                tmpLable=tmpLable+(i-i%rate)/rate

                lablesArray.push(tmpLable+labelOffset)

            })
        }



        //console.log('o_O chart refresh')

        let datasets=[];

        let yShift=0;
        let local_counter=0

        let tmp_indexes = []

        /*
        console.log("dataForCharts.length")
        console.log(dataForCharts.length)
        console.log(dataForCharts)
*/

        if(sortedCharts.length>0)
            sortedCharts.map((item, index)=> {

                //console.log("shift y  = ")
                //console.log(yShift*2)


                tmp_indexes=[]

                local_counter=0

                let tmp_mas = getNewCoords(item.physical_min, item.physical_max,2 ,item.data)

                tmp_mas = tmp_mas.map((y) => {
                    local_counter++
                    tmp_indexes.push(local_counter)

                    return y+yShift*2
                })

                datasets.push(
                    {
                        label: item.label,
                        data: tmp_mas,
                        borderColor: colors[yShift-1],
                        backgroundColor: 'rgba(255, 99, 132, 0.5)',
                        pointRadius: 1,
                    }
                )


                //console.log(datasets)


            yShift++
        })

        const data = {
            labels: lablesArray,
            datasets: datasets,
         };

        setData(data)

    }, [dataForCharts]);//, agrIndexes




    return data ? (
        <Line

            options={options}
            data={data}
        />
    ) : null;

};

export default Chart;