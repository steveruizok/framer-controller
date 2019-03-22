import * as React from "react"
import { PropertyControls, ControlType } from "framer"

type Props = { markerId: string }

export class Marker extends React.Component<Props> {
	render() {
		return <div style={style}>{this.props.markerId}</div>
	}

	static defaultProps: Props = {
		markerId: "Hello World!",
	}

	static propertyControls: PropertyControls<Props> = {
		markerId: { type: ControlType.String, title: "markerId" },
	}
}

const style: React.CSSProperties = {
	height: "100%",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	textAlign: "center",
	color: "#8855FF",
	background: "rgba(136, 85, 255, 0.1)",
	overflow: "hidden",
}
