<script setup lang="ts">
import type Repo from '@/types/Repo';
import Alert from '@/components/Alert.vue'

const props = defineProps<{
    repos: Repo[],
}>()

</script>

<template>
    <div v-if="repos.length > 0" class="overflow-x-auto">
        <table class="table table-compact w-full">
            <!-- head -->
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Url</th>
                    <th>Stars</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="repo in repos" :key="repo.id">
                    <td>{{ repo.name }}</td>
                    <td>{{ repo.url }}</td>
                    <td>{{ repo.stars }}</td>
                </tr>
            </tbody>
        </table>
    </div>
    <Alert v-else msg="No hay resultados" type="alert-default" />
</template>