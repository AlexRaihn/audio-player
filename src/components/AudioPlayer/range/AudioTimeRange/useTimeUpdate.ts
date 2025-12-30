import { nextTick, ref } from "vue"

export const useTimeUpdate = (audio = ref<HTMLAudioElement>(new Audio())) => {
    const duration = ref<number>(0)

    function setDuration() {
        duration.value = audio.value.currentTime
    }

    async function changeAudio() {
        audio.value.removeEventListener('timeupdate', setDuration)
        await nextTick()
        audio.value.addEventListener('timeupdate', setDuration)
    }

    async function start() {
        audio.value.addEventListener('timeupdate', setDuration)
    }

    function finish() {
        audio.value.removeEventListener('timeupdate', setDuration)
    }

    return {
        start,
        finish,
        changeAudio,
        duration,
    }
}