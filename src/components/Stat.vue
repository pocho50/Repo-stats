<script setup lang="ts">
const props = defineProps<{
    title: string,
    text: string | number | undefined,
}>()

</script>

<template>
    <div class="stat">
        <div class="stat-figure text-secondary">
            <slot />
        </div>
        <div class="stat-title">{{ title }}</div>
        <div class="stat-value">{{ text || 0 }}</div>
    </div>
</template>