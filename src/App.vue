<script setup lang="ts">
import TheNavBar from '@/components/TheNavbar.vue'
import SearchForm from '@/components/SearchForm.vue';
import ReposResult from '@/components/RepoResults.vue'
import Alert from '@/components/Alert.vue'
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
  <TheNavBar />
  <div class="container mx-auto w-5/6  p-4">
    <SearchForm :loading="loading" @@search="handleSearch" />
    <ReposResult v-if="activeSearch && !error" :repos="repos" class="mt-10" />
    <Alert v-if="error" :msg="error" :type="'alert-error'" class="mt-5" />
  </div>

</template>
