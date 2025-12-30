<script setup lang="ts">
import type { AudioFileType } from '../types';

type Props = {
    listAudio?: AudioFileType
}

const props = defineProps<Props>()

async function downloadAudio() {
    if (!props.listAudio)
        return
    try {
        const response = await fetch(props.listAudio.url)
        const blob = await response.blob()
        const blobUrl = URL.createObjectURL(blob)

        const link = document.createElement('a')
        link.href = blobUrl
        link.download = `${props.listAudio.artist} - ${props.listAudio.title}`
        link.click()

        URL.revokeObjectURL(blobUrl)

    } catch (err) {
        console.log(err)
        alert('Ошибка!')
    }
}
</script>

<template>
    <button class="audio-btn" :disabled="!props.listAudio" @click="downloadAudio">
        <i class="fa-solid fa-download"></i>
    </button>
</template>

<style src="../styles/btn.css" />