import React, { memo, useMemo, useCallback } from "react";
import HoldableButton from "$components/HoldableButton";
import { PlusIcon, MinusIcon } from "./icons";
import usePressed from "./usePressed";
import ChangeTimeButtonPressAndHoldSoundPath from "./ChangeTimeButtonPressAndHold.mp3";
import "./ChangeTimeButton.scss";

type PropsType = {
    callback: () => void;
    off: boolean;
    type: types.ChangeTimeButtonType;
    className: string;
};

const ChangeTimeButton = memo((props: PropsType) => {
    const [pressed, setPressed] = usePressed();

    const onPress = useCallback(() => {
        props.callback();
        setPressed(props.type);
    }, [props.type]);

    const onRelease = useCallback(() => {
        setPressed(null);
    }, []);

    const disabled = pressed !== null && pressed !== props.type;
    const icon = (props.type === "h+" || props.type === "m+") ? <PlusIcon/> : <MinusIcon/>;

    return (
        <HoldableButton
            onPress={onPress}
            onRelease={onRelease}
            onHold={props.callback}
            disabled={disabled}
            off={props.off}
            sound={ChangeTimeButtonPressAndHoldSoundPath}
            className={`ChangeTimeButton ${props.className}`}
        >
            {icon}
        </HoldableButton>
    );
});

export default ChangeTimeButton;
