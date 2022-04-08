import ReactECharts from 'echarts-for-react';

export function SingleBarCircle () {
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
    return (
        <ReactECharts option={recuperadosAtivos} />
    )
}