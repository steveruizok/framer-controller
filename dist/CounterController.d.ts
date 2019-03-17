import { Controller } from "./Controller";
interface Options {
    initial?: number;
}
interface State extends Options {
    value: number;
}
export declare class CounterController extends Controller<State> {
    constructor(config?: Options);
    readonly count: number;
    readonly value: number;
    increment: () => void;
    decrement: () => void;
    incrementBy: (by?: number) => void;
    decrementBy: (by?: number) => void;
    set: (value: number) => void;
}
export {};
