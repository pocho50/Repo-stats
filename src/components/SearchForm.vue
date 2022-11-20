<script setup lang="ts">
import AppButton from '@/components/AppButton.vue'
import { ref } from 'vue';
import type Search from '@/types/Search'

const props = defineProps<{
    loading?: boolean
}>()

const topic = ref('')
const stars = ref(0)

// events
const emit = defineEmits<{
    (e: "@search", serach: Search): void;
}>();

const handleSubmit = () => {
    emit("@search", {
        topic: topic.value,
        stars: stars.value,
    });
}
</script>

<template>
    <div class="card bg-base-300 shadow-lg">
        <div class="card-body">
            <h2 class="card-title">Buscar repo con mas estrellas</h2>
            <form @submit.prevent="handleSubmit">
                <div class="flex  flex-wrap  flex-row mt-3 gap-x-2.5 ">
                    <div class="flex-auto ">
                        <label class="label">
                            <span class="label-text">Topic</span>
                        </label>
                        <input type="text" v-model="topic" placeholder="Topic. Ejemplo: javascript, php, etc"
                            class="text-base-content input input-bordered w-full" />
                    </div>

                    <div class="flex-auto ">
                        <label class="label">
                            <span class="label-text">Minimo estrellas</span>
                        </label>
                        <input type="number" v-model="stars" placeholder="Estrellas" min="0"
                            class="text-base-content input input-bordered w-full" />
                    </div>
                </div>

                <div class="card-actions justify-end mt-3">
                    <AppButton :loading="loading" type="submit" class="btn-accent">
                        Buscar
                    </AppButton>
                </div>
            </form>
        </div>
    </div>
</template>