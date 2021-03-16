import { useState, useCallback, Dispatch, SetStateAction } from "react";
import { changeTime } from "$src/time";

export default function useAlarmClock(initialTime: types.Time): ReturnType {
    const [time, setTime] = useState(initialTime);

    const incHours   = useCallback(() => { setTime((time: types.Time) => changeTime(time,  1,  0)); }, [time]);
    const decHours   = useCallback(() => { setTime((time: types.Time) => changeTime(time, -1,  0)); }, [time]);
    const incMinutes = useCallback(() => { setTime((time: types.Time) => changeTime(time,  0,  1)); }, [time]);
    const decMinutes = useCallback(() => { setTime((time: types.Time) => changeTime(time,  0, -1)); }, [time]);

    return { time, setTime, incHours, decHours, incMinutes, decMinutes };
}

type ReturnType = {
    time:       types.Time,
    setTime:    Dispatch<SetStateAction<types.Time>>,
    incHours:   () => void,
    decHours:   () => void,
    incMinutes: () => void,
    decMinutes: () => void
}
