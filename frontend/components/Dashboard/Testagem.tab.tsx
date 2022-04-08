import ReactECharts from 'echarts-for-react';
import { Box } from "@mui/material";
import { LineMini } from './Charts';
import { PositiveNegative } from './PositiveNegative';

export function TestagemTab() {
    const testesRealizados = {
        nome: "Testes Realizados",
        valor: "525.542",
        porcentagem: "+15%"
    }
    const comSintomas = {
        nome: "Com Sintomas",
        valor: "20%",
        porcentagem: "+15%"
    }
    const semSintomas = {
        nome: "Sem Sintomas",
        valor: "80%",
        porcentagem: "-5%"
    }
    const novoTeste = {
        nome: "Novo Teste Após 30 dias",
        valor: "8%",
        porcentagem: "+15%"
    }
    const evolucaoTestes = {
        color: ['#6200EE', '#EB3693', '#4285F4', '#EE6002', '#26A69A', '#EDBC5E'],
        title: {
          text: 'Evolução mensal de testes realizados',
          subtext: 'Separados por tipo',
          textStyle: {
            color: '#000000',
            fontStyle: 'normal',
            fontWeight: 400,
            fontSize: 18,
            fontFamily: 'Roboto',
            lineHeight: 24
          },
          subtextStyle: {
            fontFamily: 'Roboto',
            fontStyle: 'normal',
            fontWeight: 400,
            fontSize: 14,
            lineHeight: 20
          },
          top: '-9px'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          bottom: '0',
          left: 'center',
          data: ['RT - PCR', 'RT - LAMP', 'Sorológico IgA', 'Sorológico IgM', 'SorológicoIgG', 'Anticorpos Totais'],
          icon: 'rec',
          itemGap: 20
        },
        grid: {
            left: '1%',
            right: '1%',
            bottom: '20%',
            height: '55%',
            containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: 'RT - PCR',
            type: 'line',
            stack: 'Total',
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: 'RT - LAMP',
            type: 'line',
            stack: 'Total',
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: 'Sorológico IgA',
            type: 'line',
            stack: 'Total',
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: 'Sorológico IgM',
            type: 'line',
            stack: 'Total',
            data: [320, 332, 301, 334, 390, 330, 320]
          },
          {
            name: 'SorológicoIgG',
            type: 'line',
            stack: 'Total',
            data: [820, 932, 901, 934, 1290, 1330, 1320]
          },
          {
            name: 'Anticorpos Totais',
            type: 'line',
            stack: 'Total',
            data: [820, 932, 901, 934, 1290, 1330, 1320]
          }
        ]
    }
    return (
        <Box sx={{ 
            padding: "30px 40px",
            background: "#FFFFFF",
            borderRadius: "20px",
            width: "100%",
        }}>
            <Box sx={{ 
                width: "100%",
                display: 'flex',
                borderBottom: '1px solid #D1D8DD',
                paddingBottom: '30px'
            }}>
                <LineMini dados={testesRealizados} />

                <Box sx={{ 
                    width: "100%",
                    display: 'flex',
                    marginLeft: '50px'
                }}>
                    <PositiveNegative/>
                </Box>
            </Box>
            
            <Box sx={{ 
                width: "100%",
                display: 'flex',
                marginTop: '30px',
                marginBottom: '50px',
                padding: '0 10px',
                alignItems: 'center'
            }}>
                <Box sx={{ 
                    width: "100%",
                }}>
                    <LineMini dados={comSintomas} />
                </Box>
                
                <Box sx={{ 
                    width: "100%",
                }}>
                    <LineMini dados={semSintomas} />
                </Box>

                <Box sx={{
                    width: '250px'
                }}>
                    <LineMini dados={novoTeste} />
                </Box>
            </Box>

            <Box sx={{ 
                width: "100%",
            }}>
                <ReactECharts option={evolucaoTestes}/>
            </Box>
        </Box>
    )
}
