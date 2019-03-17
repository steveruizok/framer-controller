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
 * Load autocomplete predictions and place details from Google's Places library. Creating a PlacesController requires an `apiKey` from Google. [Learn more](https://developers.google.com/maps/documentation/javascript/get-api-key).
 * @example
 * const controller = new PlacesController({apiKey: "..."})
 */
class PlacesController extends Controller_1.Controller {
    constructor(options = {}) {
        super(Object.assign({ predictions: [], details: null }, options));
        /**
         * Get a place prediction from an input string.
         */
        this.getPlacePredictions = (input, location, radius, language, types, sessionToken) => __awaiter(this, void 0, void 0, function* () {
            const getPredictions = () => new Promise(resolve => {
                if (!this.autocompleteService) {
                    return;
                }
                this.autocompleteService.getPlacePredictions({
                    input,
                    location,
                    radius,
                    language,
                    sessionToken,
                    types,
                }, resolve);
            });
            const predictions = (yield getPredictions()) || [];
            this.setState({ predictions });
            return predictions;
        });
        /**
         * Get place details from a placeId
         */
        this.getPlaceDetails = (placeId, fields = {}) => __awaiter(this, void 0, void 0, function* () {
            const getDetails = () => new Promise(resolve => {
                if (!this.geocoder) {
                    return;
                }
                this.geocoder.geocode(Object.assign({ placeId }, fields), resolve);
            });
            const [details] = (yield getDetails()) || [null];
            this.setState({ details });
            return details;
        });
        this.clearPredictions = () => {
            this.setState({
                predictions: [],
            });
        };
        this.clearDetails = () => {
            this.setState({
                details: null,
            });
        };
        this.loadLibrary(this.state.apiKey);
    }
    /**
     * Set key and load google maps library.
     */
    loadLibrary(key) {
        let script;
        window["initMap"] = () => {
            this._autoCompleteService = new window["google"].maps.places.AutocompleteService();
            this._geocoder = new window["google"].maps.Geocoder();
        };
        if (window["google"]) {
            script = document.querySelector("#google_maps_library");
            script.remove();
            delete window["google"];
        }
        script = document.createElement("script");
        script.id = "google_maps_library";
        script.src = `https://maps.googleapis.com/maps/api/js?key=${key}&libraries=places&callback=initMap`;
        document.head.appendChild(script);
    }
    get hasPredictions() {
        return this.state.predictions.length > 0;
    }
    get predictions() {
        return this.state.predictions;
    }
    get details() {
        return this.state.details;
    }
    get autocompleteService() {
        return this._autoCompleteService;
    }
    get geocoder() {
        return this._geocoder;
    }
}
exports.PlacesController = PlacesController;
