import React, { useEffect, useMemo } from "react";
import ArmButton from "$components/ArmButton";
import ChangeTimeButton from "$components/ChangeTimeButton";
import { useClasses, serializeClasses } from "./useClasses";
import "./Controls.scss";

type PropsType = {
    mode: types.AlarmClockMode;
    changeMode: () => void;
    incHours:   () => void;
    decHours:   () => void;
    incMinutes: () => void;
    decMinutes: () => void;
};

export default function Controls(props: PropsType) {
    const { classes, setClasses } = useClasses();

    const isNotIdle = props.mode !== "idle";
    useEffect(() => setClasses({Controls__isNotIdle: isNotIdle}), [isNotIdle]);

    return (
        <div className={serializeClasses(classes)}>
            <ChangeTimeButton
                callback={props.incHours}
                off={isNotIdle}
                type="h+"
                className="ChangeTimeButton__left"
            />
            <ChangeTimeButton
                callback={props.decHours}
                off={isNotIdle}
                type="h-"
                className="ChangeTimeButton__left"
            />
            <ArmButton
                callback={props.changeMode}
                mode={props.mode}
            />
            <ChangeTimeButton
                callback={props.decMinutes}
                off={isNotIdle}
                type="m-"
                className="ChangeTimeButton__right"
            />
            <ChangeTimeButton
                callback={props.incMinutes}
                off={isNotIdle}
                type="m+"
                className="ChangeTimeButton__right"
            />
        </div>
    );
}
