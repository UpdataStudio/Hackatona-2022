import React from 'react';
import { DadosPorDia } from "@/pages/api/dashboard/obito";
import { apiServerLocal } from "@/services/api";
import { addSignal } from "@/utils/NumberUtil";
import { Box } from "@mui/material";
import { Loading } from "../UI";

import { DataMiniGraph, HorizontalBar, SingleBarCircle } from './Charts';
import { PositiveNegative } from './PositiveNegative';

interface IObito {
    qt_total_obitos: String;
    qt_novos_obitos: String;
    tx_letalidade: String;
    tx_mortalidade: String;
    receberam_vacina: String;
    nao_receberam_vacina: String;
    doenca_respiratoria: String;
    doenca_cardiaca: String;
    imunossuprimidos: String;
    diabeticos: String;
    variacao_total_obitos: string;
    variacao_novos_obitos: string;
    totalPorDia: DadosPorDia[],
    novosPorDia: DadosPorDia[],
}


export function ObitoTab({ params }: any) {
    const [loading, setLoading] = React.useState(true);
    const [data, setData] = React.useState<IObito>({
        qt_total_obitos: "",
        qt_novos_obitos: "",
        tx_letalidade: "",
        tx_mortalidade: "",
        receberam_vacina: "",
        nao_receberam_vacina: "",
        doenca_respiratoria: "",
        doenca_cardiaca: "",
        imunossuprimidos: "",
        diabeticos: "",
        variacao_total_obitos: "",
        variacao_novos_obitos: "",
        totalPorDia: [],
        novosPorDia: [],
    });

    React.useEffect(() => {
        const getData = async () => {
            setLoading(true);
            const { data } = await apiServerLocal.get('/api/dashboard/obito', { params });
            setData({
                ...data.obitoData,
                totalPorDia: data.totalPorDia,
                novosPorDia: data.novosPorDia,
            });
            setLoading(false);
        };
        getData();
    }, [params]);

    const qt_novos = {
        nome: "Novos Óbitos",
        valor: (data.qt_novos_obitos || '0').replace(/\B(?=(\d{3})+(?!\d))/g, '.'),
        porcentagem: addSignal(data.variacao_novos_obitos)
    }
    const qt_total = {
        nome: "Total de Óbitos",
        valor: (data.qt_total_obitos || '0').replace(/\B(?=(\d{3})+(?!\d))/g, '.'),
        porcentagem: addSignal(data.variacao_total_obitos)
    }

    // @ts-ignore
    const tx_letalidade = parseFloat(data.tx_letalidade || '0').toFixed(2) * 100;
    // @ts-ignore
    const tx_mortalidade = parseFloat(data.tx_mortalidade || '0').toFixed(2) * 100;

    const qt_obitos = {
        qt_novos,
        qt_total,
        novos_por_dia: data.novosPorDia,
        total_por_dia: data.totalPorDia,
    }

    // @ts-ignore
    const porcentagem_comorbidade_doenca_respiratoria = parseFloat(data.doenca_respiratoria || '0').toFixed(2);
    // @ts-ignore
    const porcentagem_comorbidade_doenca_cardiaca = parseFloat(data.doenca_cardiaca || '0').toFixed(2);
    // @ts-ignore
    const porcentagem_comorbidade_imunossuprimidos = parseFloat(data.imunossuprimidos || '0').toFixed(2);
    // @ts-ignore
    const porcentagem_comorbidade_diabeticos = parseFloat(data.diabeticos || '0').toFixed(2);

    const positivoNegativo = {
        namePositivo: "Letalidade",
        nameNegativo: "Mortalidade",
        valuePositivo: tx_letalidade.toFixed(0).toString().concat("%"),
        valueNegativo: tx_mortalidade.toFixed(0).toString().concat("%")
    }

    const recuperadosAtivos = {
        tooltip: {
            trigger: 'item',
            formatter: (params: any) => {
                return `${params.name}<br/>
                        Total: ${params.data.value}<br/>
                        Porcentagem: ${params.percent}%`;
            }
        },
        color: ['#3B00ED', '#D81B60'],
        legend: {
            bottom: '0',
            left: 'center',
            icon: "circle",
        },
        series: [
            {
                type: 'pie',
                radius: ['40%', '50%'],
                avoidLabelOverlap: false,
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: false,
                        fontSize: '40',
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                data: [
                    { value: data.receberam_vacina, name: 'Óbitos que receberam a vacina' },
                    { value: data.nao_receberam_vacina, name: 'Óbitos que não receberam a vacina' }
                ]
            }
        ]
    }

    const percentualComordidadeObitos = {
        color: '#6200EE',
        tooltip: {
            trigger: 'item',
            formatter: (params: any) => `${params.data.value}%`,
        },
        title: {
            text: 'Percentual de cada comorbidade nos óbitos ocorridos',
            textStyle: {
                fontFamily: 'Roboto',
                fontStyle: 'normal',
                fontWeight: 400,
                fontSize: 18,
                lineHeight: 24,
                color: '#000000'
            },
            padding: [20, 0, 0, 30]
        },
        grid: {
            left: '2%',
            bottom: '12%',
            containLabel: true
        },
        dataset: {
            source: [
                {
                    label: 'Diabetes',
                    value: porcentagem_comorbidade_diabeticos
                },
                {
                    label: 'Imunosupressão',
                    value: porcentagem_comorbidade_imunossuprimidos
                },
                {
                    label: 'Doenças cardíacas crônicas',
                    value: porcentagem_comorbidade_doenca_cardiaca
                },
                {
                    label: 'Doenças respiratórias\ncrônicas Descompensadas',
                    value: porcentagem_comorbidade_doenca_respiratoria
                }
            ]
        },
        xAxis: {
            type: 'value',
            axisLabel: {
                formatter: "{value}%"
            },
            max: 100,
        },
        yAxis: {
            type: 'category'
        },
        series: [
            {
                name: 'Comorbidade nos óbitos',
                type: 'bar'
            }
        ]
    }

    return (
        loading
            ? <Loading />
            :
            <>
                <Box sx={{
                    padding: "30px 0",
                    background: "#FFFFFF",
                    borderRadius: "20px",
                    width: "100%"
                }}>
                    <Box sx={{
                        display: "flex",
                        width: "100%"
                    }}>
                        <DataMiniGraph qt_data={qt_obitos} />
                    </Box>

                    <Box sx={{
                        width: "100%",
                        display: 'flex',
                        padding: '20px'
                    }}>
                        <PositiveNegative positivoNegativo={positivoNegativo} />
                    </Box>

                    <Box sx={{
                        width: "100%"
                    }}>
                        <SingleBarCircle data={recuperadosAtivos} />
                    </Box>

                    <Box sx={{
                        width: "100%",
                        marginTop: "20px"
                    }}>
                        <HorizontalBar data={percentualComordidadeObitos} v />
                    </Box>
                </Box>
            </>
    )
}
