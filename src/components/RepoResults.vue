<script setup lang="ts">

import type Repo from '@/types/Repo';
import Alert from '@/components/Alert.vue'
import msg from '@/messages'

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
                    <td>
                        <router-link class="link link-accent" :to="{ name: 'Repo', params: { id: repo.id } }"
                            target="_blank">
                            {{ repo.name }}
                        </router-link>

                    </td>
                    <td>{{ repo.url }}</td>
                    <td>{{ repo.stars }}</td>
                </tr>
            </tbody>
        </table>
    </div>
    <Alert v-else :msg="msg.EMPTY_RESULT" type="alert-default" />
</template>