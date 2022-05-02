import ReactECharts from 'echarts-for-react';

export function SingleBarCircle({ data }: any) {
    return (
        <ReactECharts option={data} />
    )
}