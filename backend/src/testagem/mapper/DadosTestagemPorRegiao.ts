export async function groupByRegiao({data}) {
    const dadosPorRegiao = {};

    for (const current of data) {
      const {
        id,
        nome,
        latitude,
        longitude,
        regiao,
        testes_realizados,
        tx_negativos,
        tx_positivos,
        tx_com_sintomas,
        tx_sem_sintomas,
        tx_novo_teste,
        variacao_testes_realizados,
        variacao_com_sintomas,
        variacao_sem_sintomas,
        variacao_novo_teste,
      } = current;
      const regiaoUpperCase = regiao.toUpperCase();

      if (!dadosPorRegiao[regiaoUpperCase]) {
        dadosPorRegiao[regiaoUpperCase] = {
          testes_realizados: 0,
          tx_negativos: 0,
          tx_positivos: 0,
          tx_com_sintomas: 0,
          tx_sem_sintomas: 0,
          tx_novo_teste: 0,
          variacao_testes_realizados: 0,
          variacao_com_sintomas: 0,
          variacao_sem_sintomas: 0,
          variacao_novo_teste: 0,
          ubs: [],
        };
      }
      dadosPorRegiao[regiaoUpperCase] = {
        testes_realizados: dadosPorRegiao[regiaoUpperCase].testes_realizados + parseFloat(testes_realizados),
        tx_negativos: dadosPorRegiao[regiaoUpperCase].tx_negativos + parseFloat(tx_negativos),
        tx_positivos: dadosPorRegiao[regiaoUpperCase].tx_positivos + parseFloat(tx_positivos),
        tx_com_sintomas: dadosPorRegiao[regiaoUpperCase].tx_com_sintomas + parseFloat(tx_com_sintomas),
        tx_sem_sintomas: dadosPorRegiao[regiaoUpperCase].tx_sem_sintomas + parseFloat(tx_sem_sintomas),
        tx_novo_teste: dadosPorRegiao[regiaoUpperCase].tx_novo_teste + parseFloat(tx_novo_teste),
        variacao_testes_realizados: dadosPorRegiao[regiaoUpperCase].variacao_testes_realizados + parseFloat(variacao_testes_realizados),
        variacao_com_sintomas: dadosPorRegiao[regiaoUpperCase].variacao_com_sintomas + parseFloat(variacao_com_sintomas),
        variacao_sem_sintomas: dadosPorRegiao[regiaoUpperCase].variacao_sem_sintomas + parseFloat(variacao_sem_sintomas),
        variacao_novo_teste: dadosPorRegiao[regiaoUpperCase].variacao_novo_teste + parseFloat(variacao_novo_teste),
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
