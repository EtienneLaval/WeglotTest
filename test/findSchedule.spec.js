import findSchedule from '../src/findSchedule'
import { readFile } from '../src/inputOutputUtils'

describe('findSchedule', () => {
    test('input1', () => {
        const expectedSchedule = readFile('./data/output1.txt')

        const inputCalendar = readFile('./data/input1.txt')
        const actualSchedule = findSchedule(inputCalendar)

        expect(actualSchedule).toBe(expectedSchedule)
    })
    test('input2', () => {
        const expectedSchedule = readFile('./data/output2.txt')

        const inputCalendar = readFile('./data/input2.txt')
        const actualSchedule = findSchedule(inputCalendar)

        expect(actualSchedule).toBe(expectedSchedule)
    })
    test('input3', () => {
        const expectedSchedule = readFile('./data/output3.txt')

        const inputCalendar = readFile('./data/input3.txt')
        const actualSchedule = findSchedule(inputCalendar)

        expect(actualSchedule).toBe(expectedSchedule)
    })
    test('input4', () => {
        const expectedSchedule = readFile('./data/output4.txt')

        const inputCalendar = readFile('./data/input4.txt')
        const actualSchedule = findSchedule(inputCalendar)

        expect(actualSchedule).toBe(expectedSchedule)
    })
    test('input5', () => {
        const expectedSchedule = readFile('./data/output5.txt')

        const inputCalendar = readFile('./data/input5.txt')
        const actualSchedule = findSchedule(inputCalendar)

        expect(actualSchedule).toBe(expectedSchedule)
    })
})
