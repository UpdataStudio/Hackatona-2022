import ReactECharts from 'echarts-for-react';
import { Box, Typography } from "@mui/material";
import Image from "next/image";

import up from "@/public/lineChartMini/chartlongup.svg";
import down from "@/public/lineChartMini/chartlongdown.svg";

import { DataMiniGraph, HorizontalBar, LineMini, SingleBarCircle } from './Charts';
import { PositiveNegative } from './PositiveNegative';

export function ObitoTab() {    
    const novosCasos = {
        nome: "Novos Casos",
        valor: "2.630",
        porcentagem: "+15%"
    }
    const totalDeCasos = {
        nome: "Total de Casos",
        valor: "538.354",
        porcentagem: "-5%"
    }

    const recuperadosAtivos = {
        tooltip: {
            trigger: 'item'
        },
        color: ['#3B00ED', '#D81B60'],
        legend: {
            bottom: '0',
            left: 'center'
        },
        series: [
            {
                type: 'pie',
                radius: ['40%', '50%'],
                avoidLabelOverlap: false,
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: false,
                        fontSize: '40',
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                data: [
                    { value: 1048, name: 'Recuperados' },
                    { value: 300, name: 'Ativos' }
                ]
            }
        ]
    }

    const percentualComordidadeObitos = {
        dataset: {
            source: [
                {
                    label: 'mon',
                    value: 4
                },
                {
                    label: 'tue',
                    value: 4
                },
                {
                    label: 'wed',
                    value: 4
                }]
        },
        xAxis: {
            type: 'value'
        },
        yAxis: {
            type: 'category'
        },
        series: [
            {
                type: 'bar'
            }
        ]
    }

    return (
        <>
            <Box sx={{
                padding: "30px 0",
                background: "#FFFFFF",
                borderRadius: "20px",
                width: "100%",
                marginBottom: "40px"
            }}>
                <Box sx={{
                    display: "flex",
                    width: "100%"
                }}>
                    <DataMiniGraph />
                </Box>

                <Box sx={{
                    width: "100%",
                    display: 'flex',
                    padding: '20px'
                }}>
                    <PositiveNegative />
                </Box>

                <Box sx={{
                    width: "100%"
                }}>
                    <SingleBarCircle />
                </Box>

                <Box sx={{
                    width: "100%"
                }}>
                    <HorizontalBar />
                </Box>
            </Box>
        </>
    )
}
