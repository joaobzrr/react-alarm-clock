import { mod } from "$src/utils";

const MAX_HOUR   = 24;
const MAX_MINUTE = 60;
const MILLISECONDS_IN_A_DAY = 86400000;

export function calcTimeUntilAlert({hours, minutes}: types.Time): number {
    const d = new Date();
    d.setHours(hours, minutes, 0, 0);

    let targetTime = d.getTime();
    const currentTime = Date.now();
    if (targetTime < currentTime) {
        targetTime += MILLISECONDS_IN_A_DAY;
    }

    return targetTime - currentTime;
}

export function changeTime(time: types.Time, hours: number, minutes: number): types.Time {
    const result = Object.assign({}, time);
    result.hours = mod((result.hours + hours), MAX_HOUR);
    result.minutes = mod((result.minutes + minutes), MAX_MINUTE);
    return result;
}

export function getCurrentTime(): types.Time {
    const d = new Date();
    return {hours: d.getHours(), minutes: d.getMinutes()};
}

export function formatTime({hours, minutes}: types.Time): string {
    const hoursString = hours.toString().padStart(2, "0");
    const minutesString = minutes.toString().padStart(2, "0");
    return `${hoursString}:${minutesString}`;
}
