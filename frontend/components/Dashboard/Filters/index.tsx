import React from "react";
import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import { DateRange } from "@mui/lab/DateRangePicker/RangeTypes";
import { DateRangePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

interface IOptions {
    label: string;
    value: string;
}

interface IFilter {
    regiao_administrativa: string;
    regiao_saude: string;
    bairro: string;
    ubs: string;
}

interface ISelect {
    label: string;
    filterStr: string;
    options: IOptions[];
    filter: any;
    setFilter: any;
}

function SelectComponent({ label, options, filterStr, filter, setFilter }: ISelect) {

    const handleChange = (event: SelectChangeEvent, filterStr: string) => {
        const newFilters = {
            ...filter,
            [filterStr]: event.target.value
        };
        setFilter(newFilters);
    };

    const sortOptions = (a: any, b: any) => {
        if (a.label > b.label) {
            return 1;
        }
        if (a.label < b.label) {
            return -1;
        }
        return 0;
    };

    const renderOptions = (options: IOptions[] = []) =>
        options
            .sort(sortOptions)
            .map(({ label, value }, i) => (
                <MenuItem key={i} value={value}>{label}</MenuItem>
            ));

    return (
        <FormControl variant='outlined' sx={{ m: 1, minWidth: 200 }}>
            <InputLabel id='demo-simple-select-standard-label'>{label}</InputLabel>
            <Select
                // @ts-ignore
                value={filter[filterStr]}
                defaultValue=''
                labelId='demo-simple-select-standard-label'
                id='demo-simple-select-standard'
                onChange={(e: SelectChangeEvent) => handleChange(e, filterStr)}
                label={label}
                displayEmpty
                sx={{ background: 'white' }}
                size="small"
            >
                {renderOptions(options)}
            </Select>
        </FormControl>
    )
}

export function Filters({ filters = {}, changeFilter }: any) {

    const [date, setDate] = React.useState<DateRange<Date>>([null, null]);

    const initialFilters = {
        regiao_administrativa: '',
        regiao_saude: '',
        bairro: '',
        ubs: '',
        inicio: '',
        fim: '',
    };

    const [filter, setFilter] = React.useState<IFilter>(initialFilters);

    const {
        regiaoAdministrativa,
        regiaoSaude,
        bairro,
        ubs,
    } = filters;

    const handleClearFilters = () => {
        setDate([null, null]);
        setFilter(initialFilters);
    }

    React.useEffect(() => {
        changeFilter(filter);
        /* eslint-disable react-hooks/exhaustive-deps */
    }, [filter]);

    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            mb: 2
        }}>
            <FilterAltIcon color="primary" />

            <SelectComponent
                label={'Região Saúde'}
                filterStr={'regiao_saude'}
                options={regiaoSaude}
                filter={filter}
                setFilter={setFilter}
            />
            <SelectComponent
                label={'Região Administrativa'}
                filterStr={'regiao_administrativa'}
                options={regiaoAdministrativa}
                filter={filter}
                setFilter={setFilter}
            />
            <SelectComponent
                label={'Bairro'}
                filterStr={'bairro'}
                options={bairro}
                filter={filter}
                setFilter={setFilter}
            />
            <SelectComponent
                label={'UBS'}
                filterStr={'ubs'}
                options={ubs}
                filter={filter}
                setFilter={setFilter}
            />

            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateRangePicker
                    startText="De"
                    endText="Até"
                    value={date}
                    onChange={(newValue: DateRange<Date>) => {
                        setDate(newValue);
                        if (newValue && newValue.length === 2 && newValue.every(v => !!v)) {
                            const dateFilter = {
                                inicio: newValue[0],
                                fim: newValue[1],
                            };
                            setFilter({...filter, ...dateFilter });
                        }
                    }}
                    renderInput={(startProps, endProps) => (
                        <React.Fragment>
                            <TextField {...startProps} size="small" />
                            <Box sx={{ mx: 2 }}> à </Box>
                            <TextField {...endProps} size="small" />
                        </React.Fragment>
                    )}
                />
            </LocalizationProvider>
            <Box ml={2} sx={{ cursor: 'pointer' }} onClick={handleClearFilters}>
                <DeleteOutlineIcon color={'error'} />
            </Box>
        </Box>
    )
}
