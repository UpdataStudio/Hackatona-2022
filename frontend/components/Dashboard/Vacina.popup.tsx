import * as React from 'react';
import { Box, Typography } from '@mui/material';
import { BarCircleLegend } from './Charts/BarCircle/legend';

export function VacinaPopup({ data }: any) {
  const colors = ['#85DCCC', '#439B8B', '#1D6D5F', '#084a3e'];
  return (
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
        Doses Aplicadas
      </Typography>
      <Box sx={{
        alignItems: 'flex-end',
        display: "flex",
        justifyContent: 'space-around',
        width: 420
      }}>
        {
          Object.entries(data)
            .filter(([_, value]: any[]) => typeof value === 'number')
            .map(([label, value]: any[], i: number) =>
              <BarCircleLegend
                key={i}
                label={label}
                value={`${value.toFixed(2)}%`}
                color={colors[i - 1]}
              />
            )
        }
      </Box>
    </Box>
  )
}