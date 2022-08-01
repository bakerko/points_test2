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

//import {getSignal, getRoot} from '../http/fileDataApi'


const Chart_test = () => {

    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
    );

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
            legend: {
                display: false,
                labels: {
                    usePointStyle: true,
                },
            },

            title: {
                display: true,
                text: 'Charts',
            },
        },

        scales: {
            y: {
                max:11,
                min:0
            }
        },

    };



    const [data, setData] = useState(null);

    /*
    useEffect(() => {

        console.log('o_O chart refresh')

        let datasets=[];

        let yShift=1;
        for(let i=0; i<5;i++) {

            if (typeof dataForCharts[i] !== 'undefined') {

                let tmp_mas = []
                dataForCharts[i].map((y) => {
                    tmp_mas.push(y + 2 * yShift)
                })



                datasets.push(
                    {
                        label: '.',
                        data: tmp_mas,
                        borderColor: colors[yShift-1],
                        backgroundColor: 'rgba(255, 99, 132, 0.5)',
                        pointRadius: 0,
                    }
                )

                //console.log(datasets)
            }

            yShift++
        }

        const data = {
            labels: agrIndexes,
            datasets: datasets,
         };

        setData(data)

    }, [dataForCharts, agrIndexes]);
*/

/*
    getRoot().then((tmpData)=>{

        console.log('then')
        console.log(tmpData)
    })
*/
    /*
    console.log('start')
    getSignal().then((tmpData)=>{

        console.log('then')
        console.log(tmpData)
    })
    console.log('after')*/



    return data ? (
        <Line

            options={options}
            data={data}
        />
    ) : null;

};

export default Chart_test;