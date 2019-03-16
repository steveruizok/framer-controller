import { Controller } from "./Controller";
interface Config {
    initial?: number;
}
interface State extends Config {
    value: number;
}
export declare class CounterController<Config> extends Controller<State> {
    constructor(config?: Config);
    readonly count: number;
    readonly value: number;
    increment: () => void;
    decrement: () => void;
    incrementBy: (by?: number) => void;
    decrementBy: (by?: number) => void;
    set: (value: number) => void;
}
export {};
