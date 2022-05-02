import { addSignal } from '@/utils/NumberUtil';
import { Box } from '@mui/material';
import * as React from 'react';
import { DataMiniGraph } from '../Charts';

export function ObitoPopup({ data }: any) {
  const qt_novos = {
    nome: "Novos Óbitos",
    valor: data.qt_novos_obito,
    porcentagem: addSignal(data.variacao_novos_obitos),
  }

  const qt_total = {
    nome: 'Total de Óbitos',
    valor: data.qt_total_obito,
    porcentagem: addSignal(data.variacao_total_obitos),
  }

  const qt_obitos = {
    qt_novos,
    qt_total,
    novos_por_dia: [],
    total_por_dia: [],
  }

  return (
    <Box sx={{ display: 'flex', width: '100%' }}>
      <DataMiniGraph qt_data={qt_obitos} />
    </Box>
  );
}
