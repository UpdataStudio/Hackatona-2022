interface INumberFormatParams {
    value: number | string,
    precision?: number,
};

export function format({ value, precision = 0 }: INumberFormatParams) {
    if (!value) return value;
    if (typeof value === 'string') {
      value = parseFloat(value);
    }
    
    const params = {
      style: 'decimal',
      maximumFractionDigits: precision,
      minimumFractionDigits: precision,
    };
  
    return new Intl.NumberFormat('pt-BR', params).format(value);
}
  
export function addSignal(value: number | string) {
    if (!value) return value;
    if (typeof value === 'string') {
      value = parseFloat(value);
    }
  
    return value > 0 ? `+${value.toFixed(2)}%` : `${value.toFixed(2)}%`;
}