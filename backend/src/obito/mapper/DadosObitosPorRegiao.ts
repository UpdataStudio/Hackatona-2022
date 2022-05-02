export async function groupByRegiao({data}) {
    const dadosPorRegiao = {};

    for (const current of data) {
      const {
        regiao,
        qt_total_obito,
        qt_novos_obito,
        tx_letalidade,
        tx_mortalidade,
        variacao_total_obitos,
        variacao_novos_obitos,
        id,
        nome,
        latitude,
        longitude,
      } = current;
      const regiaoUpperCase = regiao.toUpperCase();

      if (!dadosPorRegiao[regiaoUpperCase]) {
        dadosPorRegiao[regiaoUpperCase] = {
          qt_total_obito: 0,
          qt_novos_obito: 0,
          tx_letalidade: 0,
          tx_mortalidade: 0,
          variacao_total_obitos: 0,
          variacao_novos_obitos: 0,
          ubs: []
        };
      }
      dadosPorRegiao[regiaoUpperCase] = {
        qt_total_obito: dadosPorRegiao[regiaoUpperCase].qt_total_obito + parseInt(qt_total_obito),
        qt_novos_obito: dadosPorRegiao[regiaoUpperCase].qt_novos_obito + parseInt(qt_novos_obito),
        tx_letalidade: dadosPorRegiao[regiaoUpperCase].tx_letalidade + parseFloat(tx_letalidade),
        tx_mortalidade: dadosPorRegiao[regiaoUpperCase].tx_mortalidade + parseFloat(tx_mortalidade),
        variacao_total_obitos: dadosPorRegiao[regiaoUpperCase].variacao_total_obitos + parseFloat(variacao_total_obitos),
        variacao_novos_obitos: dadosPorRegiao[regiaoUpperCase].variacao_novos_obitos + parseFloat(variacao_novos_obitos),
        ubs: [
          ...dadosPorRegiao[regiaoUpperCase].ubs,
          {
            id,
            nome,
            latitude,
            longitude,
            regiao,
          }
        ],
      };
    }

    return dadosPorRegiao;
}
