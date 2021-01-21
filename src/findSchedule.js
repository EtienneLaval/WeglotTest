import { stringCalendarToMinutesIntervals, intervalToStringShedule } from './inputOutputUtils'
import { findEarlyestGloballyAvailableInterval } from './timeIntervalsUtils'
import { availableTimeString, minimalTimeInterval } from '../config'

export default (inputCalendar) => {
    const scheduledIntervals = stringCalendarToMinutesIntervals(inputCalendar)
    const sortedSecheduledIntervals = scheduledIntervals.sort((interval1, interval2) => interval1[0] - interval2[0]) // despite it mixinfg high and low level

    const availableIntervals = stringCalendarToMinutesIntervals(availableTimeString)
    const sortedAvailableIntervals = availableIntervals.sort((interval1, interval2) => interval1[0] - interval2[0])

    const matchingInterval = findEarlyestGloballyAvailableInterval(
        sortedAvailableIntervals,
        sortedSecheduledIntervals,
        minimalTimeInterval,
    )
    if (matchingInterval) {
        const matchingScheduleString = intervalToStringShedule(matchingInterval)
        return matchingScheduleString
    }
    return 'no matchinfg interval'
}
