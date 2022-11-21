<script setup lang="ts">
import { useRoute } from 'vue-router'
import useMakeRequest from "@/composables/useMakeRequest"
import { ref, onMounted } from 'vue';
import Alert from "@/components/Alert.vue"
import Stat from "@/components/Stat.vue"

import {
  StarIcon, EyeIcon,
  DocumentDuplicateIcon,
  DocumentMagnifyingGlassIcon,
  UserCircleIcon, ChartBarIcon
} from '@heroicons/vue/24/outline';

const { repo, fetchById } = useMakeRequest()
const route = useRoute()
const error = ref('')
const id = route.params?.id as string

onMounted(async () => {
  try {
    await fetchById(id)
  } catch (e) {
    error.value = e as string
  }
})

</script>
<template>
  <div class="text-sm breadcrumbs">
    <ul>
      <li>
        <router-link class="link link-accent" :to="{ name: 'Home' }">
          Home
        </router-link>
      </li>
      <li>{{ repo?.name }}</li>
    </ul>
  </div>
  <Alert v-if="error" :msg="error" type="alert-error" />
  <div v-else>
    <h1 class="text-2xl mt-5">{{ repo?.name }}</h1>
    <p>{{ repo?.description }}</p>
    <div class="stats flex flex-wrap shadow mt-5 bg-base-200">

      <Stat :title="'Stars'" :text="repo?.stars" class="flex-1">
        <StarIcon class="w-10 h-10" />
      </Stat>

      <Stat :title="'Watchers'" :text="repo?.watchers" class="flex-1">
        <EyeIcon class="w-10 h-10" />
      </Stat>

      <Stat :title="'Forks'" :text="repo?.forks" class="flex-1">
        <DocumentDuplicateIcon class="w-10 h-10" />
      </Stat>

    </div>

    <div class="stats flex flex-wrap shadow mt-5 bg-base-200">

      <Stat :title="'Open issue'" :text="repo?.openIssue" class="flex-1">
        <DocumentMagnifyingGlassIcon class="w-10 h-10" />
      </Stat>

      <Stat :title="'Subscribers'" :text="repo?.subscribers" class="flex-1">
        <UserCircleIcon class="w-10 h-10" />
      </Stat>

      <Stat :title="'Size'" :text="`${repo?.size} kb`" class="flex-1">
        <ChartBarIcon class="w-10 h-10" />
      </Stat>

    </div>
  </div>

  <router-link class="btn btn-default mt-5" :to="{ name: 'Home' }">
    &lt&lt Volver </router-link>
</template>

