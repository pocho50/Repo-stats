<script setup lang="ts">
const props = defineProps<{
    msg: string,
    type: string
}>()

</script>

<template>
    <div class="alert shadow-lg" :class="type">
        <div class="mx-auto">
            <span>{{ msg }}</span>
        </div>
    </div>
</template>