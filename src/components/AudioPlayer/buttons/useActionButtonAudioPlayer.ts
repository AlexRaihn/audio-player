import { computed, nextTick, type Ref } from "vue"
import type { AudioFileType } from "../types"

export const useActionButtonAudioPlayer = (audioModel: Ref<HTMLAudioElement>, isPlay: Ref<boolean>, volume: Ref<number>, playlistIndex: Ref<number>, playlist: AudioFileType[]) => {
    const currentAudioFromPlaylist = computed<AudioFileType | null>(() => {
        if (playlistIndex.value >= playlist.length)
            return null

        return playlist[playlistIndex.value] ?? null
    })

    function updateAudio() {
        if (!currentAudioFromPlaylist.value)
            return

        const url = currentAudioFromPlaylist.value.url

        audioModel.value.pause()

        if (url.length === 0)
            return

        audioModel.value = new Audio(url)
        audioModel.value.volume = volume.value
        isPlay.value = true
        audioModel.value.play()
    }

    async function nextAudio() {
        if (playlistIndex.value + 1 < playlist.length) {
            playlistIndex.value++
            await nextTick()
            updateAudio()
        }
    }

    async function prevAudio() {
        if (playlistIndex.value > 0) {
            playlistIndex.value--
            await nextTick()
            updateAudio()
        }
    }

    return {
        currentAudioFromPlaylist,
        updateAudio,
        nextAudio,
        prevAudio,
    }
}