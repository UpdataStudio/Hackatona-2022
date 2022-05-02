export async function pivotTipoTeste({data}) {
    const dadosPorTipoTeste = {};
    const tiposTeste: string[] = [...new Set(data.map(d => d.toJSON().tipo_teste))] as string[];

    for (const current of data) {
      const { quantidade, tipo_teste, mes } = current.toJSON();

      if (!dadosPorTipoTeste[mes]) {
        dadosPorTipoTeste[mes] = {
          mes: translateData(mes),
          ...tiposTeste.reduce((prev, curr) => ({...prev, [curr]: 0 }), {})
        };
      }
      dadosPorTipoTeste[mes] = {
        ...dadosPorTipoTeste[mes],
        ...tiposTeste.reduce((prev, curr) => {
          if (curr !== tipo_teste) {
            return prev;
          }
          return {
            ...prev,
            [curr]: dadosPorTipoTeste[mes][curr] + parseInt(quantidade),
          };
        }, {}),
      };
    }

    return Object.values(dadosPorTipoTeste);
}

function translateData(data: string) {
  const [ano, mes] = data.split('-');

  const mesesTranslator = {
    '01': 'Jan',
    '02': 'Fev',
    '03': 'Mar',
    '04': 'Abr',
    '05': 'Mai',
    '06': 'Jun',
    '07': 'Jul',
    '08': 'Ago',
    '09': 'Set',
    '10': 'Out',
    '11': 'Nov',
    '12': 'Dez',
  };

  return `${mesesTranslator[mes]}/${ano}`;
}