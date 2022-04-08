import * as React from 'react';
import Image from 'next/image';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import { Box, IconButton, Typography } from '@mui/material';
import { Logo } from './Logo';
import socials from '@/public/socialIcons/socials.json';

export function Footer() {
    return (
        <AppBar position="static" color="inherit">
            <Container maxWidth="xl" sx={{ backgroundColor: '#165A96' }}>
                <Toolbar disableGutters>
                    <Logo white />
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Box sx={{ display: { xs: 'none', md: 'flex' }, flexDirection: 'row', justifyContent: 'flex-end' }}>
                            {socials.map((social: any, i: number) => {
                                return (
                                    <IconButton size="large" aria-label={social.label} key={i}>
                                        <Image
                                            src={`/socialIcons/${social.src}.png`}
                                            alt={social.label}
                                            width={20}
                                            height={20}
                                        />
                                    </IconButton>
                                )

                            })}
                        </Box>
                        <Typography variant="h5" sx={{
                            fontFamily: 'Roboto',
                            fontStyle: "normal",
                            fontWeight: "400",
                            fontSize: "16px",
                            lineHeight: "20px",
                            color: '#ffffff'
                        }}>
                            © 2022 Fiocruz. Todos os direitos reservados.
                        </Typography>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};