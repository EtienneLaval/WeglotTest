const cleanTooSmallTimeIntervals = (intervalArray, minimalTimeInterval) => {
    return intervalArray.filter((interval) => interval[1] - interval[0] >= minimalTimeInterval - 1)
}

const findMatchingIntervalIndex = (sortedAvailableIntervals, timeCodeToFit) => {
    const foundIndex = sortedAvailableIntervals.findIndex(
        (interval) => interval[0] <= timeCodeToFit && interval[1] >= timeCodeToFit,
    )
    if (foundIndex !== -1) {
        return [true, foundIndex]
    }
    const indexBetweenIntervals = sortedAvailableIntervals.findIndex((interval) => interval[0] > timeCodeToFit)
    return [false, indexBetweenIntervals]
}

const removeScheduledInterval = (sortedAvailableIntervals, scheduledInterval) => {
    const start = scheduledInterval[0]
    const end = scheduledInterval[1]
    const [startIndexFound, startIndex] = findMatchingIntervalIndex(sortedAvailableIntervals, start)
    const [endIndexFound, endIndex] = findMatchingIntervalIndex(sortedAvailableIntervals, end)

    const newAvailableIntervals = []
    if (startIndex !== -1) {
        const firstPart = sortedAvailableIntervals.slice(0, startIndex)

        if (startIndexFound) {
            firstPart.push([sortedAvailableIntervals[startIndex][0], start - 1])
        }

        newAvailableIntervals.push(...firstPart)
    } else {
        newAvailableIntervals.push(...sortedAvailableIntervals)
    }

    if (endIndex !== -1) {
        const lastPart = sortedAvailableIntervals.slice(endIndex + 1)
        const targetInterval = sortedAvailableIntervals[endIndex]
        if (endIndexFound) {
            lastPart.unshift([end + 1, targetInterval[1]])
        }
        const isTargetIntervalNowhere =
            !endIndexFound && targetInterval !== newAvailableIntervals[newAvailableIntervals.length - 1]
        if (isTargetIntervalNowhere) {
            lastPart.unshift(sortedAvailableIntervals[endIndex])
        }
        newAvailableIntervals.push(...lastPart)
    }

    return newAvailableIntervals
}

const findEarlyestGloballyAvailableInterval = (
    sortedAvailableIntervals,
    sortedSecheduledIntervals,
    minimalTimeInterval = 60,
) => {
    let mutableSortedAvailableIntervals = JSON.parse(JSON.stringify(sortedAvailableIntervals))
    let i = 0

    while (mutableSortedAvailableIntervals && i < sortedSecheduledIntervals.length) {
        const interval = sortedSecheduledIntervals[i]
        i += 1

        mutableSortedAvailableIntervals = removeScheduledInterval(mutableSortedAvailableIntervals, interval)
        mutableSortedAvailableIntervals = cleanTooSmallTimeIntervals(
            mutableSortedAvailableIntervals,
            minimalTimeInterval,
        )
        if (!mutableSortedAvailableIntervals[0]) {
            break
        }
    }
    const earlyestAvailableInterval = mutableSortedAvailableIntervals[0]
    if (
        earlyestAvailableInterval &&
        earlyestAvailableInterval[1] - earlyestAvailableInterval[0] >= minimalTimeInterval - 1
    ) {
        const matchingInterval = [earlyestAvailableInterval[0], earlyestAvailableInterval[0] + minimalTimeInterval - 1]
        return matchingInterval
    }
    return undefined
}

export { findMatchingIntervalIndex, removeScheduledInterval, findEarlyestGloballyAvailableInterval }
