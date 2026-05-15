export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

export function formatCEP(value: string): string {
  return value.replace(/^(\d{5})(\d{3})$/, "$1-$2");
}

export function formatCPF(value: string): string {
  return value.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4");
}

export function formatPhone(value: string): string {
  if (value.length === 11) {
    return value.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
  }
  return value.replace(/^(\d{2})(\d{4})(\d{4})$/, "($1) $2-$3");
}
