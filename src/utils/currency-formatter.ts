
export const currencyFormatters = (value: number) => {
    return new Intl.NumberFormat('es-MX', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value);
}