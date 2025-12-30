<script setup lang="ts">
import AudioPlayerIndex from './components/AudioPlayer/AudioPlayerIndex.vue'

import type { AudioFileType } from './components/AudioPlayer/types'

import test1 from './assets/1.mp3'
import test2 from './assets/2.mp3'
import { ref } from 'vue'


const audioFiles: AudioFileType[] = [
  {
    id: 1,
    title: 'Пляска дурака',
    artist: 'Рубеж Веков',
    url: test1,
  },
  {
    id: 2,
    title: 'Песнь Песней',
    artist: 'Oxxxymiron',
    url: test2,
  },
]

const model = ref(0);
</script>

<template>
  <div class="flex flex-col w-full h-[100vh] items-center justify-center">
    <AudioPlayerIndex :playlist="audioFiles" v-model="model" />
  </div>
</template>

<style scoped></style>
