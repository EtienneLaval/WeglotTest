import {
    stringScheduleToInterval,
    intervalToStringShedule,
    stringCalendarToMinutesIntervals,
} from '../src/inputOutputUtils'

describe('inputOutputUtils', () => {
    describe('stringScheduleToInterval', () => {
        test('should parse a standard schedule string into a pair of minutes', () => {
            const expectedInterval = [3620, 3767]
            const actualInterval = stringScheduleToInterval('2 12:20-14:47')

            expect(actualInterval).toStrictEqual(expectedInterval)
        })
    })
    describe('intervalToStringShedule', () => {
        test('should parse interval into string schedule', () => {
            const expectedSchedule = '2 12:20-14:07'
            const actualSchedule = intervalToStringShedule([3620, 3727])

            expect(actualSchedule).toBe(expectedSchedule)
        })
    })
    describe('stringCalendarToMinutesIntervals', () => {
        test('should parse as multi schedule string into a set of minutes pairs ', () => {
            const expectedIntervals = [
                [3620, 3767],
                [8056, 8204],
            ]
            const actualIntervals = stringCalendarToMinutesIntervals('2 12:20-14:47\n5 14:16-16:44')

            expect(actualIntervals).toStrictEqual(expectedIntervals)
        })
    })
})
