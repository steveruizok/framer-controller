import Controller from './index';
declare type Props = {
    url: string;
    log?: boolean;
    data?: any;
    loading?: boolean;
};
/**
 * Fetch data from an API endpoint (a `url`) and return it as `data`.
 * Accepts manual refrsehing (`refresh()`) and handles `loading` state, too.
 */
export declare class FetchController extends Controller<Props> {
    constructor(props: Props);
    /**
     * Make a fetch request and return the data as a JSON object.
     * @example
     * FetchController.fetch("https://www.myData.com/users")
     */
    static fetch: (url?: string, callback?: (data: any) => void) => Promise<any>;
    /**
     * Load a new set of data from the controller's `url`.
     * @param callback - An optional callback to run once the data arrives.
     * @example
     * controller.refresh()
     * controller.refresh((data) => console.log(data))
     */
    refresh: (callback?: (data: any) => void) => Promise<void>;
    /**
     * The controller's current data endpoint. Setting this property will refresh the controller.
     */
    url: string;
    /**
     * The controller's current data.
     */
    readonly data: any;
    /**
     * Whether or not the controller is waiting for data to arrive.
     */
    readonly loading: boolean;
}
export {};
