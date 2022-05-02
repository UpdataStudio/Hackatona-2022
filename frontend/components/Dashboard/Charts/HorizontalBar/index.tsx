import ReactECharts from 'echarts-for-react';

export function HorizontalBar ({data}: any) {
    return (
        <ReactECharts option={data} />
    )
}