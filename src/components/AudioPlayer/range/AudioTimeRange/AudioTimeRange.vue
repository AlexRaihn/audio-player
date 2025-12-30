<script setup lang="ts">
import { computed, watch } from 'vue';
import { formatAudioTime } from '../../composables/formatTime';

type Props = {
    maxTime: number
}

type Emits = {
    next: [],
    prev: [],
}

const props = defineProps < Props > ()
const emit = defineEmits < Emits > ()

const duration = defineModel < number > ({ default: 0 })

const normalDuration = computed(() => {
    return formatAudioTime(duration.value)
})

watch(duration, () => {
    if (duration.value === props.maxTime) {
        emit('prev')
        emit('next')
    }
})
</script>

<template>
    <div class="flex gap-4 items-center w-full">
        {{ normalDuration }}
        <input type="range" class="w-full" v-model.number="duration" :min="0" :max="props.maxTime" v-bind="$attrs" />
        {{ formatAudioTime(props.maxTime) }}
    </div>
</template>