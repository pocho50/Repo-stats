<script setup lang="ts">
import TheNavBar from '@/components/TheNavbar.vue'
import SearchForm from '@/components/SearchForm.vue';
import ReposResult from '@/components/RepoResults.vue'
import type Search from "@/types/Search";
import useMakeRequest from "@/composables/useMakeRequest"
import { ref } from 'vue';

const loading = ref(false)

const { repos, fetchByTopic } = useMakeRequest()

const handleSearch = async (newSearch: Search) => {

  loading.value = true

  try {
    await fetchByTopic(newSearch)
    console.log(repos)
  } catch (e) {
    console.log(e)
  } finally {
    loading.value = false
  }

}

</script>

<template>
  <TheNavBar />
  <div class="container mx-auto w-5/6  p-4">
    <SearchForm :loading="loading" @@search="handleSearch" />
    <ReposResult :repos="repos" class="pt-10" />
  </div>

</template>
