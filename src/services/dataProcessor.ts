/**
 * Calcula a média de um array de números, ignorando os valores nulos.
 * @param valores Array contendo números e possíveis falhas (null)
 * @returns O valor da média calculado
 */
export function calcularMedia(valores: (number | null)[]): number {
  const validos = valores.filter((v): v is number => v !== null)

  if (validos.length === 0) return 0

  const soma = validos.reduce((acc, val) => acc + val, 0)

  return Number.parseFloat((soma / validos.length).toFixed(2))
}

/**
 * Substitui os valores nulos de um array pela média dos valores válidos (Imputação pela média).
 * @param valores Array com a série temporal que possui dados faltantes
 * @returns Um novo array com os dados contínuos e sem valores nulos
 */
export function imputarValoresFaltantes(valores: (number | null)[]): number[] {
  const media = calcularMedia(valores)

  return valores.map((valor) => (valor === null ? media : valor))
}
