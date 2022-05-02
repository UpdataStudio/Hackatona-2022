import ReactECharts from 'echarts-for-react';
import { Box } from '@mui/material';

import { BarCircleLegend } from "./legend";

export function BarCircle({ data = [], name = 'Series Name' }: any) {
    const colors = ['#85DCCC', '#439B8B', '#1D6D5F', '#084a3e'];

    const doseAplicada = {
        color: colors,
        dataset: {
            source: data.map((curr: { label: any; porcentagem: any; }) => ({ label: curr.label, value: curr.porcentagem }))
        },
        polar: {
            radius: [20, '70%']
        },
        angleAxis: {
            max: 100,
            startAngle: 90,
            show: false
        },
        radiusAxis: {
            type: 'category',
            show: false
        },
        tooltip: {
            formatter: (props: any) => {
                return `${props.marker} ${props.seriesName}<br/>
                        ${props.data.label}: ${props.data.value ? parseFloat(props.data.value).toFixed(2) : parseFloat(props.data.porcentagem).toFixed(2)}%`
            }
        },
        series: {
            name,
            type: 'bar',
            colorBy: 'data',
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
            <ReactECharts option={doseAplicada} style={{ height: 300 }} />
            <Box
                sx={{
                    alignItems: 'flex-end',
                    display: "flex",
                    justifyContent: 'space-around',
                    width: '100%'
                }}
            >
                {
                    data.map((d: any, i: number) => (
                        <BarCircleLegend
                            key={i}
                            label={d.label}
                            value={`${parseFloat(d.porcentagem).toFixed(2)}%`}
                            color={colors[i]}
                        />
                    ))
                }
            </Box>
        </>
    );
}