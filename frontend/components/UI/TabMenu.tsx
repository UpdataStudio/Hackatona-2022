import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Router from 'next/router';
import { Container, Typography } from '@mui/material';
import moment from 'moment';
import 'moment/locale/pt-br';

export function TabMenu({ selected }: any) {
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        Router.push(`/${newValue}`);
    };

    return (
        <Box sx={{ background: '#F5F5F5', width: '100%' }}>
            <Container maxWidth="xl" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Tabs
                    value={selected}
                    onChange={handleChange}
                >
                    <Tab value="home" label="Home" disabled/>
                    <Tab value="dashboard" label="Dashboard" />
                    <Tab value="about" label="Contato" disabled />
                    <Tab value="links" label="Links Úteis" disabled />
                </Tabs>
                <Typography variant="subtitle1" color={'#00000099'}>
                    {moment(new Date()).locale('pt-br').format('LL')}
                </Typography>
            </Container>
        </Box>
    );
}