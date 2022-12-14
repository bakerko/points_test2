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
        maintainAspectRatio: false,

        animation: {
            duration: 0
        },

        scales: {
            x: {
                //display:false,
                stacked: false,
                ticks:{
                    display:false,
                },
                grid:{
                    drawTicks:false,
                }
            },
            y: {
                min: Math.min(...dataForCharts.data),
                max: Math.max(...dataForCharts.data),
                display:true,

                stacked: false,
                ticks:{
                    display:false,

                    stepSize: (Math.max(...dataForCharts.data)-Math.min(...dataForCharts.data))/5,
                    maxTicksLimit: 7,

                    //steps:5,

                },
                grid:{
                    drawTicks:false,
                    //offset:false,
                    //drawBorder:false

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
        //if(dataForCharts.length<=1)return;


        let datasets=[];

        let yShift=0;
        let local_counter=0

        let tmp_indexes = []



        if(dataForCharts.data.length>0)
        dataForCharts.data.map((item, index)=> {
            tmp_indexes.push(index)
        })

        datasets.push(
            {
                label: dataForCharts.label,
                data: dataForCharts.data,
                borderColor: colors[yShift-1],
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                pointRadius: 1,

            }
        )

        const data = {
            labels: tmp_indexes,
            datasets: datasets,
         };

        /*
        if(dataForCharts.channel==16)
            console.log(dataForCharts.data)
        */

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

export default Chart;