import { Controller } from './Controller';
import { AnimateOptions } from './types';
declare type Input = {
    [key: string]: any;
};
declare type Converter<T> = (props: T) => {
    [key: string]: any;
};
interface Options {
    input?: Input;
    output?: {
        [key: string]: any;
    };
    converter: Converter<Input>;
}
interface State extends Options {
}
export declare class RelativeController extends Controller<State> {
    _firstLoad: boolean;
    constructor(options?: Options);
    animate: (options: {
        [key: string]: any;
    } | (AnimateOptions & State)) => void;
    setInput: (props: Input, initial?: boolean) => void;
    converter: Converter<Input>;
    readonly input: Input;
    readonly output: {
        [key: string]: any;
    };
}
export {};
