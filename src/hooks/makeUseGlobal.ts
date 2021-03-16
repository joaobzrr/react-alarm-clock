import { useState, useEffect } from "react";

export default function makeUseGlobal<T>(initialState: T): ReturnType<T> {
    let globalState = initialState;
    const listeners = new Set<Listener>();

    const setState = (value: T) => {
        globalState = value;
        listeners.forEach((listener: Listener) => {
            listener();
        });
    }

    return () => {
        const [state, _setState] = useState<T>(globalState);

        useEffect(() => {
            const listener = () => {
                _setState(globalState);
            }
            listeners.add(listener);
            listener();

            return () => {
                listeners.delete(listener);
            }
        }, []);

        return [state, setState];
    }
}

type Listener  = () => void;
type SetFunction<T> = (value: T) => void;
type ReturnType<T> = () => [T, SetFunction<T>];
