import * as React from "react"
import { FlowController } from "framer-controller"
import { Frame, addPropertyControls, ControlType } from "framer"

type Page = React.ReactElement<any> | null

interface Transitions {
    ahead: any
    behind: any
    current: any
}

interface Props {
    id: string
    width: number
    height: number
    //
    controller?: FlowController
    current: number
    previous?: number
    pages: any[]
    direction: keyof Directions
    variants: {
        ahead: any
        behind: any
        current: any
    }
    onSwipeLeft: (...props: any) => void
    onSwipeRight: (...props: any) => void
    onSwipeUp: (...props: any) => void
    onSwipeDown: (...props: any) => void
    swipeDistance: number
}

interface Directions {
    forward: string
    backward: string
    initial: string
}

export function FlowComponent(props: Partial<Props>) {
    /* ---------------------------------- State --------------------------------- */

    // Set initial state from props
    const [state, setState] = React.useState({
        swipeStart: {
            x: 0,
            y: 0,
        },
        direction: "initial",
        previous: props.previous,
        current: props.current,
        pages: props.pages.map(p =>
            React.cloneElement(p, {
                key: p.props.id,
                top: 0,
                left: 0,
                size: "100%",
            })
        ),
    })

    // Change current page when props.current changes
    React.useEffect(() => {
        if (props.current === state.current) {
            return
        }

        setState({
            ...state,
            previous: state.current,
            current: props.current,
            direction: props.direction,
        })
    }, [props.current])

    // Create new pages when props.pages changes
    React.useEffect(() => {
        setState({
            ...state,
            pages: props.pages.map(p =>
                React.cloneElement(p, {
                    key: p.props.id,
                    top: 0,
                    left: 0,
                    size: "100%",
                })
            ),
        })
    }, [props.pages])

    /* ----------------------------- Event Handlers ----------------------------- */

    const handleSwipeStart = event => {
        setState({
            ...state,
            swipeStart: {
                x: event.pageX,
                y: event.pageY,
            },
        })
    }

    const handleSwipeEnd = event => {
        const {
            onSwipeDown,
            onSwipeUp,
            onSwipeLeft,
            onSwipeRight,
            swipeDistance,
        } = props

        const { swipeStart } = state

        const swipeEnd = {
            x: event.pageX,
            y: event.pageY,
        }

        const offsetY = swipeStart.y - swipeEnd.y
        const offsetX = swipeStart.x - swipeEnd.x

        if (Math.abs(offsetY) < swipeDistance) {
            if (offsetX > swipeDistance) {
                onSwipeLeft()
            } else if (offsetX < -swipeDistance) {
                onSwipeRight()
            }
        }

        if (Math.abs(offsetX) < swipeDistance) {
            if (offsetY > swipeDistance) {
                onSwipeDown()
            } else if (offsetY < -swipeDistance) {
                onSwipeUp()
            }
        }
    }

    /* ------------------------------ Presentation ------------------------------ */

    const { width, height, variants, id } = props
    const { pages, current, previous, direction } = state

    // Show default container if user hasn't connected any pages
    if (pages.length === 0) {
        return (
            <DefaultContainer
                width={width}
                height={height}
                text="Connect some Frames to get started."
            />
        )
    }

    // Wrapper frame for previous page
    const prevFrame = pages[previous] && (
        <Frame
            key={`${id}_prev_${previous}`}
            size="100%"
            variants={variants}
            initial="current"
            animate={direction === "forward" ? "behind" : "ahead"}
        >
            {pages[previous]}
        </Frame>
    )

    // Wrapper frame for current page
    const currentFrame = pages[current] && (
        <Frame
            key={`${id}_curr_${current}`}
            size="100%"
            variants={variants}
            initial={
                pages[previous]
                    ? direction === "forward"
                        ? "ahead"
                        : "behind"
                    : "current"
            }
            animate="current"
        >
            {pages[current]}
        </Frame>
    )

    return (
        <Frame
            height={height}
            width={width}
            background="none"
            onMouseDown={handleSwipeStart}
            onMouseUp={handleSwipeEnd}
        >
            {previous >= 0
                ? direction === "forward"
                    ? [prevFrame, currentFrame]
                    : [currentFrame, prevFrame]
                : currentFrame}
        </Frame>
    )
}

// Set our default props
FlowComponent.defaultProps = {
    current: 0,
    pages: [],
    overlay: null,
    overlays: [],
    direction: "initial" as keyof Directions,
    onSwipeLeft: () => null,
    onSwipeRight: () => null,
    onSwipeUp: () => null,
    onSwipeDown: () => null,
    onCloseOverlay: () => null,
    swipeDistance: 32,
    variants: {
        behind: {
            x: "0%",
            filter: "brightness(50%)",
            transition: {
                ease: [0.23, -0.04, 0.31, 1.01],
                duration: 0.36,
            },
        },
        current: {
            x: "0%",
            filter: "brightness(100%)",
            transition: {
                ease: [0.23, -0.04, 0.31, 1.01],
                duration: 0.36,
            },
        },
        ahead: {
            x: "100%",
            filter: "brightness(100%)",
            transition: {
                ease: [0.23, -0.04, 0.31, 1.01],
                duration: 0.28,
            },
        },
    },
    toolbar: null,
    tabbar: null,
}

// Set our property controls
addPropertyControls(FlowComponent, {
    pages: {
        type: ControlType.Array,
        title: "Pages",
        propertyControl: {
            type: ControlType.ComponentInstance,
        },
    },
})

/* ---------------------------- Default Container --------------------------- */

// A component for our default container
const DefaultContainer = ({ text, width, height }) => {
    return (
        <Frame
            width={width}
            height={height}
            style={{
                color: "#8855FF",
                background: "rgba(136, 85, 255, 0.1)",
                overflow: "hidden",
            }}
        >
            {text}
        </Frame>
    )
}

/* ---------------------------- Overlay Container --------------------------- */

// An overlay container (tricky business, in progress)
const OverlayContainer = ({
    height,
    width,
    id,
    onCloseOverlay,
    element,
    previous,
    zIndex,
}) => {
    const variants = {
        visible: {
            opacity: 1,
            background: "rgba(0,0,0,.16)",
        },
        hidden: {
            opacity: 0,
            background: "rgba(0,0,0,0)",
        },
    }

    return (
        <Frame
            height={height}
            width={width}
            variants={variants}
            initial="hidden"
            animate="visible"
            key={`scrim_current_${id}`}
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "absolute",
                pointerEvents: previous ? "none" : "all",
                zIndex,
            }}
            overflow="visible"
            onClick={onCloseOverlay}
        >
            <Frame
                height={element.props.height}
                width={element.props.width}
                key={`overlay_${element.props.id}_${id}`}
            >
                {element}
            </Frame>
        </Frame>
    )
}
