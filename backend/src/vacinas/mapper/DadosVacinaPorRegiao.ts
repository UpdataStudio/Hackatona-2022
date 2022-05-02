export async function groupByRegiao({ data }) {
    const regioes: string[] = [...new Set(data.map(current => current.ds_regiao))] as string[];
    const doses: string[] = [...new Set(data.map(current => current.ds_dose))] as string[];
    const dadosPorRegiao = {};

    for (const current of regioes) {
      const regiao = current.toUpperCase();
      const dadosRegiao = data.filter(d => d.ds_regiao === current);
      
      const dadosDose = doses.reduce((previous, currentDose) => {
        const dadosDoseAtual = dadosRegiao.filter(d => d.ds_dose === currentDose);
        const percentualAplicada = dadosDoseAtual.reduce((prev, curr) => {
          return prev + parseFloat(curr.porcentagem_aplicada)
        }, 0);
        return {...previous, [currentDose]: percentualAplicada / dadosDoseAtual.length}
      }, {});
    
      if (!dadosPorRegiao[regiao]) {
        dadosPorRegiao[regiao] = {};
      }
      dadosPorRegiao[regiao] = {
        ...dadosDose,
        ubs: groupUBS(dadosRegiao, regiao)
      };
    }

    return dadosPorRegiao;
}

function groupUBS(dadosRegiao, regiao) {
  const ubs = {};

  for (const {id, latitude, longitude, nome} of dadosRegiao) {
    if (!ubs[id]) {
      ubs[id] = {id, nome, latitude, longitude, regiao};
    }
  }

  return Object.values(ubs);
}