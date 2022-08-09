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




const ChartAxeY = ({
                   dataForCharts

               }) => {


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

    console.log("----------")
    console.log("channel = "+dataForCharts.channel)
    console.log("label = "+dataForCharts.label)
    console.log("min = "+Math.min(...dataForCharts.data))
    console.log("min = "+Math.max(...dataForCharts.data))

    let tmpDelta=Math.max(...dataForCharts.data)-Math.min(...dataForCharts.data)
    console.log("delta = "+tmpDelta)
    console.log("delta/5 = "+tmpDelta/5)
    console.log("data = "+dataForCharts.data)




    const options = {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
            duration: 0
        },

        scales: {
            x: {

                display:false,

                ticks:{
                    display:false,
                },
                grid:{
                    drawTicks:false
                }
            },
            y: {
                stacked: false,
                min: Math.min(...dataForCharts.data),
                max: Math.max(...dataForCharts.data),
                ticks:{
                    display:true,

                    stepSize: (Math.max(...dataForCharts.data)-Math.min(...dataForCharts.data))/5,
                    maxTicksLimit: 10,

                    //steps:5,
                },
                grid:{
                    drawTicks:false,
                    offset:false
                }
            }
        },

        plugins: {

            legend: {
                position: "left",
                align: "center",
                display: false
            },

            title: {
                display: false,
                text: 'Charts',
            },


        },


    };

    /*
    console.log("--->dataForCharts<---")
    console.log(dataForCharts)
*/

    const [data, setData] = useState(null);



    useEffect(() => {

        let datasets=[];

        let yShift=0;
        let local_counter=0

        let tmp_indexes = [0]
        //let tmp_indexes = []

/*
        if(dataForCharts.data.length>0)
            dataForCharts.data.map((item, index)=> {
                tmp_indexes.push(0)
            })*/

        let tmp_data = [dataForCharts.physical_max, dataForCharts.physical_min]



        datasets.push(
            {
                label: dataForCharts.label,
                data: dataForCharts.data,
                borderColor: 'rgba(0, 0, 0, 0)',
                backgroundColor: 'rgba(255, 255, 255, 1)',
                pointRadius: 1,

            }
        )

        const data = {
            labels: tmp_indexes,
            //datasets: tmp_data,

            datasets: datasets,
         };

        //console.log("--data--")
        //console.log(data)

        setData(data)

    }, [dataForCharts]);//, agrIndexes




    return data ? (
        <Line

            options={options}
            data={data}
        />
    ) : null;

};

export default ChartAxeY;