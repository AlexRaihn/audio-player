<script setup lang="ts">
const volume = defineModel<number>({ default: 1 })
</script>

<template>
    <div class="flex gap-4 items-center">
        <input type="range" v-model.number="volume" step="0.01" min="0" max="1" />
        {{ (volume * 100).toFixed(0) }}
    </div>
</template>