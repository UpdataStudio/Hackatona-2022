import { Box, Typography } from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

export function PositiveNegative({ positivoNegativo }: any) {

    return (
        <>
            <Box sx={{
                background: '#FFFFFF',
                boxShadow: '0px 0.5px 1.75px rgba(0, 0, 0, 0.039), 0px 1.85px 6.25px rgba(0, 0, 0, 0.19)',
                borderRadius: '4px',
                padding: '15px 20px',
                width: '100%',
            }}>
                <Typography variant="body1" sx={{
                    fontFamily: 'Roboto',
                    fontStyle: 'normal',
                    fontWeight: '400',
                    fontSize: '14px',
                    lineHeight: '20px',
                    letterSpacing: '0.25px',
                    color: 'rgba(0, 0, 0, 0.6)',
                }}>
                    {positivoNegativo.namePositivo} <AddCircleOutlineIcon sx={{ width: '15px', height: '15px' }} />
                </Typography>

                <Typography variant="body1" sx={{
                    fontFamily: 'Roboto',
                    fontStyle: 'normal',
                    fontWeight: '400',
                    fontSize: '34px',
                    lineHeight: '36px',
                    color: '#04B8AD',
                }}>
                    {positivoNegativo.valuePositivo}
                </Typography>
            </Box>
            <Box sx={{
                background: '#FFFFFF',
                boxShadow: '0px 0.5px 1.75px rgba(0, 0, 0, 0.039), 0px 1.85px 6.25px rgba(0, 0, 0, 0.19)',
                borderRadius: '4px',
                padding: '15px 20px',
                marginLeft: '20px',
                width: '100%',
            }}>
                <Typography variant="body1" sx={{
                    fontFamily: 'Roboto',
                    fontStyle: 'normal',
                    fontWeight: '400',
                    fontSize: '14px',
                    lineHeight: '20px',
                    letterSpacing: '0.25px',
                    color: 'rgba(0, 0, 0, 0.6)',
                }}>
                    {positivoNegativo.nameNegativo} <RemoveCircleOutlineIcon sx={{ width: '15px', height: '15px' }} />
                </Typography>

                <Typography variant="body1" sx={{
                    fontFamily: 'Roboto',
                    fontStyle: 'normal',
                    fontWeight: '400',
                    fontSize: '34px',
                    lineHeight: '36px',
                    color: '#F37070',
                }}>
                    {positivoNegativo.valueNegativo}
                </Typography>
            </Box>
        </>
    )
}