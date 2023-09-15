export const formatNumber = (
  value?: string | number,
  maximumFractionDigits = 2,
  minimumFractionDigits?: number
) => {
  if (!value) {
    return '0';
  }

  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits,
    minimumFractionDigits,
  }).format(Number(value));
};

export const displayAmount = ({
  value,
  isFormat = true,
  currencySymbol = '$',
  maximumFractionDigits = 2,
  minimumFractionDigits,
}: {
  value: string | number;
  isFormat?: boolean;
  currencySymbol?: string;
  maximumFractionDigits?: number;
  minimumFractionDigits?: number;
}) => {
  const val = Number(value);

  if (isFormat) {
    if (value < 0)
      return `-${currencySymbol}${formatNumber(
        val * -1,
        maximumFractionDigits,
        minimumFractionDigits
      )}`;

    return `${currencySymbol}${formatNumber(
      val,
      maximumFractionDigits,
      minimumFractionDigits
    )}`;
  } else {
    if (value < 0) return `-${currencySymbol}${val * -1}`;

    return `${currencySymbol}${val}`;
  }
};
