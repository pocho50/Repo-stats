<script setup lang="ts">
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

import type Repo from '@/types/Repo'
import { computed } from 'vue'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const props = defineProps<{
    repos: Repo[],
    width: number,
    height: number

}>()

const chartData = computed(() => {
    return {
        labels: props.repos.map((repo) => repo.name),
        datasets: [
            {
                label: 'Repositories rank',
                backgroundColor: '#4ABAAF',
                data: props.repos.map((repo) => repo.stars)
            }
        ]
    }
})

</script>

<template>
    <div>
        <Bar :chart-options="{ responsive: true }" :chart-data="chartData" chart-id='bar-chart' dataset-id-key="label"
            :width="width" :height="height" />
    </div>
</template>