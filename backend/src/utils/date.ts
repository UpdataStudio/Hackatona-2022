/** A data chega no formato 'MM de YYYY' */
export const decrementaMes = (data: string) => {
  const [ano, mes] = data ? data.split('-') : [];

  if (!mes || !ano) {
    return null;
  }
  const mesAsNumber = parseInt(mes, 10);
  const anoAsNumber = parseInt(ano, 10);

  const MES_JANEIRO = '01';
  const MES_DEZEMBRO = '12';

  const mesAnterior =
    mes === MES_JANEIRO
      ? `${MES_DEZEMBRO} de ${anoAsNumber - 1}`
      : `${String(mesAsNumber - 1).padStart(2, '0')} de ${ano}`;

  return mesAnterior;
};
