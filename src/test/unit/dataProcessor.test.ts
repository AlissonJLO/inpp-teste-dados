import { describe, it, expect } from 'vitest'
import { calcularMedia, imputarValoresFaltantes } from '../../services/dataProcessor'

describe('Processamento de Dados Ambientais', () => {
  it('deve calcular a média corretamente ignorando valores nulos', () => {
    const valores = [32.0, 34.0, null, 36.0]

    const media = calcularMedia(valores)

    expect(media).toBe(34.0)
  })

  it('deve substituir os valores nulos pela média dos dados válidos', () => {
    const nivelDoRio = [4.2, 4.4, null, 4.6]
    const nivelTratado = imputarValoresFaltantes(nivelDoRio)

    expect(nivelTratado).toEqual([4.2, 4.4, 4.4, 4.6])
  })
})
