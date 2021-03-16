declare namespace types {
    type Time = {
        hours: number;
        minutes: number
    };

    type AlarmClockMode = "idle"|"armed"|"fired";

    type ChangeTimeButtonType = "h+"|"h-"|"m+"|"m-";
}

interface Window {
    AudioContext:       typeof AudioContext
    webkitAudioContext: typeof AudioContext // @Note: Why do we need this?
}

declare module "*.mp3";
declare module '*.svg';
