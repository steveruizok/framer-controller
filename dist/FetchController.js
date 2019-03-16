"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Controller_1 = require("./Controller");
/**
 * Fetch data from an API endpoint (a `url`) and return it as `data`.
 * Accepts manual refrsehing (`refresh()`) and handles `loading` state, too.
 */
class FetchController extends Controller_1.Controller {
    constructor(options = {}) {
        super(Object.assign({ log: false, loading: true, parse: d => d, data: false }, options));
        this.onUpdate = state => {
            this.state.log && console.log(state.data);
            return this.state;
        };
        /**
         * Load a new set of data from the controller's `url`.
         * @param callback - An optional callback to run once the data arrives.
         * @example
         * controller.refresh()
         * controller.refresh((data) => console.log(data))
         */
        this.refresh = () => __awaiter(this, void 0, void 0, function* () {
            this.setState({ loading: true });
            let data = yield FetchController.fetch(this.state.url).catch(e => console.warn(`⚠️Error refreshing from ${this.state.url}`, e));
            if (this.state.parse) {
                data = this.state.parse(data);
            }
            this.setState({ data, loading: false });
        });
        this.refresh();
    }
    /**
     * The controller's current data endpoint. Setting this property will refresh the controller.
     */
    get url() {
        return this.state.url;
    }
    set url(url) {
        this.setState({ url });
        this.refresh();
    }
    /**
     * The controller's current data.
     */
    get data() {
        return this.state.data;
    }
    /**
     * Whether or not the controller is waiting for data to arrive.
     */
    get loading() {
        return this.state.loading;
    }
}
/**
 * Make a fetch request and return the data as a JSON object.
 * @example
 * FetchController.fetch("https://www.myData.com/users")
 */
FetchController.fetch = (url, callback) => __awaiter(this, void 0, void 0, function* () {
    const response = yield fetch(url);
    const data = yield response.json();
    callback && callback(data);
    return data;
});
exports.FetchController = FetchController;
