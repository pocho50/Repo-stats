<script setup lang="ts">
import { useRoute } from 'vue-router'
import useMakeRequest from "@/composables/useMakeRequest"
import { ref, onMounted } from 'vue';
import Alert from "@/components/Alert.vue"
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

      <div class="stat flex-1">
        <div class="stat-figure text-secondary">
          <StarIcon class="w-10 h-10" />
        </div>
        <div class="stat-title">Stars</div>
        <div class="stat-value">{{ repo?.stars }}</div>
      </div>

      <div class="stat flex-1">
        <div class="stat-figure text-secondary">
          <EyeIcon class="w-10 h-10" />
        </div>
        <div class="stat-title">watchers</div>
        <div class="stat-value">{{ repo?.watchers }}</div>
      </div>

      <div class="stat flex-1">
        <div class="stat-figure text-secondary">
          <DocumentDuplicateIcon class="w-10 h-10" />
        </div>
        <div class="stat-title">forks</div>
        <div class="stat-value">{{ repo?.forks }}</div>
      </div>

    </div>

    <div class="stats flex flex-wrap shadow mt-5 bg-base-200">

      <div class="stat flex-1">
        <div class="stat-figure text-secondary">
          <DocumentMagnifyingGlassIcon class="w-10 h-10" />
        </div>
        <div class="stat-title">open issue</div>
        <div class="stat-value">{{ repo?.openIssue }}</div>
      </div>

      <div class="stat flex-1">
        <div class="stat-figure text-secondary">
          <UserCircleIcon class="w-10 h-10" />
        </div>
        <div class="stat-title">subscribers</div>
        <div class="stat-value">{{ repo?.subscribers }}</div>
      </div>

      <div class="stat flex-1">
        <div class="stat-figure text-secondary">
          <ChartBarIcon class="w-10 h-10" />
        </div>
        <div class="stat-title">size</div>
        <div class="stat-value">{{ repo?.size }} kb</div>
      </div>

    </div>
  </div>

  <router-link class="btn btn-default mt-5" :to="{ name: 'Home' }">
    &lt&lt Volver </router-link>
</template>

