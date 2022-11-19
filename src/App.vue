<script setup lang="ts">
import TheNavBar from '@/components/TheNavbar.vue'
import searchForm from '@/components/searchForm.vue';
import { ref } from 'vue';

const loading = ref(false)
</script>

<template>
  <TheNavBar />
  <div class="container mx-auto  p-4">
    <searchForm :loading="loading" />
  </div>

</template>
