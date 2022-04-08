import * as React from 'react';
import Structure from '@/components/Structure';
import { Box, FormControl, Grid, InputLabel, MenuItem, Paper, Select, SelectChangeEvent, Tab, Tabs, TextField, Typography } from '@mui/material';
import type { NextPage } from 'next';
import { CasosTab, ObitoTab, TestagemTab, VacinaTab } from '@/components/Dashboard';
import dynamic from 'next/dynamic';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

import '@fontsource/roboto';
import { DateRange, DateRangePicker, LocalizationProvider } from '@mui/lab';

import { GetStaticProps } from 'next';

const Dashboard: NextPage = ({ doses, estoque }: any) => {
  const [value, setValue] = React.useState('vacina');
  const [age, setAge] = React.useState('');
  const [date, setDate] = React.useState<DateRange<Date>>([null, null]);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const titleMap: any = {
    vacina: 'Doses Aplicadas',
    casos: 'Casos de COVID 19',
    testagem: 'Testes',
    obito: 'obito',
  }

  const MapBox = React.useMemo(() => dynamic(
    () => import('@/components/MapBox'),
    {
      loading: () => (
        <div style={{ height: '385px' }} >
          loading
        </div>),
      ssr: false
    }
  ), []);

  const renderContentTab = (active: string) => {
    let render;
    switch (active) {
      case 'vacina':
        render = <VacinaTab doses={doses} estoque={estoque} />
        break;
      case 'casos':
        render = <CasosTab />
        break;
      case 'testagem':
        render = <TestagemTab />
        break;
      case 'obito':
        render = <ObitoTab />
        break;

      default:
        break;

    }
    return (
      <div style={{ padding: 20 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
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
          <div>
            <InputLabel id='demo-simple-select-standard-label'>Fabricante</InputLabel>
            <Select
              labelId='demo-simple-select-standard-label'
              id='demo-simple-select-standard'
              value={age}
              label='Região Administrativa'
              style={{ width: 200 }}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </div>
        </Box>
        {render}
      </div >
    );
  }

  const renderFilter = () => {
    const handleChange = (event: SelectChangeEvent) => {
      setAge(event.target.value);
    };
    return (
      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
        <FormControl variant='filled' sx={{ m: 1, minWidth: 200 }}>
          <InputLabel id='demo-simple-select-standard-label'>Região Administrativa</InputLabel>
          <Select
            labelId='demo-simple-select-standard-label'
            id='demo-simple-select-standard'
            value={age}
            onChange={handleChange}
            label='Região Administrativa'
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant='filled' sx={{ m: 1, minWidth: 200 }}>
          <InputLabel id='demo-simple-select-standard-label'>Bairro</InputLabel>
          <Select
            labelId='demo-simple-select-standard-label'
            id='demo-simple-select-standard'
            value={age}
            onChange={handleChange}
            label='Bairro'
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant='filled' sx={{ m: 1, minWidth: 200 }}>
          <InputLabel id='demo-simple-select-standard-label'>UBS</InputLabel>
          <Select
            labelId='demo-simple-select-standard-label'
            id='demo-simple-select-standard'
            value={age}
            onChange={handleChange}
            label='UBS'
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
        <LocalizationProvider dateAdapter={AdapterDateFns}>

          <DateRangePicker
            startText="De"
            endText="Até"
            value={date}
            onChange={(newValue) => {
              setDate(newValue);
            }}
            renderInput={(startProps, endProps) => (
              <React.Fragment>
                <TextField {...startProps} />
                <Box sx={{ mx: 2 }}> à </Box>
                <TextField {...endProps} />
              </React.Fragment>
            )}
          />
        </LocalizationProvider>
      </div>
    )
  }

  return (
    <Structure config={{
      namePage: 'Dashboard',
      page: 'dashboard'
    }}>
      {renderFilter()}
      <Paper elevation={1} sx={{ background: 'transparent' }}>
        <Grid container>
          <Grid item xs={5}>
            <Tabs
              value={value}
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
              renderContentTab(value)
            }
          </Grid>
          <Grid item xs={7}>
            <MapBox />
          </Grid>
        </Grid>
      </Paper>
    </Structure>
  )
}

export default Dashboard;

export const getStaticProps: GetStaticProps = async (context) => {
  // const { data } = await api.get('/vacinas/doses');
  return {
    props: {
      // doses: data
      doses: [
        {
          "ds_dose": "1ª dose",
          "percentual": "0.49933492288961038961",
          "quantidade_aplicada": "60.3694196428571429"
        },
        {
          "ds_dose": "2ª dose",
          "percentual": "0.49875963879870129870",
          "quantidade_aplicada": "60.4431818181818182"
        },
        {
          "ds_dose": "dose de reforço",
          "percentual": "0.49787489853896103896",
          "quantidade_aplicada": "60.4419642857142857"
        },
        {
          "ds_dose": "dose única",
          "percentual": "0.50081270292207792208",
          "quantidade_aplicada": "60.7318384740259740"
        }
      ],
      estoque: [
        {
          "ds_dose": "1ª dose",
          "quantidade_estoque": "857687",
          "quantidade_aplicada": "1190002"
        },
        {
          "ds_dose": "2ª dose",
          "quantidade_estoque": "859699",
          "quantidade_aplicada": "1191456"
        },
        {
          "ds_dose": "dose de reforço",
          "quantidade_estoque": "859645",
          "quantidade_aplicada": "1191432"
        },
        {
          "ds_dose": "dose única",
          "quantidade_estoque": "853094",
          "quantidade_aplicada": "1197146"
        }
      ]
    },
    revalidate: 60
  }
}