import { readFile, writeFile } from './inputOutputUtils'
import { defaultInputAdress, defaultOutputAdress } from '../config'
import findSchedule from './findSchedule'

const inputCalendar = readFile(defaultInputAdress)
const schedule = findSchedule(inputCalendar)
console.log(schedule)
writeFile(defaultOutputAdress, schedule)
