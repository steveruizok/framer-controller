import Controller from './index';
declare type Props = {
    apiKey: string;
    predictions?: any[];
    details?: any;
};
/**
 * Load autocomplete predictions and place details from Google's Places library. Creating a PlacesController requires an `apiKey` from Google. [Learn more](https://developers.google.com/maps/documentation/javascript/get-api-key).
 * @example
 * const controller = new PlacesController({apiKey: "..."})
 */
export declare class PlacesController extends Controller<Props> {
    _autoCompleteService: any;
    _geocoder: any;
    constructor(props: Props);
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
    getPlaceDetails: (placeId: string, fields?: ("icon" | "id" | "name" | "address_component" | "adr_address" | "alt_id" | "formatted_address" | "geometry" | "permanently_closed" | "photo" | "place_id" | "plus_code" | "scope" | "type" | "url" | "user_ratings_total" | "utc_offset" | "vicinity")[]) => Promise<any>;
    clearPredictions: () => void;
    clearDetails: () => void;
    readonly predictions: any[];
    readonly details: any;
    readonly autocompleteService: any;
    readonly geocoder: any;
}
export {};
