<script setup lang="ts">
import TheNavBar from '@/components/TheNavbar.vue'
import SearchForm from '@/components/SearchForm.vue';
import ReposResult from '@/components/RepoResults.vue'
import { ref } from 'vue';

const loading = ref(false)
</script>

<template>
  <TheNavBar />
  <div class="container mx-auto w-5/6  p-4">
    <SearchForm :loading="loading" />
    <ReposResult />

  </div>

</template>
