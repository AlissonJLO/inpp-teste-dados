/**
 * Calcula a média de um array de números, ignorando os valores nulos.
 * @param valores Array contendo números e possíveis falhas (null)
 * @returns O valor da média calculado
 */
export function calcularMedia(valores: (number | null)[]): number {
  // Isola apenas os valores numéricos válidos
  const validos = valores.filter((v): v is number => v !== null)

  // Evita divisão por zero caso o array venha apenas com nulos
  if (validos.length === 0) return 0

  // Soma todos os valores e divide pela quantidade de válidos
  const soma = validos.reduce((acc, val) => acc + val, 0)

  // Retorna com segurança garantindo no máximo 2 casas decimais
  return Number.parseFloat((soma / validos.length).toFixed(2))
}

/**
 * Substitui os valores nulos de um array pela média dos valores válidos (Imputação pela média).
 * @param valores Array com a série temporal que possui dados faltantes
 * @returns Um novo array com os dados contínuos e sem valores nulos
 */
export function imputarValoresFaltantes(valores: (number | null)[]): number[] {
  const media = calcularMedia(valores)

  // Mapeia o array original: se for nulo, injeta a média. Se não, mantém o valor.
  return valores.map((valor) => (valor === null ? media : valor))
}
