<template>
  <div class="min-h-screen bg-slate-100 p-6 font-sans text-slate-800">
    <header class="mb-10 text-center">
      <h1 class="text-3xl font-bold text-teal-700 mb-2">Dashboard Ambiental - INPP</h1>
      <p class="text-slate-500 font-medium">Plataforma de Dados Ambientais do Pantanal</p>
    </header>

    <div v-if="loading" class="flex items-center justify-center h-64 text-lg font-medium text-slate-500 animate-pulse">
      Carregando e processando dados...
    </div>

    <div v-else class="max-w-6xl mx-auto space-y-8">
      <!-- Cards de Estatísticas -->
      <section class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-white p-6 rounded-xl shadow-sm border-t-4 border-teal-500 text-center">
          <h3 class="text-slate-500 text-sm font-bold uppercase tracking-wider mb-2">Média de Temperatura</h3>
          <p class="text-4xl font-extrabold text-slate-700">
            {{ stats.temp }} <span class="text-xl text-slate-400">°C</span>
          </p>
        </div>
        <div class="bg-white p-6 rounded-xl shadow-sm border-t-4 border-blue-500 text-center">
          <h3 class="text-slate-500 text-sm font-bold uppercase tracking-wider mb-2">Média Nível do Rio</h3>
          <p class="text-4xl font-extrabold text-slate-700">
            {{ stats.nivel }} <span class="text-xl text-slate-400">m</span>
          </p>
        </div>
        <div class="bg-white p-6 rounded-xl shadow-sm border-t-4 border-emerald-500 text-center">
          <h3 class="text-slate-500 text-sm font-bold uppercase tracking-wider mb-2">Média NDVI</h3>
          <p class="text-4xl font-extrabold text-slate-700">{{ stats.ndvi }}</p>
        </div>
      </section>

      <!-- Gráficos -->
      <section class="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <div class="bg-white p-6 rounded-xl shadow-sm h-[400px]">
          <h2 class="text-center font-bold text-slate-600 mb-4">Evolução: Temperatura vs Nível do Rio</h2>
          <Line :data="chartDataLinha" :options="chartOptionsLinha" />
        </div>
        <div class="bg-white p-6 rounded-xl shadow-sm h-[400px]">
          <h2 class="text-center font-bold text-slate-600 mb-4">Índice de Cobertura Vegetal (NDVI)</h2>
          <Bar :data="chartDataBarra" :options="chartOptionsBarra" />
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line, Bar } from 'vue-chartjs'

import { calcularMedia, imputarValoresFaltantes } from './services/dataProcessor'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend)

interface RecordProcessado {
  data: string
  temperatura_c: number
  nivel_rio_m: number
  ndvi: number
}

const loading = ref(true)
const stats = ref({ temp: 0, nivel: 0, ndvi: 0 })
const chartDataLinha = ref({ labels: [] as string[], datasets: [] as any[] })
const chartDataBarra = ref({ labels: [] as string[], datasets: [] as any[] })

// Configurações visuais dos gráficos
const chartOptionsLinha = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: { type: 'linear' as const, display: true, position: 'left' as const },
    y1: { type: 'linear' as const, display: true, position: 'right' as const, grid: { drawOnChartArea: false } },
  },
}

const chartOptionsBarra = {
  responsive: true,
  maintainAspectRatio: false,
  scales: { y: { min: 0.5 } },
}

const carregarDados = async () => {
  try {
    const response = await fetch('/data/dados_pantanal.csv')
    const rawData = await response.text()
    const lines = rawData.trim().split('\n')

    const rawDatas: string[] = []
    const rawTemps: (number | null)[] = []
    const rawNiveis: (number | null)[] = []
    const rawNdvis: (number | null)[] = []

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i]
      if (!line) continue

      const cols = line.split(',').map((item) => item.trim())
      if (!cols[0]) continue

      rawDatas.push(cols[0])
      rawTemps.push(cols[1] ? Number.parseFloat(cols[1]) : null)
      rawNiveis.push(cols[2] ? Number.parseFloat(cols[2]) : null)
      rawNdvis.push(cols[3] ? Number.parseFloat(cols[3]) : null)
    }

    const tempsTratadas = imputarValoresFaltantes(rawTemps)
    const niveisTratados = imputarValoresFaltantes(rawNiveis)
    const ndvisTratados = imputarValoresFaltantes(rawNdvis)

    stats.value.temp = calcularMedia(tempsTratadas)
    stats.value.nivel = calcularMedia(niveisTratados)
    stats.value.ndvi = calcularMedia(ndvisTratados)

    chartDataLinha.value = {
      labels: rawDatas,
      datasets: [
        {
          label: 'Temperatura (°C)',
          data: tempsTratadas,
          borderColor: '#0ea5e9',
          backgroundColor: '#0ea5e9',
          yAxisID: 'y',
          tension: 0.3,
        },
        {
          label: 'Nível do Rio (m)',
          data: niveisTratados,
          borderColor: '#10b981',
          backgroundColor: '#10b981',
          yAxisID: 'y1',
          tension: 0.3,
        },
      ],
    }

    chartDataBarra.value = {
      labels: rawDatas,
      datasets: [{ label: 'Índice NDVI', data: ndvisTratados, backgroundColor: '#14b8a6', borderRadius: 4 }],
    }
  } catch (error) {
    console.error('Erro ao carregar o arquivo CSV:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  carregarDados()
})
</script>
