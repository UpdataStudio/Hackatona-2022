import { Box, CircularProgress } from '@mui/material';

export function Loading() {
    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: 600
        }}>
            <CircularProgress />
        </Box>
    );
}