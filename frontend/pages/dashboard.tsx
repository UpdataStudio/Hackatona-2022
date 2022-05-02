import * as React from 'react';
import dynamic from 'next/dynamic';
import Structure from '@/components/Structure';
import type { NextPage } from 'next';
import { GetStaticProps } from 'next';
import { Box, FormControl, Grid, InputLabel, MenuItem, Paper, Select, SelectChangeEvent, Tab, Tabs, Typography } from '@mui/material';
import { CasosTab, ObitoTab, TestagemTab, VacinaTab } from '@/components/Dashboard';

import '@fontsource/roboto';
import { Filters } from '@/components/Dashboard/Filters';
import { Loading } from '@/components/UI';
import { apiServerLocal } from '@/services/api';
import { FilterResponse } from './api/dashboard/dados-por-regiao';

type FilterDomain = {
  label: string;
  value: string;
};

const Dashboard: NextPage = (props: any) => {

  const [activeTab, setActiveTab] = React.useState('vacina');
  const [filterFilteredData, setFilterFilteredData] = React.useState(props.filteredData);
  const [paramsFilter, setParamsFilter] = React.useState({});
  const [fabricante, setFabricante] = React.useState("");
  const [acima_12_anos, setAcima12Anos] = React.useState<'Sim' | 'Não'>('Sim');
  const [dadosRegiao, setDadosRegiao] = React.useState({
    vacina: undefined,
    casos: undefined,
    testagem: undefined,
    obito: undefined,
  });

  React.useEffect(() => {
    async function fetchDadosRegiao() {
      const params = activeTab === 'vacina' ? {
        params: {
          fabricante,
          acima_12_anos,
        }
      } : {};
      const { data } = await apiServerLocal.get('/api/dashboard/dados-por-regiao', params);
      setDadosRegiao(data);
    }

    fetchDadosRegiao();
  }, [paramsFilter, fabricante, acima_12_anos, activeTab]);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
  };

  function handleChangeFabricante(event: SelectChangeEvent) {
    setFabricante(event.target.value);
  }

  const titleMap: any = {
    vacina: 'Doses Aplicadas',
    casos: 'Casos de COVID 19',
    testagem: 'Testes',
    obito: 'Óbito',
  }

  const MapBox = React.useMemo(() => dynamic(
    () => import('@/components/MapBox'),
    {
      loading: () => (
        <div style={{ height: '385px' }} >
          <Loading />
        </div>),
      ssr: false
    }
  ), []);

  const renderContentTab = (active: string) => {
    let render;
    switch (active) {
      case 'vacina':
        render = <VacinaTab params={{...paramsFilter, fabricante }} onChangeFilter={(filters: any) => setAcima12Anos(filters.acima_12_anos)} />
        break;
      case 'casos':
        render = <CasosTab params={paramsFilter} />
        break;
      case 'testagem':
        render = <TestagemTab params={paramsFilter} />
        break;
      case 'obito':
        render = <ObitoTab params={paramsFilter} />
        break;

      default:
        break;

    }
    return (
      <div style={{ padding: 20, maxHeight: 1050, overflow: 'auto' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <Typography variant='h5' mb={2} sx={{
            fontFamily: 'Roboto',
            fontStyle: 'normal',
            fontWeight: '500',
            fontSize: '20px',
            lineHeight: '23px',
            display: 'flex',
            alignItems: 'center',
            color: '#3F434A',
            paddingLeft: '10px'
          }}>
            {titleMap[active]}
          </Typography>
          {
            active === 'vacina' &&
            <div>
              <FormControl variant='outlined' sx={{ m: 1, width: 300 }}>
                <InputLabel id='demo-simple-select-standard-label'>Fabricante</InputLabel>
                <Select
                  sx={{ background: 'white' }}
                  labelId='demo-simple-select-standard-label'
                  label='Fabricante'
                  onChange={handleChangeFabricante}>
                  <MenuItem value="">-- Selecione um fabricante --</MenuItem>
                  {
                    props.filteredData.fabricante.map(({label, value}: FilterDomain) => (
                      <MenuItem key={value} value={value}>{label}</MenuItem>
                    ))
                  }
                </Select>
              </FormControl>
            </div>
          }
        </Box>
        {render}
      </div >
    );
  }

  const handleChangeFilter = async (filterParams: any) => {
    let params = {} as any;
    try {
      for (const key in filterParams) {
        if (Object.prototype.hasOwnProperty.call(filterParams, key)) {
          const element = filterParams[key];
          // @ts-ignore
          if (element) params[key] = element;
        }
      }

      setParamsFilter(params);
      
      const {inicio, fim, ...restParams} = params;
      const { data: filterDataFiltered } = await apiServerLocal.get('/api/dashboard/filters', { params: restParams });
      setFilterFilteredData(filterDataFiltered);

    } catch (error: any) {
      console.log(error.message);
    }
  }

  return (
    <Structure config={{
      namePage: 'Dashboard',
      page: 'dashboard'
    }}>
      <Filters filters={filterFilteredData} changeFilter={handleChangeFilter} />
      <Paper elevation={1} sx={{ background: 'transparent' }}>
        <Grid container>
          <Grid item xs={5}>
            <Tabs
              value={activeTab}
              onChange={handleChange}
              sx={{
                background: 'white',
                borderRadius: '5px 5px 0 0'
              }}
            >
              <Tab value='vacina' label='VACINA' sx={{ width: "25%" }} />
              <Tab value='casos' label='CASOS' sx={{ width: "25%" }} />
              <Tab value='testagem' label='TESTAGEM' sx={{ width: "25%" }} />
              <Tab value='obito' label='ÓBITO' sx={{ width: "25%" }} />
            </Tabs>
            {
              renderContentTab(activeTab)
            }
          </Grid>
          <Grid item xs={7}>
            {/* @ts-ignore */}
            <MapBox active={activeTab} region={dadosRegiao[activeTab]} />
          </Grid>
        </Grid>
      </Paper>
    </Structure>
  )
}

export default Dashboard;

export const getStaticProps: GetStaticProps = async (context: any) => {
  try {
    const { data: filteredData } = await apiServerLocal.get('/api/dashboard/filters');

    return {
      props: {
        filteredData,
      },
      revalidate: 60
    }
  } catch (error) {
    console.log(error);
    return {
      props: {
        filteredData: [],
      },
      revalidate: 60
    }
  }
}
