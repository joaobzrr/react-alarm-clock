import { useRef } from "react";

export default function useConstructor(callback: () => void): void {
    const hasBeenCalled = useRef(false);
    if (hasBeenCalled.current) {
        return;
    } else {
        callback();
        hasBeenCalled.current = true;
    }
}
