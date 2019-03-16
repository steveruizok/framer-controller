import { Controller } from "./Controller";
interface Config {
    delay?: number;
    paused?: boolean;
    cleanResume?: boolean;
    onChange?: () => void;
}
interface State extends Config {
    frame: number;
    paused: boolean;
}
export declare class IntervalController<Config> extends Controller<State> {
    _timeout: any;
    constructor(config?: Config);
    start: () => void;
    stop: () => void;
    toggle: () => void;
    paused: boolean;
    delay: number;
    readonly frame: number;
    protected tick: () => void;
}
export {};
