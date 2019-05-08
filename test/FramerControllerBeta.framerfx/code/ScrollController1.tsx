import * as anime from 'animejs'

import { motionValue, transform, useTransform, MotionValue } from 'framer'
import { Directions } from '../../../lib/types'

export type Marker = {
	absolute: {
		top: number
		bottom: number
		left: number
		right: number
	}
	offset: {
		top: MotionValue<number>
		bottom: MotionValue<number>
		left: MotionValue<number>
		right: MotionValue<number>
	}
	intersect: { x: MotionValue<number>; y: MotionValue<number> }
	clip: {
		x: MotionValue<
			'none' | 'both' | 'both-left' | 'both-right' | 'left' | 'right'
		>
		y: MotionValue<
			'none' | 'both' | 'both-top' | 'both-bottom' | 'top' | 'bottom'
		>
	}
	progress: { x: MotionValue<number>; y: MotionValue<number> }
}

export type Edge = 'top' | 'bottom' | 'left' | 'right'

export class ScrollController {
	private _scrollPoint = {
		x: motionValue(0),
		y: motionValue(0),
	}

	private _direction: {
		x: MotionValue<keyof Directions['x']>
		y: MotionValue<keyof Directions['y']>
	}

	private _progress: {
		x: MotionValue<number>
		y: MotionValue<number>
	}

	private _scrollComponent: any

	private _content: any

	private _scrollSize: {
		height: number
		width: number
	}
	private _contentSize: {
		height: number
		width: number
	}

	private _markers: { [key: string]: Marker } = {}

	private _animation?: anime.AnimeInstance

	private _isAnimating: boolean

	// Connect to a scroll component's props
	connect = (props: any) => {
		if (!props || !props.children) {
			console.error(
				'Error: Connect this ScrollController to the props of a Scroll component (using an Override).'
			)
			return
		}

		const [component] = props.children
		const [content] = component.props.children

		if (!content) {
			console.error(
				'Error: Your Scroll component must be connected to a content Frame.'
			)
			return
		}

		this._scrollComponent = component
		this._content = content

		this._scrollSize = {
			height: props.height,
			width: props.width,
		}

		this._contentSize = {
			height: content.props.height,
			width: content.props.width,
		}

		let direction = {
			x: 0,
			y: 0,
		}

		this._direction = {
			x: useTransform(this._scrollPoint.x, (x) => {
				const next =
					x < direction.x ? 'right' : x > direction.x ? 'left' : 'none'

				direction.x = x
				return next
			}),
			y: useTransform(this._scrollPoint.y, (y) => {
				const next = y < direction.y ? 'down' : y > direction.y ? 'up' : 'none'

				direction.y = y
				return next
			}),
		}

		this._progress = {
			x: useTransform(
				this._scrollPoint.x,
				(x) => x / -(this._contentSize.width - this._scrollSize.width)
			),
			y: useTransform(
				this._scrollPoint.y,
				(y) => y / -(this._contentSize.height - this._scrollSize.height)
			),
		}

		this._markers = this.getMarkers()
	}

	// Connect children to motion values
	private getMarkers = () => {
		const { height: scrollHeight, width: scrollWidth } = this._scrollSize
		const { height: contentHeight, width: contentWidth } = this._contentSize

		return this._content.props.children.reduce(
			(acc: { [key: string]: Marker }, marker, index) => {
				const { centerX, centerY, height, width } = marker.props
				const cx = parseFloat(centerX) / 100
				const cy = parseFloat(centerY) / 100

				let id = marker.props.id

				if (acc[id]) {
					console.warn(
						`Warning: Found markers with the same markerId value, ${id}! The second will overwrite the first.`
					)
				}

				let minX = 0,
					maxX = this._scrollSize.width,
					minY = 0,
					maxY = this._scrollSize.height

				// calculate absolute position
				const absolute = {
					top: contentHeight * cy - height / 2,
					bottom: contentHeight * cy + height / 2,
					left: contentWidth * cx - width / 2,
					right: contentWidth * cx + width / 2,
					height: height,
					width: height,
				}

				// declare offset values
				const offset = {
					top: useTransform(
						this._scrollPoint.y,
						(value) => absolute.top + value
					),
					right: useTransform(
						this._scrollPoint.x,
						(value) => absolute.right + value
					),
					bottom: useTransform(
						this._scrollPoint.y,
						(value) => absolute.bottom + value
					),
					left: useTransform(
						this._scrollPoint.x,
						(value) => absolute.left + value
					),
				}

				// declare clip values
				const clip = {
					x: useTransform(this._scrollPoint.x, (value) => {
						const l = offset.left.get()
						const r = offset.right.get()

						return l > maxX
							? 'right'
							: r < minX
							? 'left'
							: l > minX && l < maxX && r > maxX
							? 'clip-right'
							: l < minX && r < maxX && r > minX
							? 'clip-left'
							: l < minX && r > maxX
							? 'overflow'
							: 'contain'
					}),
					y: useTransform(this._scrollPoint.y, () => {
						const t = offset.top.get()
						const b = offset.bottom.get()
						return t > maxY
							? 'below'
							: b < minY
							? 'above'
							: t > minY && t < maxY && b > maxY
							? 'clip-bottom'
							: t < minY && b < maxY && b > minY
							? 'clip-top'
							: t < minY && b > maxY
							? 'overflow'
							: 'contain'
					}),
				}

				// declare intersect values
				const intersect = {
					x: useTransform(clip.x, (c) => {
						const l = offset.left.get()
						const r = offset.right.get()

						const intersects = {
							'clip-right': (maxX - l) / width,
							'clip-leftt': r / width,
							overflow: scrollWidth / width,
							contain: 1,
						}

						return intersects[c] || 0
					}),
					y: useTransform(clip.y, (c) => {
						const t = offset.top.get()
						const b = offset.bottom.get()

						const intersects = {
							'clip-botttom': (maxY - t) / height,
							'clip-top': b / height,
							overflow: scrollHeight / height,
							contain: 1,
						}

						return intersects[c] || 0
					}),
				}

				// declare progress values
				const progress = {
					x: useTransform(offset.left, (l) => {
						return transform(l, [scrollWidth, -width], [0, 1])
					}),
					y: useTransform(offset.top, (t) => {
						return transform(t, [scrollHeight, -height], [0, 1])
					}),
				}

				// Store everything to the accumulator object
				// under this Frame's id
				acc[id] = {
					absolute,
					offset,
					clip,
					intersect,
					progress,
				}

				return acc
			},
			{}
		)
	}

	// Scroll to a point
	public scrollToPoint = (
		point: { x: number; y: number },
		options: { [key: string]: any } = {}
	) => {
		if (this.animation) {
			this.animation.pause()
		}

		// Create the targets to animate
		const targets = {
			x: this.scrollPoint.x.get(),
			y: this.scrollPoint.y.get(),
		}

		// Use animejs to animate target to new values,
		// and update the motionValues when these change
		this._animation = anime({
			targets,
			x: point.x,
			y: point.y,
			change: () => {
				this._scrollPoint.x.set(targets.x)
				this._scrollPoint.y.set(targets.y)
			},
			begin: () => (this._isAnimating = true),
			complete: () => (this._isAnimating = false),
			...options,
		})

		return this._animation
	}

	// Scroll to a specific child Frame
	public scrollToFrame = (
		id: string,
		edge: Edge | Edge[],
		offset: number = 0,
		options: { [key: string]: any } = {}
	) => {
		if (this.animation) {
			this.animation.pause()
		}

		const targets = {
			x: this.scrollPoint.x.get(),
			y: this.scrollPoint.y.get(),
		}

		if (!Array.isArray(edge)) {
			edge = [edge]
		}

		let anim = {
			x: 0,
			y: 0,
		}

		const marker = this.markers[id]

		// Decide which edges to offset

		const edgeX = edge.find((e) => e === 'left' || e === 'right')
		const edgeY = edge.find((e) => e === 'top' || e === 'bottom')

		// Set anim

		if (edgeX) {
			anim.x = -(marker.absolute[edgeX] - offset)
		}

		if (edgeY) {
			anim.y = -(marker.absolute[edgeY] - offset)
		}

		// Use animejs to animate target to new values,
		// and update the motionValues when these change
		this._animation = anime({
			targets,
			...anim,
			change: () => {
				this._scrollPoint.x.set(targets.x)
				this._scrollPoint.y.set(targets.y)
			},
			begin: () => (this._isAnimating = true),
			complete: () => (this._isAnimating = false),
			...options,
		})

		return this._animation
	}

	get overrides() {
		return {
			contentOffsetX: this._scrollPoint.x,
			contentOffsetY: this._scrollPoint.y,
		}
	}

	get scrollComponent() {
		return this._scrollComponent
	}

	get content() {
		return this._content
	}

	get contentSize() {
		return this._contentSize
	}

	get scrollSize() {
		return this._scrollSize
	}

	get direction() {
		return this._direction
	}

	get progress() {
		return this._progress
	}

	get scrollPoint() {
		return this._scrollPoint
	}

	get markers() {
		return this._markers
	}

	get animation() {
		return this._animation
	}

	get isAnimating() {
		return this._isAnimating
	}
}
