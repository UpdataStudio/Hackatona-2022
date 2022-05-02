import ReactECharts from 'echarts-for-react';


export function Timeline({ data = [], color }: any) {
    const option = {
        dataset: {
            source: data
        },
        tooltip: {},
        color,
        grid: {
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
        },
        xAxis: {
            type: 'category',
            show: false
        },
        yAxis: {
            type: 'value',
            show: false
        },
        series: [
            {
                type: 'line',
                symbolSize: 0
            }
        ]
    };
    return (
        <ReactECharts option={option} style={{ height: 50 }} />
    )
}