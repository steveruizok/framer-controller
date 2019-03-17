import { Controller } from "./Controller";
interface Options {
    apiKey: string;
}
interface State extends Options {
    predictions?: any[];
    details?: any;
}
/**
 * Load autocomplete predictions and place details from Google's Places library. Creating a PlacesController requires an `apiKey` from Google. [Learn more](https://developers.google.com/maps/documentation/javascript/get-api-key).
 * @example
 * const controller = new PlacesController({apiKey: "..."})
 */
export declare class PlacesController extends Controller<State> {
    _autoCompleteService: any;
    _geocoder: any;
    constructor(options?: Options);
    /**
     * Set key and load google maps library.
     */
    private loadLibrary;
    /**
     * Get a place prediction from an input string.
     */
    getPlacePredictions: (input: string, location?: {
        lat: number;
        lng: number;
    }, radius?: number, language?: string, types?: any, sessionToken?: string) => Promise<any[]>;
    /**
     * Get place details from a placeId
     */
    getPlaceDetails: (placeId: string, fields?: PlaceOptions) => Promise<any>;
    clearPredictions: () => void;
    clearDetails: () => void;
    readonly hasPredictions: boolean;
    readonly predictions: any[];
    readonly details: any;
    readonly autocompleteService: any;
    readonly geocoder: any;
}
interface PlaceOptions {
    address?: string;
    bounds?: any;
    componentRestrictions?: any;
    location?: any;
    region?: any;
}
export {};
