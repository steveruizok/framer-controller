import * as React from "react"
import { Frame, addPropertyControls, ControlType, RenderTarget } from "framer"

interface Props {
    name: string
    toggled: boolean
}

export function FlowMarker(props: Props) {
    const [state, setState] = React.useState({ toggled: props.toggled })

    React.useEffect(() => {
        if (props.toggled !== state.toggled) {
            const text = `export const link_${
                props.name
            }: Override = () => ({onClick: () => controller.showNext("${
                props.name
            }")})`
            window.prompt("Copy this Override", text)
            setState({ ...state, toggled: props.toggled })
        }
    })

    if (RenderTarget.current() === RenderTarget.canvas) {
        return (
            <Frame
                background="#454973"
                color="#FFFFFF"
                size="100%"
                style={{
                    fontWeight: 500,
                    fontFamily: "monospace",
                }}
            >
                {props.name}
            </Frame>
        )
    }
    return <Frame background="none" size="100%" />
}

FlowMarker.defaultProps = {
    name: "home",
    toggled: false,
    height: 44,
    width: 128,
}

addPropertyControls(FlowMarker, {
    name: { type: ControlType.String, title: "Name" },
    toggled: { type: ControlType.Boolean, title: "Override" },
})
