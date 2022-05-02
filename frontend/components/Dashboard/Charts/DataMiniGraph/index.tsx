import { Box } from '@mui/material';

import { LineMini, Timeline } from '@/components/Dashboard/Charts';

// @ts-ignore
export function DataMiniGraph({ qt_data }: any) {
    return (
        <Box sx={{
            display: "flex",
            width: "100%"
        }}>
            <Box sx={{
                width: "100%",
                padding: "0 30px"
            }}>
                <LineMini dados={qt_data.qt_novos} />
                <Timeline data={qt_data.novos_por_dia} color={qt_data.qt_novos.porcentagem?.charAt(0) === '+' ? ['green'] : ['red']} />
            </Box>
            <Box sx={{
                width: "100%",
                padding: "0 30px"
            }}>
                <LineMini dados={qt_data.qt_total} />
                <Timeline data={qt_data.total_por_dia} color={qt_data.qt_total.porcentagem?.charAt(0) === '+' ? ['green'] : ['red']} />
            </Box>
        </Box>
    )
}