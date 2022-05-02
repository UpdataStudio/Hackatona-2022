import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props: any, ref: any) {
    return <MuiAlert elevation={6} ref={ref} variant='standard' {...props} />;
});

export function Toast({ info, type, openState, resetState }: any) {
    const [open, setOpen] = React.useState(openState);

    const handleClose = (event: any, reason: any) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
        resetState(false);
    };

    React.useEffect(() => {
        if (openState)
            setOpen(openState);
    }, [openState]);

    // error
    // warning
    // info
    // success

    return (
        <Stack spacing={2} sx={{ width: '100%' }}>
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={type || 'success'} sx={{ width: '100%' }}>
                    {info || 'Passe uma "info"!'}
                </Alert>
            </Snackbar>
        </Stack>
    );
}
