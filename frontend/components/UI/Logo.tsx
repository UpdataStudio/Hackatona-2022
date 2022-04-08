import Image from "next/image";
import { Box, Typography } from "@mui/material";
import logo from '@/public/logo/icon.png';
import logoWhite from '@/public/logo/icon_white.png';

import "@fontsource/roboto";

export function Logo({ white = false }: any) {

  return (
    <Box sx={{
      widget: "100%",
      display: 'flex',
      flexDirection: 'row',
      maxWidth: 300
    }}>
      <Box sx={{
        display: "flex",
        alignItems: 'center',
        justifyContent: 'center',
        width: '20%'
      }}>
        <Image
          src={white ? logoWhite : logo}
          alt='logo'
        />
      </Box>
      <Box sx={{
        display: "flex",
        flexDirection: 'column',
        width: '80%',
        marginLeft: 2
      }}>
        <Typography variant="h1" sx={{
          fontFamily: 'Maven Pro',
          fontStyle: "normal",
          fontWeight: "500",
          fontSize: "43px",
          lineHeight: "51px",
          color: `${white ? '#ffffff' : "#000000"}`
        }}>
          CIMS
        </Typography>
        <Typography variant="h5" sx={{
          fontFamily: 'Maven Pro',
          fontStyle: "normal",
          fontWeight: "400",
          fontSize: "10.7px",
          lineHeight: "13px",
          color: `${white ? '#ffffff' : "#000000"}`
        }}>
          Central de Integração e Monitoramento de Saúde Pública do Distrito Federal
        </Typography>
      </Box>
    </Box>
  );
}