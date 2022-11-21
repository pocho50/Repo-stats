<script setup lang="ts">
import TheNavBar from '@/components/TheNavbar.vue'


</script>

<template>
  <TheNavBar />
  <div class="container mx-auto w-5/6  p-4">
    <router-view></router-view>
  </div>

</template>
