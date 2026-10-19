export function getDataFormatada(data) {
  const dia = String(data.getDate()).padStart(2, '0');
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  return `${dia}/${mes}/${data.getFullYear()}`;
}

export function diasAtras(qtd) {
  const d = new Date();
  d.setDate(d.getDate() - qtd);
  return d;
}