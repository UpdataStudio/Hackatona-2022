import React from 'react';
import ReactECharts from 'echarts-for-react';
import { Box, Typography } from "@mui/material";

import ManIcon from '@mui/icons-material/Man';
import WomanIcon from '@mui/icons-material/Woman';
import { Loading } from '../UI';

import { BarCircle, DataMiniGraph, HorizontalBar, LineMini, SingleBarCircle } from './Charts';
import { apiServerLocal } from '@/services/api';

import { format, addSignal } from 'utils/NumberUtil';

export function CasosTab({ params }: any) {
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState({
    porSituacaoData: [],
    porFaixaEtariaData: [],
    porSintomaData: {
      media_sintomas_leves: "",
      media_sintomas_graves: "",
      media_assintomaticos: "",
      variacao_sintomas_leves: "",
      variacao_sintomas_graves: "",
      variacao_assintomaticos: "",
    },
    porSexoData: [{
      percentual_homens: '0',
      percentual_mulheres: '0',
      total_homens: '0',
      total_mulheres: '0'
    }],
    vacinacaoData: [],
    mediasComordidadeData: [],
    comordidadeData: [],
    totalCasosPorDia: [],
    novosCasosPorDia: [],
    novosCasos: {
      valor: '',
      percentual_variacao: '',
    },
    totalCasos: {
      valor: '',
      percentual_variacao: '',
    },
  });

  React.useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const { data } = await apiServerLocal.get('/api/dashboard/casos', { params });

      setData(data);
      setLoading(false);
    };
    getData();
  }, [params]);

  const sintomasLeves = {
    nome: "Sintomas Leves",
    valor: `${format({
      value: data.porSintomaData.media_sintomas_leves,
      precision: 2,
    })}%`,
    porcentagem: addSignal(data.porSintomaData.variacao_sintomas_leves)
  };
  const sintomasGraves = {
    nome: "Sintomas Graves",
    valor: `${format({
      value: data.porSintomaData.media_sintomas_graves,
      precision: 2,
    })}%`,
    porcentagem: addSignal(data.porSintomaData.variacao_sintomas_graves)
  };
  const assintomaticos = {
    nome: "Assintomáticos",
    valor: `${format({
      value: data.porSintomaData.media_assintomaticos,
      precision: 2,
    })}%`,
    porcentagem: addSignal(data.porSintomaData.variacao_assintomaticos)
  };

  const faixaEtaria = {
    color: "#FF965D",
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow"
      }
    },
    title: {
      text: "Faixa Etária",
      textStyle: {
        color: '#000000',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: 18,
        fontFamily: 'Roboto',
        lineHeight: 24
      }
    },
    grid: {
      left: '0',
      height: '70%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: data.porFaixaEtariaData.map((d: any) => d.faixa_etaria),
      axisLabel: {
        width: 100,
        overflow: 'truncate',
        interval: 0,
        rotate: 50,
        color: 'rgba(0, 0, 0, 0.6)',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: 12,
        fontFamily: 'Roboto',
        lineHeight: 16
      },
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: data.porFaixaEtariaData.map((d: any) => d.total_casos),
        type: 'bar',
        barWidth: '45%',
        itemStyle: {
          borderRadius: [3, 3, 0, 0]
        }
      }
    ]
  };

  const qt_novos = {
    nome: "Novos Casos",
    valor: format({ value: data.novosCasos.valor }),
    porcentagem: addSignal(data.novosCasos.percentual_variacao)
  };
  const qt_total = {
    nome: "Total de Casos",
    valor: format({ value: data.totalCasos.valor }),
    porcentagem: addSignal(data.totalCasos.percentual_variacao)
  };

  const qt_novo = {
    qt_novos,
    qt_total,
    novos_por_dia: data.novosCasosPorDia,
    total_por_dia: data.totalCasosPorDia,
  };

  const percentualComordidadeObitos = {
    color: '#6200EE',
    tooltip: {
      trigger: 'item',
      formatter: (params: any) => `${format({ value: params.value.value, precision: 2 })}%`
    },
    grid: {
      left: '2%',
      bottom: '12%',
      containLabel: true
    },
    dataset: {
      source: data.comordidadeData.map((d: any) => ({
        label: d.comorbidade,
        value: parseFloat(d.percentual).toFixed(2)
      }))
    },
    xAxis: {
      max: 100,
      type: 'value',
      axisLabel: {
        formatter: "{value}%",
      }
    },
    yAxis: {
      type: 'category',
      axisLabel: {
        width: 200,
        overflow: 'break',
      }
    },
    series: [
      {
        name: 'Comorbidade',
        type: 'bar',
        label: {
          formatter: "{d}%",
        }
      }
    ]
  };

  const recuperadosAtivos = {
    tooltip: {
      trigger: 'item',
      formatter: (params: any) => {
        return `${params.name}<br/>
                Total: ${params.data.value}<br/>
                Porcentagem: ${params.percent}%`;
      }
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
        data: data.porSituacaoData.map((d: any) => ({
          name: d.situacao,
          value: d.valor
        }))
      }
    ]
  };

  return (
    loading
      ? <Loading />
      : <>
        <Box sx={{
          padding: "30px 0",
          background: "#FFFFFF",
          borderRadius: "20px",
          width: "100%",
          marginBottom: "40px"
        }}>
          <Box sx={{
            width: "100%"
          }}>

            <DataMiniGraph qt_data={qt_novo} />

            <SingleBarCircle data={recuperadosAtivos} />
          </Box>
        </Box>

        <Typography variant="h6" sx={{
          fontFamily: 'Roboto',
          fontStyle: "normal",
          fontWeight: "500",
          fontSize: "20px",
          lineHeight: "23px",
          display: "flex",
          alignItems: "center",
          color: "#3F434A",
          marginBottom: "20px",
          paddingLeft: "10px"
        }}>
          Perfil dos Pacientes
        </Typography>

        <Box sx={{
          padding: "30px 0 0 0",
          background: "#FFFFFF",
          borderRadius: "20px",
          width: "100%"
        }}>
          <Box sx={{
            display: "flex",
            width: "100%",
            padding: "0 10px",
            marginBottom: '10px',
            alignItems: 'flex-end'
          }}>
            <Box sx={{
              width: "100%",
              padding: "0 10px"
            }}>
              <LineMini dados={sintomasLeves} />
            </Box>
            <Box sx={{
              width: "100%",
              padding: "0 10px"
            }}>
              <LineMini dados={sintomasGraves} />
            </Box>
            <Box sx={{
              width: "100%",
              padding: "0 10px"
            }}>
              <LineMini dados={assintomaticos} />
            </Box>
          </Box>

          <Box sx={{
            width: "100%",
            padding: "15px",
            display: "flex"
          }}>

            <Box sx={{
              width: "30%",
              marginRight: "20px",
              paddingTop: '30px'
            }}>

              <Box sx={{
                width: "100%",
                background: "#59BEAC",
                borderRadius: "4px",
                padding: "0 15px",
                marginBottom: "5px"
              }}>
                <Typography variant="body1" sx={{
                  fontFamily: 'Roboto',
                  fontStyle: "normal",
                  fontWeight: "400",
                  fontSize: "14px",
                  lineHeight: "20px",
                  letterSpacing: "0.25px",
                  color: "#E9EEF5",
                  marginBottom: "5px"
                }}>
                  Homem
                  <ManIcon sx={{
                    position: "relative",
                    top: "6px",
                    right: "3px",
                    padding: "4px"
                  }} />
                </Typography>

                <Typography variant="body1" sx={{
                  fontFamily: 'Roboto',
                  fontStyle: "normal",
                  fontWeight: '500',
                  fontSize: '34px',
                  lineHeight: '36px',
                  color: '#E9EEF5',
                  marginBottom: '5px'
                }}>
                  {parseFloat(data.porSexoData[0].percentual_homens).toFixed(2)}%
                </Typography>

                <Typography variant="body1" sx={{
                  fontFamily: 'Roboto',
                  fontStyle: 'normal',
                  fontWeight: '400',
                  fontSize: '14px',
                  lineHeight: '20px',
                  letterSpacing: '0.25px',
                  color: '#E9EEF5',
                  paddingBottom: '5px'
                }}>
                  {data.porSexoData[0].total_homens}
                </Typography>
              </Box>

              <Box sx={{
                width: "100%",
                background: "#F3A023",
                borderRadius: "4px",
                padding: "0 15px"
              }}>
                <Typography variant="body1" sx={{
                  fontFamily: 'Roboto',
                  fontStyle: "normal",
                  fontWeight: "400",
                  fontSize: "14px",
                  lineHeight: "20px",
                  letterSpacing: "0.25px",
                  color: "#E9EEF5",
                  marginBottom: "5px"
                }}>
                  Mulher
                  <WomanIcon sx={{
                    position: "relative",
                    top: "6px",
                    right: "3px",
                    padding: "4px"
                  }} />
                </Typography>

                <Typography variant="body1" sx={{
                  fontFamily: 'Roboto',
                  fontStyle: "normal",
                  fontWeight: '500',
                  fontSize: '34px',
                  lineHeight: '36px',
                  color: '#E9EEF5',
                  marginBottom: '5px'
                }}>
                  {parseFloat(data.porSexoData[0].percentual_mulheres).toFixed(2)}%
                </Typography>

                <Typography variant="body1" sx={{
                  fontFamily: 'Roboto',
                  fontStyle: 'normal',
                  fontWeight: '400',
                  fontSize: '14px',
                  lineHeight: '20px',
                  letterSpacing: '0.25px',
                  color: '#E9EEF5',
                  paddingBottom: '5px'
                }}>
                  {data.porSexoData[0].total_mulheres}
                </Typography>
              </Box>
            </Box>

            <Box sx={{
              width: "70%"
            }}>
              <ReactECharts option={faixaEtaria} />
            </Box>

          </Box>
        </Box>

        <Typography variant="h6" sx={{
          fontFamily: 'Roboto',
          fontStyle: "normal",
          fontWeight: "500",
          fontSize: "20px",
          lineHeight: "23px",
          display: "flex",
          alignItems: "center",
          color: "#3F434A",
          marginBottom: "20px",
          paddingLeft: "10px",
          marginTop: 5
        }}>
          Casos Confirmados
        </Typography>

        <Box sx={{
          background: "#FFFFFF",
          borderRadius: "20px",
          width: "100%",
          padding: 3
        }}>
          <Box sx={{
            width: "100%"
          }}>
            <Typography variant="body1" sx={{
              fontFamily: 'Roboto',
              fontStyle: 'normal',
              fontWeight: '400',
              fontSize: '16px',
              lineHeight: '24px',
              color: '#000000',
            }}>
              Vacinação
            </Typography>
            <BarCircle data={data.vacinacaoData} name={'Vacinação'} />
          </Box>

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
              Comorbidades
            </Typography>
            <BarCircle data={data.mediasComordidadeData} name={'Comorbidades'} />
          </Box>

          <Box sx={{
            width: "100%"
          }}>
            <Typography variant="body1" sx={{
              fontFamily: 'Roboto',
              fontStyle: 'normal',
              fontWeight: '400',
              fontSize: '16px',
              lineHeight: '24px',
              color: '#000000',
              marginTop: 5
            }}>
              Percentual de cada comorbidade em casos confirmados
            </Typography>
            <HorizontalBar data={percentualComordidadeObitos} />
          </Box>
        </Box>
      </>
  )
}
