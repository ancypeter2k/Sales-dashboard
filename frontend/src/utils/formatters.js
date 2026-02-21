const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const integerFormatter = new Intl.NumberFormat("en-US");

export function formatCurrency(value) {
  return currencyFormatter.format(Number(value) || 0);
}

export function formatInteger(value) {
  return integerFormatter.format(Number(value) || 0);
}

export function formatPercent(value) {
  return `${Math.round((Number(value) || 0) * 100)}%`;
}

export function formatDateLabel(value) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}
