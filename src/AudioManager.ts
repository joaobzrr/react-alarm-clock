type BufferInfo = {
    buffer: AudioBuffer|null,
    path: string;
    ready: boolean;
};

export default class AudioManager {
    static instance: AudioManager|null = null;
    context: AudioContext;
    buffers: {[path: string]: BufferInfo} = {};

    constructor() {
        this.context = new (window.AudioContext || window.webkitAudioContext)();
        this.buffers = {};
    }

    static getInstance(): AudioManager {
        if (AudioManager.instance === null) {
            AudioManager.instance = new AudioManager();
        }

        return AudioManager.instance;
    }

    load(bufferInfo: BufferInfo): void {
        const request = new XMLHttpRequest();
        request.open("GET", bufferInfo.path);
        request.responseType = "arraybuffer";
        request.onload = () => {
            this.context.decodeAudioData(request.response, (buffer: AudioBuffer) => {
                bufferInfo.buffer = buffer;
                bufferInfo.ready = true;
            });
        }
        request.send();
    }

    createSound(url: string): Sound {
        if (url in this.buffers) {
            return new Sound(this, this.buffers[url]);
        }

        const bufferInfo: BufferInfo = {buffer: null, path: url, ready: false};
        this.buffers[url] = bufferInfo;

        this.load(bufferInfo);

        return new Sound(this, bufferInfo);
    }
}

export class Sound {
    manager: AudioManager;
    bufferInfo: BufferInfo;
    currentSource: AudioBufferSourceNode|null;

    constructor(manager: AudioManager, bufferInfo: BufferInfo) {
        this.manager = manager;
        this.bufferInfo = bufferInfo;
        this.currentSource = null;
    }

    play(): void {
        if (!this.bufferInfo.ready) {
            return
        }

        if (this.currentSource !== null) {
            this.currentSource.stop();
        }

        const context = this.manager.context;
        this.currentSource = context.createBufferSource();
        this.currentSource.buffer = this.bufferInfo.buffer;
        this.currentSource.connect(context.destination);
        this.currentSource.start();
    }
}
