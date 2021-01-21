import fs from 'fs'

const minutesInADay = 1440

const readFile = (adress) => {
    try {
        const fileString = fs.readFileSync(adress, 'utf8')
        return fileString
    } catch (err) {
        throw new Error('error reding file')
    }
}

const writeFile = (adress, content) => {
    try {
        const fileString = fs.writeFileSync(adress, content, 'utf8')
        return fileString
    } catch (err) {
        throw new Error('error reding file')
    }
}

const stringScheduleToInterval = (scheduleString) => {
    const [day, startHour, startMinute, endHour, endMinute] = scheduleString.split(/ |:|-/)
    const dayMinutesOffset = minutesInADay * day
    const startFullMinutes = dayMinutesOffset + startHour * 60 + Number(startMinute)
    const endFullMinutes = dayMinutesOffset + endHour * 60 + Number(endMinute)
    return [startFullMinutes, endFullMinutes]
}

const to2Digits = (int) => (int < 10 ? `0${int}` : int)

const intervalToStringShedule = (interval) => {
    const start = interval[0] // I willingly don't take in account the possibility of a 2 days 1hour span interval
    const day = Math.floor(start / minutesInADay)
    const startHour = Math.floor((start - minutesInADay * day) / 60)
    const startMinute = start - minutesInADay * day - startHour * 60

    const end = interval[1]
    const endHour = Math.floor((end - minutesInADay * day) / 60)

    const endMinute = end - minutesInADay * day - endHour * 60

    return `${day} ${to2Digits(startHour)}:${to2Digits(startMinute)}-${to2Digits(endHour)}:${to2Digits(endMinute)}`
}

const stringCalendarToMinutesIntervals = (calendarString) => {
    const calendarArray = calendarString.split(/\n/)
    const minutesIntervals = calendarArray.map(stringScheduleToInterval)
    return minutesIntervals
}

export { readFile, writeFile, stringScheduleToInterval, intervalToStringShedule, stringCalendarToMinutesIntervals }
