import ReactECharts from 'echarts-for-react';
import { Box, Typography } from "@mui/material";

import ManIcon from '@mui/icons-material/Man';
import WomanIcon from '@mui/icons-material/Woman';

import { BarCircle, DataMiniGraph, HorizontalBar, LineMini, SingleBarCircle } from './Charts';

export function CasosTab() {
  const sintomasLeves = {
    nome: "Sintomas Graves",
    valor: "80%",
    porcentagem: "+15%"
  }
  const sintomasGraves = {
    nome: "Sintomas Graves",
    valor: "20%",
    porcentagem: "-5%"
  }
  const assintomaticos = {
    nome: "Assintomáticos",
    valor: "80%",
    porcentagem: "+15%"
  }

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
      data: ['+18', '20 a 29', '30 a 39', '40 a 49', '50 a 59', '60+'],
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
        data: [60, 40, 60, 70, 90, 110, 120],
        type: 'bar',
        barWidth: '45%',
        itemStyle: {
          borderRadius: [3, 3, 0, 0]
        }
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
          width: "100%"
        }}>

          <DataMiniGraph />

          <SingleBarCircle />
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
            padding: "0 30px"
          }}>
            <LineMini dados={sintomasLeves} />
          </Box>
          <Box sx={{
            width: "100%",
            padding: "0 30px"
          }}>
            <LineMini dados={sintomasGraves} />
          </Box>
          <Box sx={{
            width: "100%",
            padding: "0 30px"
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
                54,8%
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
                295.258
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
                45,2%
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
                243.096
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
        paddingLeft: "10px"
      }}>
        Casos Confirmados
      </Typography>

      <Box sx={{
        padding: "30px 0 0 0",
        background: "#FFFFFF",
        borderRadius: "20px",
        width: "100%"
      }}>

        <Box sx={{
          width: "100%"
        }}>
          <Typography variant="body1" sx={{
            fontFamily: 'Roboto',
            fontStyle: 'normal',
            fontWeight: '400',
            fontSize: '18px',
            lineHeight: '24px',
            color: '#000000',
          }}>
            Doses Aplicadas
          </Typography>
          <BarCircle />
        </Box>

        <Box sx={{
          width: "100%"
        }}>
          <Typography variant="body1" sx={{
            fontFamily: 'Roboto',
            fontStyle: 'normal',
            fontWeight: '400',
            fontSize: '18px',
            lineHeight: '24px',
            color: '#000000',
          }}>
            Doses Aplicadas
          </Typography>
          <BarCircle />
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
        Comorbidades
      </Typography>

      <Box sx={{
        padding: "30px 0 0 0",
        background: "#FFFFFF",
        borderRadius: "20px",
        width: "100%"
      }}>
        <Box sx={{
          width: "100%"
        }}>
          <Typography variant="body1" sx={{
            fontFamily: 'Roboto',
            fontStyle: 'normal',
            fontWeight: '400',
            fontSize: '18px',
            lineHeight: '24px',
            color: '#000000',
          }}>
            Doses Aplicadas
          </Typography>

          <HorizontalBar />
        </Box>
      </Box>
    </>
  )
}
