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




const ChartAxeX = ({
                   dataForCharts,
                   startData
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


    const colors=[
        'rgb(255, 50, 50)',
        'rgb(99, 250, 132)',
        'rgb(130, 99, 250)',
        'rgb(130, 250, 250)',
        'rgb(250, 250, 100)'

    ]

    const options = {
        //responsive: true,
        maintainAspectRatio: false,
        animation: {
            duration: 0
        },

        scales: {
            x: {
                //display:false,
                /*
                ticks:{
                    display:false,
                }*/
            },
            y: {
                display:false,
                /*
                ticks:{
                    display:false,
                }*/
            }
        },

        plugins: {



            legend: {
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

        if(!dataForCharts)return

        let tmpDate = new Date(startData)

        let lablesArray=[]
        if(dataForCharts){
            let labelOffset=dataForCharts.offset
            let rate = dataForCharts.sample_rate

            dataForCharts.data.map((item, i)=>{

                if(i==0) {

                    if (labelOffset == 0) {
                        lablesArray.push(tmpDate.toLocaleString('en-GB', { timeZone: 'UTC' }))
                    }else {
                        tmpDate.setSeconds(tmpDate.getSeconds() + labelOffset);
                        lablesArray.push(tmpDate.toLocaleString('en-GB', { timeZone: 'UTC' }))
                    }

                    return

                    //lablesArray.push(0)
                }

                let tmpLable=Math.floor(((i%rate)/rate)*100)/100
                tmpLable=tmpLable+(i-i%rate)/rate

                lablesArray.push(tmpLable+labelOffset)

            })
        }


        let datasets=[];

        let yShift=0;
        let local_counter=0

        let tmp_line = []



        if(dataForCharts.data.length>0)
        dataForCharts.data.map((item, index)=> {
            tmp_line.push(0)
        })

        datasets.push(
            {
                label: dataForCharts.label,
                data: tmp_line,
                borderColor: colors[yShift-1],
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                pointRadius: 1,
            }
        )

        const data = {
            labels: lablesArray,
            datasets: datasets,
         };

        //console.log("--data--")
        //console.log(data)

        setData(data)

    }, [dataForCharts, startData]);//, agrIndexes




    return data ? (
        <Line

            options={options}
            data={data}
        />
    ) : null;

};

export default ChartAxeX;