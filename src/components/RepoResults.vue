<script setup lang="ts">
import type Repo from '@/types/Repo';
const props = defineProps<{
    repos: Repo[],
}>()

</script>

<template>
    <div class="overflow-x-auto">
        <table class="table table-zebra w-full">
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
</template>