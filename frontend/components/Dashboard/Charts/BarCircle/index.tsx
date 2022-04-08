import ReactECharts from 'echarts-for-react';
import { Box } from '@mui/material';

import primeiraDose from '@/public/1_dose.svg';
import { BarCircleLegend } from "./legend";

export function BarCircle({ data = [] }: any) {
    const doseAplicada = {
        color: ['#85DCCC', '#439B8B', '#1D6D5F'],
        polar: {
            radius: [20, '70%']
        },
        angleAxis: {
            max: 1,
            startAngle: 90,
            show: false
        },
        radiusAxis: {
            type: 'category',
            data: data.map((d: any) => d.ds_dose),
            show: false
        },
        tooltip: {},
        series: {
            type: 'bar',
            colorBy: 'data',
            data: data.map((d: any) => parseFloat(d.percentual).toFixed(2)),
            coordinateSystem: 'polar',
            label: {
                show: false
            },
            showBackground: true,
            backgroundStyle: {
                color: 'rgba(180, 180, 180, 0.2)'
            }
        }
    };

    return (
        <>
            <ReactECharts option={doseAplicada} />
            <Box sx={{
                alignItems: 'flex-end',
                display: "flex",
                justifyContent: 'space-around',
                width: '100%'
            }}>
                {
                    data.map((d: any, i: number) => (
                        <BarCircleLegend
                            key={i}
                            label={d.ds_dose}
                            value={`${parseFloat(d.percentual).toFixed(2)}%`}
                            img={primeiraDose} />
                    ))
                }
            </Box>
        </>
    );
}