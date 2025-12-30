<script setup lang="ts">
import { computed, watch } from 'vue';

import NextButton from './NextButton.vue';
import PrevButton from './PrevButton.vue';
import StartOrPauseButton from './StartOrPauseButton.vue';
import DownloadButton from './DownloadButton.vue';

import type { AudioFileType } from '../types';

type Props = {
    playlist: AudioFileType[],
    index: number,
    maxDuration: number,
    currentDuration: number
}

type Emits = {
    next: [],
    prev: [],
    isPause: []
}

const props = defineProps<Props>()

const emit = defineEmits<Emits>()

const isPlay = defineModel<boolean>({ default: false, required: true })

const cDuration = computed(() => props.currentDuration)
const maxDuration = computed(() => props.maxDuration)

function updatePlayer() {
    isPlay.value = !isPlay.value
    emit('isPause')
}

function updateAudioPlay() {
    if ((cDuration.value === maxDuration.value) && props.index + 1 === props.playlist.length)
        return isPlay.value = false
    if (cDuration.value === maxDuration.value)
        return emit('next')
}

watch(() => cDuration.value, () => {
    updateAudioPlay()
})
</script>

<template>
    <div class="flex gap-4">
        <DownloadButton :list-audio="props.playlist[props.index]" />
        <PrevButton :disabled="props.index === 0" @click="emit('prev')" />
        <StartOrPauseButton :audio-pause="isPlay" @click="updatePlayer()" />
        <NextButton :disabled="(props.index + 1) === props.playlist.length" @click="emit('next')" />
    </div>
</template>