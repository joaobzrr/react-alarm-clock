import React, { useState, useRef, useCallback } from "react";
import Clock from "$components/Clock";
import Controls from "$components/Controls";
import useAlarmClock from "$hooks/useAlarmClock";
import useConstructor from "$hooks/useConstructor";
import HighResolutionTimer from "$src/HighResolutionTimer";
import { calcTimeUntilAlert, getCurrentTime } from "$src/time";
import "./App.scss";

export default function App() {
    const [mode, setMode] = useState<types.AlarmClockMode>("idle");

    const {time, setTime, incHours, decHours, incMinutes, decMinutes} = useAlarmClock({hours: 0, minutes: 0});
    const timeoutId = useRef<number>();

    useConstructor(() => {
        const json = localStorage.getItem("time");
        let time = (json === null) ? getCurrentTime() : JSON.parse(json);
        setTime(time);
    });

    const changeMode = useCallback(() => {
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

    return (
        <div className="outerContainer">
            <div className="innerContainer">
                <Clock time={time} />
                <Controls
                    mode={mode}
                    changeMode={changeMode}
                    incHours={incHours}
                    decHours={decHours}
                    incMinutes={incMinutes}
                    decMinutes={decMinutes}
                />
            </div>
        </div>
    );
}
