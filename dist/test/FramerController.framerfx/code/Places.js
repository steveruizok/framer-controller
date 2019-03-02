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
const React = require("react");
const framer_1 = require("framer");
const canvas_1 = require("./canvas");
const lib_1 = require("../../../lib");
/**
 * Create our controller using an API key. Don't spam my API key,
 * get your own API key here: https://developers.google.com/maps/documentation/javascript/get-api-key
 */
const controller = new lib_1.PlacesController({
    apiKey: 'AIzaSyBn5_4mxpPCKRVuLL1TlL_P62lNXInDXHA',
});
/**
 * This data object to control our mapbox component, together with the
 * `isMap` override below.
 */
const mapData = framer_1.Data({
    longitude: 0,
    latitude: 0,
    zoom: 10,
});
/**
 * Override for our mapbox component. It will pass all of `mapData`'s
 * properties (`longitude`, `latitude` and `zoom`) to the component
 * as props.
 */
exports.isMap = () => mapData;
/**
 * This override will clear our prediction list when tapped. We'll set
 * it to the parent frame of our mapbox component. We only really need
 * this because our Mapbox Component doesn't have a built-in onClick
 * event.
 */
exports.isMapContainer = () => ({
    onClick: controller.clearPredictions,
});
/**
 * Our text input loads predictions when focused (ie when we click
 * into the input) or when its value changes (ie when we type in the
 * input).
 */
exports.isPlacePredictionInput = () => {
    return {
        // If we've cleared the input, close our predictions to avoid
        // sending a blank query to Google. Otherwise, pass the value of
        // the input to Google via our controller's `getPlacePredictions`
        // method.
        onValueChange(value = '') {
            if (value) {
                controller.getPlacePredictions(value);
            }
            else {
                controller.clearPredictions();
            }
        },
        // When we click on the input, make a predictions query only if
        // the input already has a value.
        onFocus(event) {
            const { value } = event.target;
            if (value)
                controller.getPlacePredictions(value);
        },
    };
};
/**
  Our results list will use our controller's predictions to generate
  a list of predictions using the `SuggestionWithEvents` component
  defined below. Its height will be determined by the number of
  items in our controller's predictions array.
*/
exports.isPredictionsList = () => {
    const { predictions } = controller.state;
    return {
        height: predictions.length * 72,
        children: predictions.map((r, i) => {
            return <SuggestionWithEvents index={i} prediction={r}/>;
        }),
    };
};
/** This React stateless functional component takes the Suggestion design component,
 * which we have imported from canvas, and wraps it in a Frame. We only really need
 * this because Frames can take events, whereas design components cannot.
 */
const SuggestionWithEvents = (props) => {
    const { index, prediction } = props;
    return (<framer_1.Frame width={375} height={72} top={index * 72} left={0} onClick={() => __awaiter(this, void 0, void 0, function* () {
        // When we click on the frame, fetch the place details from Google.
        const details = yield controller.getPlaceDetails(prediction.place_id);
        // When they've arrived, put the latitude and longitude
        // from the place details into the `mapData` object. Our
        // `isMap` override will pass them as props to our mapbox map.
        const { lat, lng } = details.geometry.location.toJSON();
        mapData.longitude = lng;
        mapData.latitude = lat;
        // Then clear our predictions to close our predictions list.
        controller.clearPredictions();
    })}>
			<canvas_1.Suggestion left={0} top={0} right={0} width="100%" height="100%" 
    // We use elements of the prediction to set the place_name
    // and place_address properties of the design component.
    $place_name={prediction.structured_formatting.main_text} $place_address={prediction.structured_formatting.secondary_text}/>
		</framer_1.Frame>);
};
