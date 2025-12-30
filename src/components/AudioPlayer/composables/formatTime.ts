// делаем время формата mm:ss
export function formatAudioTime(sec: number) {
    if (isNaN(sec))
        return '00:00'

    const h = Math.floor(sec / 3600)
    const m = Math.floor((sec % 3600) / 60)
    const s = Math.floor(sec % 60)

    // добавляем ведущие нули
    const hh = h > 0 ? String(h).padStart(2, '0') + ':' : ''
    const mm = String(m).padStart(2, '0')
    const ss = String(s).padStart(2, '0')

    return hh + mm + ':' + ss
}