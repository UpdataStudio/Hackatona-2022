import Image from "next/image";
import { Box, Typography } from '@mui/material';

interface LegendProps {
    label: string;
    value: string;
    img: any;
}

export function BarCircleLegend({ label, value, img }: LegendProps) {
    return (
        <Box>
            <Box sx={{
                width: '100%',
                display: 'flex',
                alignItems: 'flex-end'
            }}>
                <Typography variant="subtitle1" sx={{
                    fontFamily: 'Roboto',
                    fontStyle: 'normal',
                    fontWeight: '400',
                    fontSize: '14px',
                    lineHeight: '20px',
                    letterSpacing: '0.25px',
                    color: 'rgba(0, 0, 0, 0.6)',
                    marginRight: '6px',
                    maxWidth: 100
                }}>
                    {label}
                </Typography>
                <Image
                    src={img}
                    alt={img}
                />
            </Box>
            <Typography variant="h6" sx={{
                fontFamily: 'Roboto',
                fontStyle: 'normal',
                fontWeight: '400',
                fontSize: '32px',
                lineHeight: '36px',
                color: '#000000',
            }}>
                {value}
            </Typography>
        </Box>
    );
}