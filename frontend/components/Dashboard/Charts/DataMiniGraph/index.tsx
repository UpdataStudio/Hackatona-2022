import Image from "next/image";
import { Box } from '@mui/material';

import { LineMini } from '@/components/Dashboard/Charts';

import up from "@/public/lineChartMini/chartlongup.svg";
import down from "@/public/lineChartMini/chartlongdown.svg";

export function DataMiniGraph () {
    const novosCasos = {
        nome: "Novos Casos",
        valor: "2.630",
        porcentagem: "+15%"
    }
    const totalDeCasos = {
        nome: "Total de Casos",
        valor: "538.354",
        porcentagem: "-5%"
    }
    return (
        <Box sx={{
            display: "flex",
            width: "100%"
            }}>
            <Box sx={{
                width: "100%",
                padding: "0 30px"
            }}>
                <LineMini dados={novosCasos} />
                <Image
                src={novosCasos.porcentagem.charAt(0) == "+" ? up : down}
                alt={novosCasos.porcentagem.charAt(0) == "+" ? up : down}
                />
            </Box>
            <Box sx={{
                width: "100%",
                padding: "0 30px"
            }}>
                <LineMini dados={totalDeCasos} />
                <Image
                src={totalDeCasos.porcentagem.charAt(0) == "+" ? up : down}
                alt={totalDeCasos.porcentagem.charAt(0) == "+" ? up : down}
                />
            </Box>
        </Box>
    )
}