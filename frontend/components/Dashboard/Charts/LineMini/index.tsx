import Image from "next/image";
import { Box, Typography } from "@mui/material";
import up from '@/public/lineChartMini/chartshortup.svg';
import down from '@/public/lineChartMini/chartshortdown.svg';

import "@fontsource/roboto";

// @ts-ignore
export function LineMini({ dados }) {

    return (
        <Box sx={{ 
            widget: "100%"
        }}>
            <Typography variant="body1" sx={{ 
                fontFamily: 'Roboto',
                fontStyle: "normal",
                fontWeight: "400",
                fontSize: "14px",
                lineHeight: "20px",
                letterSpacing: "0.25px",
                color: "#000000"
            }}>
                {dados.nome}
            </Typography>
            <Typography variant="h6" sx={{ 
                fontFamily: 'Roboto',
                fontStyle: "normal",
                fontWeight: "400",
                fontSize: "34px",
                lineHeight: "36px",                
                color: "#000000",
            }}>
                {dados.valor}
            </Typography>
            <Box sx={{ 
                display: "flex"
            }}>
                <Image
                    src={dados.porcentagem.charAt(0) == "+" ? up : down}
                    alt={dados.porcentagem.charAt(0) == "+" ? up : down}
                    width="16px"
                    height="16px"
                />
                <Typography variant="subtitle2" sx={{ 
                    marginLeft: "5px",
                    fontFamily: 'Roboto',
                    fontStyle: "normal",
                    fontWeight: "400",
                    fontSize: "14px",
                    lineHeight: "20px",
                    letterSpacing: "0.25px",
                    color: "rgba(0, 0, 0, 0.6)",
                }}>
                    {dados.porcentagem}
                </Typography>
            </Box>
        </Box>
    );
}