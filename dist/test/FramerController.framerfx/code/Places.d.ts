import { Override } from 'framer';
/**
 * Override for our mapbox component. It will pass all of `mapData`'s
 * properties (`longitude`, `latitude` and `zoom`) to the component
 * as props.
 */
export declare const isMap: Override;
/**
 * This override will clear our prediction list when tapped. We'll set
 * it to the parent frame of our mapbox component. We only really need
 * this because our Mapbox Component doesn't have a built-in onClick
 * event.
 */
export declare const isMapContainer: Override;
/**
 * Our text input loads predictions when focused (ie when we click
 * into the input) or when its value changes (ie when we type in the
 * input).
 */
export declare const isPlacePredictionInput: Override;
/**
  Our results list will use our controller's predictions to generate
  a list of predictions using the `SuggestionWithEvents` component
  defined below. Its height will be determined by the number of
  items in our controller's predictions array.
*/
export declare const isPredictionsList: Override;
