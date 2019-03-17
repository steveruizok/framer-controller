import { Controller } from "./Controller"

interface Options {
	apiKey: string
}

interface State extends Options {
	predictions?: any[]
	details?: any
}
/**
 * Load autocomplete predictions and place details from Google's Places library. Creating a PlacesController requires an `apiKey` from Google. [Learn more](https://developers.google.com/maps/documentation/javascript/get-api-key).
 * @example
 * const controller = new PlacesController({apiKey: "..."})
 */
export class PlacesController extends Controller<State> {
	_autoCompleteService: any
	_geocoder: any

	constructor(options: Options = {} as Options) {
		super({
			predictions: [],
			details: null,
			...options,
		})

		this.loadLibrary(this.state.apiKey)
	}

	/**
	 * Set key and load google maps library.
	 */
	private loadLibrary(key: string) {
		let script: HTMLScriptElement

		window["initMap"] = () => {
			this._autoCompleteService = new window[
				"google"
			].maps.places.AutocompleteService()
			this._geocoder = new window["google"].maps.Geocoder()
		}

		if (window["google"]) {
			script = document.querySelector("#google_maps_library")
			script.remove()
			delete window["google"]
		}

		script = document.createElement("script")
		script.id = "google_maps_library"
		script.src = `https://maps.googleapis.com/maps/api/js?key=${key}&libraries=places&callback=initMap`
		document.head.appendChild(script)
	}

	/**
	 * Get a place prediction from an input string.
	 */
	getPlacePredictions = async (
		input: string,
		location?: {
			lat: number
			lng: number
		},
		radius?: number,
		language?: string,
		types?: any,
		sessionToken?: string
	) => {
		const getPredictions = () =>
			new Promise(resolve => {
				if (!this.autocompleteService) {
					return
				}

				this.autocompleteService.getPlacePredictions(
					{
						input,
						location,
						radius,
						language,
						sessionToken,
						types,
					},
					resolve
				)
			})

		const predictions = ((await getPredictions()) as any[]) || []
		this.setState({ predictions })
		return predictions
	}

	/**
	 * Get place details from a placeId
	 */
	getPlaceDetails = async (placeId: string, fields: PlaceOptions = {}) => {
		const getDetails = () =>
			new Promise(resolve => {
				if (!this.geocoder) {
					return
				}

				this.geocoder.geocode({ placeId, ...fields }, resolve)
			})

		const [details] = ((await getDetails()) as any[]) || [null]
		this.setState({ details })
		return details
	}

	clearPredictions = () => {
		this.setState({
			predictions: [],
		})
	}

	clearDetails = () => {
		this.setState({
			details: null,
		})
	}

	get hasPredictions() {
		return this.state.predictions.length > 0
	}

	get predictions() {
		return this.state.predictions
	}

	get details() {
		return this.state.details
	}

	get autocompleteService() {
		return this._autoCompleteService
	}

	get geocoder() {
		return this._geocoder
	}
}

interface PlaceOptions {
	address?: string
	bounds?: any
	componentRestrictions?: any
	location?: any
	region?: any
}
