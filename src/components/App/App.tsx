import React, { useState, useRef, useCallback } from "react";
import Clock from "$components/Clock";
import Controls from "$components/Controls";
import useConstructor from "$hooks/useConstructor";
import HighResolutionTimer from "$src/HighResolutionTimer";
import { calcTimeUntilAlert, changeTime, getCurrentTime } from "$src/time";
import "./App.scss";

export default function App() {
    const [mode, setMode] = useState<types.AlarmClockMode>("idle");
    const [time, setTime] = useState<types.Time>({hours: 0, minutes: 0});
    const timeoutId = useRef<number>();

    useConstructor(() => {
        const json = localStorage.getItem("time");

        let time;
        if (json === null) {
            time = getCurrentTime();
        } else {
            time = JSON.parse(json);
        }

        setTime(time);
    });

    const armButtonCallback = useCallback(() => {
        if (mode === "idle") {
            setMode("armed");

            let delta = calcTimeUntilAlert(time);
            timeoutId.current = window.setTimeout(() => {
                setMode("fired");
            }, delta);

            localStorage.setItem("time", JSON.stringify(time));
        } else {
            setMode("idle");
            clearTimeout(timeoutId.current);
        }
    }, [mode, time])

    const changeTimeButtonCallback = useCallback((type: types.ChangeTimeButtonType) => {
        const f = {
            "h+": (time: types.Time) => changeTime(time,  1,  0),
            "h-": (time: types.Time) => changeTime(time, -1,  0),
            "m+": (time: types.Time) => changeTime(time,  0,  1),
            "m-": (time: types.Time) => changeTime(time,  0, -1)
        }[type];
        setTime(time => f(time));
    }, []);

    return (
        <div className="outerContainer">
            <div className="innerContainer">
                <Clock time={time} />
                <Controls
                    mode={mode}
                    armButtonCallback={armButtonCallback}
                    changeTimeButtonCallback={changeTimeButtonCallback}
                />
            </div>
        </div>
    );
}
