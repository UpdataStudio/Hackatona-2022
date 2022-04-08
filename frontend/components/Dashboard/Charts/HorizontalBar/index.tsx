import ReactECharts from 'echarts-for-react';

export function HorizontalBar () {
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
        <ReactECharts option={percentualComordidadeObitos} />
    )
}