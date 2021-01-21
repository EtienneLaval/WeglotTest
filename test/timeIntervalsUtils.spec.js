import {
    findMatchingIntervalIndex,
    removeScheduledInterval,
    findEarlyestGloballyAvailableInterval,
} from '../src/timeIntervalsUtils'

describe('timeIntervalsUtils', () => {
    describe('findMatchingIntervalIndex', () => {
        test('given a number and an array of sorted intervals, when an interval contains the number, should return it ', () => {
            const intervalSet = [
                [0, 5],
                [10, 15],
            ]
            const number = 10
            const expectedResult = [true, 1]
            const actualResult = findMatchingIntervalIndex(intervalSet, number)

            expect(actualResult).toStrictEqual(expectedResult)
        })
        test('given a number and an array of sorted intervals, when no interval contains the number, should return the interval after it', () => {
            const intervalSet = [
                [0, 5],
                [10, 15],
            ]
            const number = 9
            const expectedResult = [false, 1]
            const actualResult = findMatchingIntervalIndex(intervalSet, number)

            expect(actualResult).toStrictEqual(expectedResult)
        })
        test('given a number and an array of sorted intervals, when the number is after all of them, should return -1', () => {
            const intervalSet = [
                [0, 5],
                [10, 15],
            ]
            const number = 16
            const expectedResult = [false, -1]
            const actualResult = findMatchingIntervalIndex(intervalSet, number)

            expect(actualResult).toStrictEqual(expectedResult)
        })
    })

    describe('removeScheduledInterval', () => {
        test("given a set of sorted intervals A and an interval B, when B fits in one of A's interval, should remove A from B", () => {
            const intervalSet = [
                [10, 15],
                [20, 25],
            ]
            const intervalToRemove = [12, 13]

            const expectedResult = [
                [10, 11],
                [14, 15],
                [20, 25],
            ]

            const actualResult = removeScheduledInterval(intervalSet, intervalToRemove)
            expect(actualResult).toStrictEqual(expectedResult)
        })
        test("given a set of sorted intervals A and an interval B, when B fits between several of A's interval, should remove A from B", () => {
            const intervalSet = [
                [10, 15],
                [17, 18],
                [20, 25],
            ]
            const intervalToRemove = [12, 20]

            const expectedResult = [
                [10, 11],
                [21, 25],
            ]

            const actualResult = removeScheduledInterval(intervalSet, intervalToRemove)
            expect(actualResult).toStrictEqual(expectedResult)
        })
        test("given a set of sorted intervals A and an interval B, when B fits between of A's intervals only by one side, should remove A from B", () => {
            const intervalSet = [
                [1, 5],
                [10, 15],
                [20, 25],
            ]
            const intervalToRemove = [6, 21]

            const expectedResult = [
                [1, 5],
                [22, 25],
            ]

            const actualResult = removeScheduledInterval(intervalSet, intervalToRemove)
            expect(actualResult).toStrictEqual(expectedResult)
        })
        test("given a set of sorted intervals A and an interval B, when B fits none of A's intervals, should remove nothing in A", () => {
            const intervalSet = [
                [10, 15],
                [20, 25],
            ]
            const intervalToRemove = [16, 17]

            const expectedResult = [
                [10, 15],
                [20, 25],
            ]

            const actualResult = removeScheduledInterval(intervalSet, intervalToRemove)
            expect(actualResult).toStrictEqual(expectedResult)
        })
    })

    describe('findEarlyestGloballyAvailableInterval', () => {
        test('find the earlyest 3 long interval, in a sorted set of intervals, with a sorted set of impossible intervals', () => {
            const intervalSet = [
                [10, 15],
                [20, 25],
                [30, 40],
            ]
            const impossibleIntervals = [
                [11, 26],
                [27, 28],
                [35, 38],
            ]
            const expectedResult = [30, 32]

            const actualResult = findEarlyestGloballyAvailableInterval(intervalSet, impossibleIntervals, 3)
            expect(actualResult).toStrictEqual(expectedResult)
        })
    })
})
