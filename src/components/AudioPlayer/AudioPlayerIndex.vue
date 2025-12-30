<script setup lang="ts">
import { onMounted, ref, onUnmounted, watch } from 'vue';

import type { AudioFileType } from './types';

import AudioVolumeRange from './range/AudioVolumeRange.vue';
import ActionsContainer from './buttons/ActionsContainer.vue';

import AudioTimeRange from './range//AudioTimeRange/AudioTimeRange.vue';

import { useActionButtonAudioPlayer } from './buttons/useActionButtonAudioPlayer';
import { useTimeUpdate } from './range/AudioTimeRange/useTimeUpdate';

type Props = {
    playlist: AudioFileType[]
}

const props = defineProps<Props>();

const currentAudio = defineModel<number>({ required: true, default: 0 });
const audioModel = ref<HTMLAudioElement>(new Audio())

const isPlay = ref(false)
const volume = ref(1)

const timeUpdate = useTimeUpdate(audioModel)
const actionButtonAudioPlayer = useActionButtonAudioPlayer(audioModel, isPlay, volume, currentAudio, props.playlist)

function startOrPause() {
    if (isPlay.value)
        audioModel.value.play()
    else
        audioModel.value.pause()
}

onMounted(async () => {
    audioModel.value = new Audio(props.playlist[currentAudio.value]?.url)
    await timeUpdate.start()
})

onUnmounted(() => {
    timeUpdate.finish()
})


watch(audioModel, async () => {
    await timeUpdate.changeAudio()
})
</script>

<template>
    <div class="flex flex-col gap-4 p-4 bg-blue-200 rounded-lg">
        <div class="flex gap-4 items-center">
            <ActionsContainer v-model="isPlay" :current-duration="timeUpdate.duration.value"
                :max-duration="audioModel.duration" :index="currentAudio" :playlist="props.playlist"
                @is-pause="startOrPause()" @next="actionButtonAudioPlayer.nextAudio()"
                @prev="actionButtonAudioPlayer.prevAudio()" />
            <div class="flex flex-col">
                {{ actionButtonAudioPlayer.currentAudioFromPlaylist.value?.artist }}
                <div class="text-gray-500">{{ actionButtonAudioPlayer.currentAudioFromPlaylist.value?.title }}</div>
            </div>
            <AudioVolumeRange v-model="volume" @update:model-value="audioModel.volume = volume" />
        </div>
        <AudioTimeRange v-model="audioModel.currentTime" :min="0" :max-time="audioModel.duration" @next="async () => {
            if (currentAudio + 1 < playlist.length)
                await actionButtonAudioPlayer.nextAudio()
            else
                startOrPause()
        }" />
    </div>
</template>