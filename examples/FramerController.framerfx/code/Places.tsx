import * as React from 'react'
import { Override, Data, Frame } from 'framer'
import { Suggestion } from './canvas'
import { PlacesController } from '../../../lib'

const mapData = Data({
	longitude: 0,
	latitude: 0,
	zoom: 10,
})

export const isMap: Override = () => mapData

const controller = new PlacesController({
	apiKey: 'AIzaSyBn5_4mxpPCKRVuLL1TlL_P62lNXInDXHA',
})

export const isMapContainer: Override = () => ({
	onClick: controller.clearPredictions,
})

export const isPlacePredictionInput: Override = () => {
	return {
		onValueChange(value: string = '') {
			if (value) {
				controller.getPlacePredictions(value)
			} else {
				controller.clearPredictions()
			}
		},
		onFocus(event: any) {
			const { value } = event.target
			if (value) controller.getPlacePredictions(value)
		},
	}
}

export const isPredictionsList: Override = () => {
	const { predictions } = controller.state
	return {
		height: predictions.length * 72,
		children: predictions.map((r, i) => {
			return <SuggestionWithEvents index={i} prediction={r} />
		}),
	}
}

const SuggestionWithEvents: React.SFC<{ index: number; prediction: any }> = (
	props
) => {
	const { index, prediction } = props
	return (
		<Frame
			width={375}
			height={72}
			top={index * 72}
			left={0}
			onClick={async () => {
				const details = await controller.getPlaceDetails(prediction.place_id)

				const { lat, lng } = details.geometry.location.toJSON()
				mapData.longitude = lng
				mapData.latitude = lat

				controller.clearPredictions()
			}}
		>
			<Suggestion
				left={0}
				top={0}
				right={0}
				width="100%"
				height="100%"
				$place_name={prediction.structured_formatting.main_text}
				$place_address={prediction.structured_formatting.secondary_text}
			/>
		</Frame>
	)
}
