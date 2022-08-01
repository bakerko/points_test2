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




const Chart_test2 = ({dataForCharts}) => {


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
        plugins: {

            title: {
                display: true,
                text: 'Chart.js Line Chart',
            },
        },
    };


    const [data, setData] = useState(null);

    useEffect(() => {

        console.log('o_O chart refresh')

        let tmp_datasets=[
            204.46,
            -475.85,
            -455.3,
            229.18,
            425.78,
            -198.65,
            -590.13,
            -87.19,
            461.06,
            130.01,
            -521.74,
            -391.49,
            297.17,
            383.75,
            -276.42,
            -571.88,
            -1.17,
            472.76,
            51.01,
            -556.94,
 ]

        let tmp_counter=0;
        const labels = tmp_datasets.map(()=>{
            return tmp_counter++;

        })

        const data = {
            labels: labels,
            datasets: [
                    {
                        label: 'Dataset 1',
                        data: tmp_datasets,
                        borderColor: 'rgb(255, 99, 132)',
                        backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    },
                    {
                        label: 'Dataset 2',
                        data: tmp_datasets,
                        borderColor: 'rgb(53, 162, 235)',
                        backgroundColor: 'rgba(53, 162, 235, 0.5)',
                    },
                ],
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

export default Chart_test2;