import * as React from 'react'
import { motionValue, useAnimation, AnimationControls, transform } from 'framer'

/**
 * # createScrollControls
 * Returns a collection of hooks for using the state of a Scroll component...
 * - `useScrollConnector` - Connects a Scroll component to the other hooks.
 * - `useScrollState` - Returns the Scroll's state.
 * - `useScrollItemState` - Returns scroll information about a child of the Scroll's content.
 * 
 * ... and also controls for settitng that state.
 * - `setScrollX`
 * - `setScrollY`,
 * - `setScrollPoint`,
 * - `scrollToPoint`,
 * ```tsx

  const {
    useScrollConnector,
    useScrollState,
    useScrollItemState,
    setScrollX,
    setScrollY,
    setScrollPoint,
    scrollToPoint,
  } = createScrollControls()
  ```*/
export function createScrollControls(
	options: {
		scrollY?: number
		scrollX?: number
	} = {}
) {
	const { scrollY = 0, scrollX = 0 } = options

	const contentOffsetX = motionValue(-scrollX)
	const contentOffsetY = motionValue(-scrollY)

	// Initial Store
	let store = {
		component: null,
		content: null,
		direction: 'vertical',
		scrollY,
		scrollX,
		scrollPoint: {
			x: scrollX,
			y: scrollY,
		},
		velocity: {
			x: 0,
			y: 0,
		},
		progress: {
			x: 0,
			y: 0,
		},
		scrollFrame: {
			x: 0,
			y: 0,
			width: 100,
			height: 100,
		},
		scrollConstraints: {
			top: 0,
			right: 100,
			bottom: 100,
			left: 0,
		},
	}

	// Set Motion Values
	const updateMotionValues = (x: number, y: number) => {
		contentOffsetX.stop()
		contentOffsetX.set(x)

		contentOffsetY.stop()
		contentOffsetY.set(y)
	}

	// Store
	const storeSetters = new Set()
	const childSetters = new Set()

	const setStoreState = (changes: any, updateMotion: boolean) => {
		store = { ...store, ...changes }
		store = {
			...store,
			scrollPoint: {
				x: store.scrollX,
				y: store.scrollY,
			},
			progress: {
				x:
					store.scrollX /
						(store.scrollConstraints.right - store.scrollConstraints.left) || 0,
				y:
					store.scrollY /
						(store.scrollConstraints.bottom - store.scrollConstraints.top) || 0,
			},
		}

		if (updateMotion) {
			updateMotionValues(-store.scrollX, -store.scrollY)
		}

		// Update store for useScrollState
		storeSetters.forEach((setter) => setter(store))

		// Update store for children
		childSetters.forEach((setter) => setter(store))
	}

	const set = (values: any, updateMotion = true) =>
		setStoreState(values, updateMotion)

	// Update from contentOffsetY
	const updateFromMotionValues = (
		scrollX: number,
		scrollY: number,
		delta,
		offset,
		velocity
	) => {
		set(
			{
				scrollX,
				scrollY,
				progress: {
					x:
						scrollX /
							(store.scrollConstraints.right - store.scrollConstraints.left) ||
						0,
					y:
						scrollY /
							(store.scrollConstraints.bottom - store.scrollConstraints.top) ||
						0,
				},
				delta,
				offset,
				velocity,
			},
			false
		)
	}

	// Scroll events
	const onScroll = ({ point, delta, offset, velocity }) => {
		updateFromMotionValues(-point.x, -point.y, delta, offset, velocity)
	}

	// Animation controls
	let scrollAnimate: AnimationControls

	/**
	 * # useScrollConnector
	 * A hook for connecting a Scroll component to the other hooks created by `createScrollControls`. 
   * In order for the other hooks to work, this hook must be called from the Scroll component's 
   * override as shown below.
   * ```tsx

  // Sync the component with the usePageControls hook
  export function ScrollComponent(props): Override {
    const overrides = useScrollConnector(props)
    return {
      ...(overrides as any),
    }
  }

   ```
   */
	const useScrollConnector = (props?: any) => {
		scrollAnimate = useAnimation()

		// Set state from props
		if (props) {
			// Ensure that the connected props are from a Scroll component
			const { componentIdentifier } = props
			if (!componentIdentifier || componentIdentifier !== 'framer/Scroll') {
				console.error(
					"⚠️ You've passed the props of some non-Scroll component to useScrollConnector. You should only pass props from the Scroll component that you're trying to control."
				)
				return
			}

			const component = props.children[0]
			const content = component.props.children[0]

			React.useEffect(() => {
				set(
					{
						component,
						content,
						scrollConstraints: {
							top: 0,
							right: content.props.width - component.props.width,
							bottom: content.props.height - component.props.height,
							left: 0,
						},
						scrollFrame: {
							x: 0,
							y: 0,
							width: component.props.width,
							height: component.props.height,
						},
					},
					false
				)
			}, [component, component.props, content, content.props.children])
		}

		return {
			contentOffsetX,
			contentOffsetY,
			scrollAnimate,
			onScroll,
		}
	}

	/**
     * ## setScrollPoinX
		 * Set the Scroll component's scrollX value.
     * 
     * ```tsx
  export function SetScrollX500(): Override {
    const { setScrollX } = useScrollControls()

    return {
      onTap: () =>
        setScrollX(500),
    }
  }
```*/
	const setScrollX = (scrollX: number) => {
		set({
			scrollX,
		})
	}

	/**
     * ## setScrollY
		 * Set the Scroll component's scrollY value.
     * 
     * ```tsx
  export function SetScrollY500(): Override {
    const { setScrollY } = useScrollControls()

    return {
      onTap: () =>
        setScrollY(500),
    }
  }
```*/
	const setScrollY = (scrollY: number) => {
		set({
			scrollY,
		})
	}

	/**
     * ## setScrollPoint
		 * Set the Scroll component's scroll point (`x` and `y`).
		 * 
     * ```tsx
  export function SetScrollPoint200500(): Override {
    const { setScrollPoint } = useScrollControls()

    return {
      onTap: () =>
        setScrollPoint({
          x: 200,
          y: 500
        }),
    }
  }
```*/
	const setScrollPoint = (point: Point) => {
		set({
			scrollX: point.x,
			scrollY: point.y,
		})
	}

	/**
     * ## ScrollToPoint
     * Scroll the Scroll component's to a given point ( `x` and `y` ), with an optional `transition`.
     * 
     * ```tsx
  // Without transition
  export function ScrollTo200500(): Override {
    const { scrollToPoint } = useScrollControls()

    return {
      onTap: () =>
        scrollToPoint({
          x: 200,
          y: 500
        }),
    }
  }
  
  // With transition
  export function ScrollTo200500(): Override {
    const { scrollToPoint } = useScrollControls()

    return {
      onTap: () =>
        scrollToPoint({
          x: 200,
          y: 500,
          transition: {
            type: "tween",
             duration: 2
           }
        }),
    }
  }
```*/
	const scrollToPoint = (
		point: Point & { transition?: { [key: string]: any } }
	) => {
		scrollAnimate.start({
			x: -point.x,
			y: -point.y,
			transition: point.transition,
		})
	}

	/**
	 * # useScrollState
	 * Hook that provides state information about the Scroll component.
	 */
	const useScrollState = () => {
		const [state, setState] = React.useState(store)
		React.useEffect(() => {
			storeSetters.add(setState)
			return () => storeSetters.delete(setState)
		}, [])

		return state
	}

	/**
	 * # useScrollItemState
	 * Hook that provides scroll information for children of the Scroll component's content Frame.
	 * - offset,
	 * - clip,
	 * - intersect,
	 * - travel,
	 * - progress,
	 */
	const useScrollItemState = (props: any) => {
		const [state, setState] = React.useState({
			absolute: {
				x: 0,
				y: 0,
				midX: 50,
				midY: 50,
				maxX: 100,
				maxY: 100,
				height: 100,
				width: 100,
			},
			offset: { top: 0, right: 0, bottom: 0, left: 0 },
			intersect: { x: 0, y: 0 },
			travel: { x: 0, y: 0 },
			progress: { x: 0, y: 0 },
			clip: { x: 'contain', y: 'contain' },
		})

		const calculateClip = (
			axis: 'x' | 'y',
			a: number,
			b: number,
			max: number
		) => {
			const labels = axis === 'x' ? ['left', 'right'] : ['top', 'bottom']

			if (a < 0) {
				return b <= 0 ? 'before' : b <= max ? labels[0] : 'overflow'
			} else if (b > max) {
				return a >= max ? 'after' : a >= 0 ? labels[1] : 'overflow'
			} else {
				return 'contain'
			}
		}

		const updateStore = (store) => {
			const { scrollFrame: sf, scrollX, scrollY } = store

			setState((state) => {
				const { absolute } = state

				const offset = {
					top: absolute.y - scrollY,
					right: absolute.maxX - scrollX,
					bottom: absolute.maxY - scrollY,
					left: absolute.x - scrollX,
				}

				const clip = {
					x: calculateClip('x', offset.left, offset.right, sf.width),
					y: calculateClip('y', offset.top, offset.bottom, sf.height),
				}

				const intersect = {
					x: {
						before: 0,
						after: 0,
						right: (sf.width - offset.left) / absolute.width,
						left: offset.right / absolute.width,
						overflow: 1,
						contain: 1,
					}[clip.x],
					y: {
						before: 0,
						after: 0,
						bottom: (sf.height - offset.top) / absolute.height,
						top: offset.bottom / absolute.height,
						overflow: 1,
						contain: 1,
					}[clip.y],
				}

				const travel = {
					x: {
						before: 1,
						after: -1,
						right: transform(
							offset.left,
							[sf.width, sf.width - absolute.width],
							[-1, 0]
						),
						left: transform(offset.left, [0, -absolute.width], [0, 1]),
						overflow: 0,
						contain: 0,
					}[clip.x],
					y: {
						before: 1,
						after: -1,
						bottom: transform(
							offset.top,
							[sf.height, sf.height - absolute.height],
							[-1, 0]
						),
						top: transform(offset.top, [0, -absolute.height], [0, 1]),
						overflow: 0,
						contain: 0,
					}[clip.y],
				}

				const progress = {
					x: transform(offset.left, [sf.width, -absolute.width], [0, 1]),
					y: transform(offset.top, [sf.height, -absolute.height], [0, 1]),
				}

				return {
					...state,
					offset,
					clip,
					intersect,
					travel,
					progress,
				}
			})
		}

		React.useEffect(() => {
			childSetters.add(updateStore)
			return () => childSetters.delete(updateStore)
		}, [])

		React.useEffect(() => {
			if (!store.content) return

			const isChild = store.content.props.children
				.map((c) => c.props.id)
				.includes(props.id)

			if (!isChild) {
				console.error(
					"⚠️ You've passed the props of a component that isn't a child of the Scroll component's content Frame to useScrollControls. You should only pass props from a component that is a descendent of the Scroll's connected content Frame."
				)
				return
			}

			const absolute = {
				x: props.left,
				y: props.top,
				midX: props.left + props.width / 2,
				midY: props.top + props.height / 2,
				maxX: props.left + props.width,
				maxY: props.top + props.height,
				height: props.height,
				width: props.width,
			}

			setState({
				...state,
				absolute,
			})
		}, [store.content])

		return state
	}

	return {
		useScrollConnector,
		useScrollState,
		useScrollItemState,
		setScrollX,
		setScrollY,
		setScrollPoint,
		scrollToPoint,
	}
}

type Point = { x: number; y: number }

const findChildById = (children: any[], id: string) => {
	return children.find((child) => {
		if (child.props.id === id) {
			return true
		}
		if (child.props.children) {
			return findChildById(child.props.children, id)
		} else {
			return false
		}
	})
		? true
		: false
}
