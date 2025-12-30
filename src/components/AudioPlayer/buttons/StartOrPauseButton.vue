<script setup lang="ts">
type Props = {
    audioPause: boolean
}

const props = defineProps<Props>()
</script>

<template>
    <button class="audio-btn">
        <i class="fa-solid fa-play" v-if="!audioPause"></i>
        <i class="fa-solid fa-pause" v-else></i>
    </button>
</template>

<style scoped>
@import url('../styles/btn.css');
</style>