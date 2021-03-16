type Callback = (timer: Timer) => void;

export default class Timer {
    duration:    number;
    delay:       number;
    startTime:   number|null   = null;
    currentTime: number|null   = null;
    timeoutId:   number|null   = null;
    callback:    Callback|null = null;
    totalTicks = 0;
    deltaTime  = 0;

    constructor(duration: number, delay = 0, callback: Callback|null = null) {
        this.duration = duration;
        this.delay = delay;
        this.callback = callback;
    }

    reset(): void {
        this.startTime = this.currentTime = this.timeoutId = null;
        this.totalTicks = this.deltaTime = 0;
    }

    tick(): void {
        const lastTime = this.currentTime;
        this.currentTime = Date.now();

        if (this.startTime === null) {
            this.startTime = this.currentTime;
        }

        if (lastTime !== null) {
            this.deltaTime = this.currentTime - lastTime;
        }

        if (this.callback !== null) {
            this.callback(this);
        }

        const nextTick = this.duration - (this.currentTime - (this.startTime + (this.totalTicks * this.duration)));
        this.totalTicks++;

        this.timeoutId = window.setTimeout(() => this.tick(), nextTick);
    }

    start(): void {
        if (this.callback === null) {
            throw Error("Timer callback was not set.");
        }

        this.reset();
        this.timeoutId = window.setTimeout(() => this.tick(), this.delay);
    }

    stop(): void {
        if (this.timeoutId !== null) {
            clearTimeout(this.timeoutId);
            this.timeoutId = null;
        }
    }

    setCallback(callback: Callback): void {
        this.callback = callback;
    }
}
