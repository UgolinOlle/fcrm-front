export function formatDate(date: Date) {
    const year = date.getFullYear()
    const month = date.getMonth()
    const days = date.getDay()

    return `${year}-${month}-${days}`
}