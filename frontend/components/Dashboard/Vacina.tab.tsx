import * as React from 'react';
import ReactECharts, { EChartsOption } from 'echarts-for-react';
import { Box, Tab, Tabs, Typography } from '@mui/material';
import { BarCircle } from './Charts';
import { Loading } from '../UI';
import { apiServerLocal } from '@/services/api';
import { format } from '@/utils/NumberUtil';

export function VacinaTab({ params, onChangeFilter }: any) {
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState({ dosesData: [], estoqueData: [] });
  const [acima12Anos, setAcima12Anos] = React.useState<'Sim' | 'Não'>('Sim');

  React.useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const filters = { ...params, acima_12_anos: acima12Anos };
      const { data } = await apiServerLocal.get(`/api/dashboard/vacina`, { params: filters });
      setData(data);
      setLoading(false);
    };
    getData();
  }, [params, acima12Anos]);

  React.useEffect(() => {
    onChangeFilter({ acima_12_anos: acima12Anos });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [acima12Anos]);

  const estoqueVacina: EChartsOption = {
    color: ['#3CAFA4', '#F5A067'],
    tooltip: {
      trigger: 'item',
      formatter: (params: any) => {
        if (params.color === '#3CAFA4') {
          return (
            `<div>
              <h3>${params.name}</h3>
              <p>${params.marker} Quantidade disponível: <b>${format({ value: params.data.quantidade_estoque })}</b></p>
              <p>${params.marker} Porcentagem disponível: <b>${format({ value: params.data.porcentagem_estoque, precision: 2 })}%</b></p>
            </div>`.trim()
          );
        }

        return (
          `<div>
            <h3>${params.name}</h3>
            <p>${params.marker} Quantidade aplicada: <b>${format({ value: params.data.quantidade_aplicada })}</b></p>
            <p>${params.marker} Porcentagem aplicada: <b>${format({ value: params.data.porcentagem_aplicada, precision: 2 })}%</b></p>
          </div>`.trim()
        );
      },
      axisPointer: {
        type: 'shadow',
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
          formatter: "{value}%"
        },
        max: 100,
      }
    ],
    dataset: {
      source: data.estoqueData.map((d: any) => ({
        dose: d.ds_dose,
        porcentagem_estoque: d.porcentagem_estoque,
        porcentagem_aplicada: d.porcentagem_aplicada,
        quantidade_estoque: d.quantidade_estoque,
        quantidade_aplicada: d.quantidade_aplicada,
      }))
    },
    series: [
      {
        name: 'Quantidade disponível',
        type: 'bar',
        stack: 'Ad',
        emphasis: {
          focus: 'series'
        },
        barWidth: '30%',
      },
      {
        name: 'Quantidade aplicada',
        type: 'bar',
        stack: 'Ad',
        emphasis: {
          focus: 'series'
        },
        itemStyle: {
          borderRadius: [5, 5, 0, 0]
        }
      },
    ]
  };

  const handleChange = (event: React.SyntheticEvent, newValue: 'Sim' | 'Não') => {
    setAcima12Anos(newValue);
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
        <Tabs value={acima12Anos} onChange={handleChange}>
          <Tab style={{ width: '50%' }} value="Sim" label="População acima de 12 anos" />
          <Tab style={{ width: '50%' }} value="Não" label="população geral" />
        </Tabs>
        {
          loading
            ? <Loading />
            : <>
              <Box sx={{ width: "100%", marginTop: 5 }}>
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
                <BarCircle data={data.dosesData} name={'Doses Aplicadas'} />
              </Box>

              <Box>
                <Typography variant="body1" sx={{
                  fontFamily: 'Roboto',
                  fontStyle: 'normal',
                  fontWeight: '400',
                  fontSize: '16px',
                  lineHeight: '24px',
                  color: '#000000',
                  marginTop: 5,
                }}>
                  Estoques de Vacina
                </Typography>
                <ReactECharts option={estoqueVacina} style={{ height: 250 }} />
              </Box>

            </>
        }

      </Box>

    </Box>
  )
}
