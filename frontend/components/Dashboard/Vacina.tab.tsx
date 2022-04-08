import * as React from 'react';
import ReactECharts from 'echarts-for-react';
import { Box, Tab, Tabs, Typography } from '@mui/material';
import { BarCircle } from './Charts';


export function VacinaTab({ doses = [], estoque = [] }: any) {

  const estoqueVacina = {
    color: ['#3CAFA4', '#F5A067'],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      bottom: '0'
    },
    grid: {
      left: '2%',
      bottom: '12%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        data: estoque.map((d: any) => d.ds_dose),
        alignTicks: true,
        axisLabel: {
          width: 100,
          overflow: 'truncate',
          interval: 0,
        },
      }
    ],
    yAxis: [
      {
        type: 'value',
        axisLabel: {
          formatter: "{value} %"
        }
      }
    ],
    series: [
      {
        name: 'Quantidade disponível',
        type: 'bar',
        stack: 'Ad',
        emphasis: {
          focus: 'series'
        },
        data: estoque.map((d: any) => d.quantidade_estoque),
        barWidth: '30%',
      },
      {
        name: 'Quantidade aplicada',
        type: 'bar',
        stack: 'Ad',
        emphasis: {
          focus: 'series'
        },
        data: estoque.map((d: any) => d.quantidade_aplicada),
        itemStyle: {
          borderRadius: [5, 5, 0, 0]
        }
      },
    ]
  };

  const [selected, setSelected] = React.useState(1);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelected(newValue);
  };

  return (
    <Box sx={{
      background: "#FFFFFF",
      borderRadius: "20px",
      padding: "0 20px"
    }}>
      <Box sx={{
        padding: "30px 0 "
      }}>
        <Tabs
          value={selected}
          onChange={handleChange}
        >
          <Tab style={{ width: '50%' }} value={1} label="População acima de 12 anos" />
          <Tab style={{ width: '50%' }} value={2} label="população geral" />
        </Tabs>
        <Box sx={{
          width: "100%",
          marginTop: 5
        }}>
          <Typography variant="body1" sx={{
            fontFamily: 'Roboto',
            fontStyle: 'normal',
            fontWeight: '400',
            fontSize: '16px',
            lineHeight: '24px',
            color: '#000000',
          }}>
            Doses Aplicadas
          </Typography>
          <BarCircle data={doses} />
        </Box>

        <Box>
          <Typography variant="body1" sx={{
            fontFamily: 'Roboto',
            fontStyle: 'normal',
            fontWeight: '400',
            fontSize: '16px',
            lineHeight: '24px',
            color: '#000000',
            marginTop: 10
          }}>
            Estoques de Vacina
          </Typography>
          <ReactECharts option={estoqueVacina} />
        </Box>

      </Box>

    </Box>
  )
}