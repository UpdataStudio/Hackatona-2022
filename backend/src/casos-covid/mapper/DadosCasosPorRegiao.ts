export async function groupByRegiao({data, ubsModel}) {
    const dadosPorRegiao = {};

    for (const current of data) {
      const {regiao, ...attributes} = current.toJSON();
      const regiaoUpperCase = regiao.toUpperCase();

      const ubsDaRegiao = await ubsModel.findAll({
        where: { ds_regiao: regiao },
        attributes: [
          ['pk_ubs_cnes', 'id'],
          ['nm_estabelecimento','nome'],
          ['co_lat', 'latitude'],
          ['co_lon', 'longitude'],
          ['ds_regiao', 'regiao'],
        ]
      });
    
      if (!dadosPorRegiao[regiaoUpperCase]) {
        dadosPorRegiao[regiaoUpperCase] = {};
      }
      dadosPorRegiao[regiaoUpperCase] = {...attributes, ubs: ubsDaRegiao};
    }

    return dadosPorRegiao;
}