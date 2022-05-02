
import { Box } from '@mui/material'
import React from 'react'
import { LineMini } from '../Charts'
import { addSignal } from 'utils/NumberUtil';
import { PositiveNegative } from '../PositiveNegative';

type DadosTestagemPorRegiao = {
    data: {
      testes_realizados: number,
      tx_negativos: number,
      tx_positivos: number,
      tx_com_sintomas: number,
      tx_sem_sintomas: number,
      tx_novo_teste: number,
      variacao_testes_realizados: number,
      variacao_com_sintomas: number,
      variacao_sem_sintomas: number,
      variacao_novo_teste: number,
    },
};



function TestagemPopup({ data }: DadosTestagemPorRegiao) {
  const {
    testes_realizados,
    tx_negativos,
    tx_positivos,
    variacao_testes_realizados,
  } = data;

  const testesRealizados = {
    nome: "Testes Realizados",
    valor: String(testes_realizados).replace(/\B(?=(\d{3})+(?!\d))/g, '.'),
    porcentagem: addSignal(variacao_testes_realizados)
  };

  const positivoNegativo = {
    namePositivo: "Positivo",
    nameNegativo: "Negativo",
    valuePositivo: tx_positivos.toFixed(0).toString().concat("%"),
    valueNegativo: tx_negativos.toFixed(0).toString().concat("%")
  }

  return (
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
  )
}

export default TestagemPopup