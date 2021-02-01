import React, { memo, useCallback } from "react";
import ChangeTimeButton from "./ChangeTimeButton";
import {
    BoolMap,
    Time,
    ChangeTimeFunction,
    ApplyChangeTimeFunction
} from "@common/types";
import PlusIcon from "./plus.svg";
import MinusIcon from "./minus.svg";

export const MAX_HOUR   = 23;
export const MAX_MINUTE = 59;

type PropsType = {
    type: "h+"|"h-"|"m+"|"m-";
    applyChangeTime: ApplyChangeTimeFunction;
    alarmIsSet: boolean;
    className: (string|BoolMap);
};

const MakeChangeTimeButton = memo((props: PropsType) => {
    const {type, applyChangeTime, alarmIsSet, className} = props;

    let changeTime: ChangeTimeFunction;
    let icon;
    switch(type) {
        case "h+": {
            changeTime = increaseHour;
            icon = <PlusIcon className="button_icon" />;
        } break;
        case "h-": {
            changeTime = decreaseHour;
            icon = <MinusIcon className="button_icon" />
        } break;
        case "m+": {
            changeTime = increaseMinute;
            icon = <PlusIcon className="button_icon" />;
        } break;
        case "m-": {
            changeTime = decreaseMinute;
            icon = <MinusIcon className="button_icon" />
        } break;
    }

    const callback = useCallback(() => applyChangeTime(changeTime), []);

    return (
        <ChangeTimeButton callback={callback} alarmIsSet={alarmIsSet}
         className={className}>
            {icon}
        </ChangeTimeButton>
    );
});

export default MakeChangeTimeButton;

const increaseHour = ({hours, minutes}: Time) => {
    hours = (hours < MAX_HOUR) ? hours + 1 : 0;
    return {hours: hours, minutes: minutes};
}

const increaseMinute = ({hours, minutes}: Time) => {
    minutes = (hours < MAX_MINUTE) ? minutes + 1 : 0;
    return {hours: hours, minutes: minutes};
}

const decreaseHour = ({hours, minutes}: Time) => {
    hours = (hours > 0) ? hours - 1 : MAX_HOUR;
    return {hours: hours, minutes: minutes};
}

const decreaseMinute = ({hours, minutes}: Time) => {
    minutes = (minutes > 0) ? minutes - 1 : MAX_MINUTE;
    return {hours: hours, minutes: minutes};
}