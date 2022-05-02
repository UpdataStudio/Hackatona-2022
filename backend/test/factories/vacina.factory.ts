
export const create = async function({service, overrides}) {
    const defaultData = {
        pk_ubs_cnes: Math.floor(Math.random() * 1000),
        ds_regiao: 'Região Central',
        tp_estabelecimento: 'UBS',
        nm_estabelecimento: 'UBS 1 - Asa Norte',
        ds_endereco: 'SGAN',
        ds_complemento: 'MODULO D1',
        nu_numero: '905',
        ds_regiao_administrativa: 'Plano Piloto',
        ds_bairro: 'Asa Norte',
        ds_mes: '2021-01-01',
        ds_dose: '1ª dose',
        tx_dose: 0.51,
        qt_aplicada: 26,
        qt_estoque: 32,
        ds_acima_12_anos: 'Sim',
        ds_fabricante: 'Comirnaty (Pfizer/Wyeth)',
    };

    return service.create({
        ...defaultData,
        ...overrides
    });
}