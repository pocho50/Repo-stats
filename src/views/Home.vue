
<script setup lang="ts">
import SearchForm from '@/components/SearchForm.vue';
import ReposResult from '@/components/RepoResults.vue'
import Alert from '@/components/Alert.vue'
import BarChart from '@/components/BarChart.vue'
import type Search from "@/types/Search";
import useMakeRequest from "@/composables/useMakeRequest"
import { ref } from 'vue';

const loading = ref(false)
const error = ref('')
const activeSearch = ref(false)

const { repos, fetchByTopic } = useMakeRequest()

const handleSearch = async (newSearch: Search) => {

  loading.value = true

  try {
    await fetchByTopic(newSearch)
    error.value = ''
  } catch (e) {
    error.value = e as string
  } finally {
    loading.value = false
    activeSearch.value = true
  }

}
</script>

<template>
  <SearchForm :loading="loading" @@search="handleSearch" />
  <ReposResult v-if="activeSearch && !error" :repos="repos" class="mt-10" />
  <Alert v-if="error" :msg="error" :type="'alert-error'" class="mt-5" />
  <BarChart v-if="repos.length > 0 && !error" :repos="repos" :width="400" :height="400" class="mt-10" />
</template>
