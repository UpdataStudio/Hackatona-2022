import React from 'react';
import ReactECharts from 'echarts-for-react';
import { Box } from "@mui/material";
import { LineMini } from './Charts';
import { PositiveNegative } from './PositiveNegative';
import { Loading } from '../UI';
import { apiServerLocal } from '@/services/api';
import { DadosPorDia, DadosPorMes } from '@/pages/api/dashboard/testagem';
import { addSignal } from '@/utils/NumberUtil';

interface ITestagem {
  qt_testes_realizados: String;
  tx_negativos: String;
  tx_positivos: String;
  tx_com_sintomas: String;
  tx_sem_sintomas: String;
  tx_novo_teste: String;
  variacao_testes_realizados: string,
  variacao_com_sintomas: string,
  variacao_sem_sintomas: string,
  variacao_novo_teste: string,
  testesRealizadosPorDia: DadosPorDia[],
  comSintomasPorDia: DadosPorDia[],
  semSintomasPorDia: DadosPorDia[],
  novosTestesPorDia: DadosPorDia[]
  evolucaoTestesPorMes: DadosPorMes[]
}

export function TestagemTab({ params }: any) {

  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState<ITestagem>({
    qt_testes_realizados: '',
    tx_negativos: '',
    tx_positivos: '',
    tx_com_sintomas: '',
    tx_sem_sintomas: '',
    tx_novo_teste: '',
    variacao_testes_realizados: '',
    variacao_com_sintomas: '',
    variacao_sem_sintomas: '',
    variacao_novo_teste: '',
    testesRealizadosPorDia: [],
    comSintomasPorDia: [],
    semSintomasPorDia: [],
    novosTestesPorDia: [],
    evolucaoTestesPorMes: []
  });

  React.useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const { data } = await apiServerLocal.get('/api/dashboard/testagem', { params });
      setData({
        ...data.testagemData,
        testesRealizadosPorDia: data.testesRealizadosPorDia,
        comSintomasPorDia: data.comSintomasPorDia,
        semSintomasPorDia: data.semSintomasPorDia,
        novosTestesPorDia: data.novosTestesPorDia,
        evolucaoTestesPorMes: data.evolucaoTestesPorMes
      });
      setLoading(false);
    };
    getData();
  }, [params]);

  const testesRealizados = {
    nome: "Testes Realizados",
    valor: (data.qt_testes_realizados || '0').replace(/\B(?=(\d{3})+(?!\d))/g, '.'),
    porcentagem: addSignal(data.variacao_testes_realizados)
  }
  // @ts-ignore
  const tx_positivos = parseFloat(data.tx_positivos || '0').toFixed(2) * 100;
  // @ts-ignore
  const tx_negativos = parseFloat(data.tx_negativos || '0').toFixed(2) * 100;
  // @ts-ignore
  const tx_com_sintomas = parseFloat(data.tx_com_sintomas || '0').toFixed(2) * 100;
  // @ts-ignore
  const tx_sem_sintomas = parseFloat(data.tx_sem_sintomas || '0').toFixed(2) * 100;
  // @ts-ignore
  const tx_novo_teste = parseFloat(data.tx_novo_teste || '0').toFixed(2) * 100;

  const positivoNegativo = {
    namePositivo: "Positivo",
    nameNegativo: "Negativo",
    valuePositivo: tx_positivos.toFixed(0).toString().concat("%"),
    valueNegativo: tx_negativos.toFixed(0).toString().concat("%")
  }
  const comSintomas = {
    nome: "Com Sintomas",
    valor: tx_com_sintomas.toFixed(0).toString().concat("%"),
    porcentagem: addSignal(data.variacao_com_sintomas)
  }
  const semSintomas = {
    nome: "Sem Sintomas",
    valor: tx_sem_sintomas.toFixed(0).toString().concat("%"),
    porcentagem: addSignal(data.variacao_sem_sintomas)
  }
  const novoTeste = {
    nome: "Novo Teste Após 30 dias",
    valor: tx_novo_teste.toFixed(0).toString().concat("%"),
    porcentagem: addSignal(data.variacao_novo_teste)
  }
  
  const seriesEvolucaoTestes = function (data: any[] = []) {
    const [item = {}] = data;
    const keys = Object.keys(item).slice(1);
    return keys.map(key => ({
        name: key,
        type: 'line',
        stack: 'Total'
    }));
  };

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
    },
    yAxis: {
      type: 'value'
    },
    series: seriesEvolucaoTestes(data.evolucaoTestesPorMes),
    dataset: {
      source: data.evolucaoTestesPorMes
    }
  }
  return (
    loading
      ? <Loading />
      :
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
            <PositiveNegative positivoNegativo={positivoNegativo} />
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
          <ReactECharts option={evolucaoTestes} />
        </Box>
      </Box>
  )
}
