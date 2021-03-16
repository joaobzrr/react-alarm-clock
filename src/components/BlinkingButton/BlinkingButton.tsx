import React, { useRef, useEffect } from "react";
import Timer from "$src/Timer";
import AudioManager, { Sound } from "$src/AudioManager";
import useConstructor from "$hooks/useConstructor";
import { useClasses, serializeClasses } from "./useClasses";

type PropsType = React.PropsWithChildren<{
    onPress:    Function;
    blinking:   boolean;
    pressSound: string;
    blinkSound: string;
    className:  string;
}>;

export default function BlinkingButton(props: PropsType) {
    const { classes, setClasses } = useClasses();

    const timer      = useRef<Timer>(null!);
    const pressSound = useRef<Sound>(null!);
    const blinkSound = useRef<Sound>(null!);
    const isLit      = useRef(false);

    const setIsLit = (lit: boolean) => {
        isLit.current = lit;
        setClasses({BlinkingButton__isLit: lit});
    }

    useConstructor(() => {
        const audioManager = AudioManager.getInstance();
        pressSound.current = audioManager.createSound(props.pressSound);
        blinkSound.current = audioManager.createSound(props.blinkSound);

        timer.current = new Timer(500, 500, () => {
            setIsLit(!isLit.current);
            if (isLit.current) {
                blinkSound.current.play();
            }
        });
    });

    useEffect(() => {
        if (props.blinking) {
            timer.current.start();
        } else {
            // @Note: Sound won't stop immediately after state change.
            timer.current.stop();
            setIsLit(false);
        }
    }, [props.blinking]);

    const callback = (e: React.MouseEvent) => {
        props.onPress();
        pressSound.current.play();
    }

    const className = `${serializeClasses(classes)} ${props.className}`;

    return (
        <span
            onClick={callback}
            className={className}
        >
            {props.children}
        </span>
    );
}
