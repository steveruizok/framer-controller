'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const animejs_1 = require('animejs')
const framer_1 = require('framer')
class ScrollController {
	constructor() {
		this._scrollPoint = {
			x: framer_1.motionValue(0),
			y: framer_1.motionValue(0),
		}
		this._direction = {
			x: framer_1.motionValue('none'),
			y: framer_1.motionValue('none'),
		}
		this._progress = {
			x: framer_1.motionValue(0),
			y: framer_1.motionValue(0),
		}
		this._tracked = new Map()
		// Connect to a scroll component's props
		this.connect = (props) => {
			// Guard against connecting to a Frame that isn't a Scroll component
			if (!props || !props.children) {
				console.error(
					'Error: Connect this ScrollController to the' +
						' props of a Scroll component (using an Override).'
				)
				return
			}
			const [component] = props.children
			const [content] = component.props.children
			// Guard against reconnecting to tthe same Scroll component
			// if (component === this._scrollComponent) {
			// 	return
			// }
			// Guard against connecting to a Scroll component without an attached Frame
			if (!content) {
				console.error(
					'Error: Your Scroll component must be connected ' +
						'to a content Frame.'
				)
				return
			}
			// Save scroll component to the class
			this._scrollComponent = component
			this._scrollSize = {
				height: framer_1.motionValue(props.height),
				width: framer_1.motionValue(props.width),
			}
			// Save scroll content to the class
			this._content = content
			this._contentSize = {
				height: content.props.height,
				width: content.props.width,
			}
			// Set tthe controller's direction and progress
			this.setControllerValues()
			this.tracked.clear()
			// Track all children
			// this._tracked = this._content.props.children.reduce(
			// 	(acc: { [key: string]: Tracked }, tracked: any) => {
			// 		acc[tracked.props.id] = this.connectFrame(tracked.props)
			// 		return acc
			// 	},
			// 	{}
			// )
		}
		this.setControllerValues = () => {
			const { x, y } = this._scrollPoint
			const { height: scrollHeight, width: scrollWidth } = this._scrollSize
			const { height: contentHeight, width: contentWidth } = this._contentSize
			// Direction:
			// Which way is the scroll scrolling?
			// closure
			let direction = {
				x: 0,
				y: 0,
			}
			this._direction = {
				x: framer_1.useTransform(x, (x) => {
					const next =
						x < direction.x ? 'right' : x > direction.x ? 'left' : 'none'
					direction.x = x
					return next
				}),
				y: framer_1.useTransform(y, (y) => {
					const next =
						y < direction.y ? 'down' : y > direction.y ? 'up' : 'none'
					direction.y = y
					return next
				}),
			}
			// Declare controller's progress
			this._progress = {
				x: framer_1.useTransform(
					x,
					(x) => x / -(contentWidth - scrollWidth.get())
				),
				y: framer_1.useTransform(
					y,
					(y) => y / -(contentHeight - scrollHeight.get())
				),
			}
		}
		// Connect to / track a child of the scroll's content
		this.connectFrame = (props, margin = { x: 0, y: 0 }) => {
			const { id } = props
			const { x, y } = this._scrollPoint
			const { height: scrollHeight, width: scrollWidth } = this._scrollSize
			const { height: contentHeight, width: contentWidth } = this._contentSize
			const { centerX, centerY, height, width } = props
			const cx = parseFloat(centerX) / 100
			const cy = parseFloat(centerY) / 100
			let minX = 0,
				maxX = scrollHeight.get(),
				minY = 0,
				maxY = scrollWidth.get()
			// calculate absolute position
			const absolute = {
				top: contentHeight * cy - height / 2,
				bottom: contentHeight * cy + height / 2,
				left: contentWidth * cx - width / 2,
				right: contentWidth * cx + width / 2,
				height: height,
				width: height,
			}
			// offset:
			// Where is the Frame now, relative to the scroll window?
			const offset = {
				top: framer_1.useTransform(y, (value) => absolute.top + value),
				right: framer_1.useTransform(x, (value) => absolute.right + value),
				bottom: framer_1.useTransform(y, (value) => absolute.bottom + value),
				left: framer_1.useTransform(x, (value) => absolute.left + value),
			}
			// clip:
			// Which edges of the tracked Frame are overlapping the edges of the scroll window?
			const clip = {
				x: framer_1.useTransform(x, () => {
					x += margin.x
					const l = offset.left.get()
					const r = offset.right.get()
					return l > maxX
						? 'right'
						: r < minX
						? 'left'
						: isBetween(l, minX, maxX) && r > maxX
						? 'clip-right'
						: isBetween(r, minX, maxX) && l < minX
						? 'clip-left'
						: l < minX && r > maxX
						? 'overflow'
						: 'contain'
				}),
				y: framer_1.useTransform(y, () => {
					y += margin.y
					const t = offset.top.get()
					const b = offset.bottom.get()
					return t > maxY
						? 'below'
						: b < minY
						? 'above'
						: isBetween(t, minY, maxY) && b > maxY
						? 'clip-bottom'
						: isBetween(b, minY, maxY) && t < minY
						? 'clip-top'
						: t < minY && b > maxY
						? 'overflow'
						: 'contain'
				}),
			}
			// intersect:
			// How much of the tracked Frame is within the scroll window?
			const intersect = {
				x: framer_1.useTransform(clip.x, (c) => {
					const l = offset.left.get()
					const r = offset.right.get()
					const intersects = {
						'clip-right': (maxX - l) / width,
						'clip-left': r / width,
						overflow: maxX / width,
						contain: 1,
					}
					return intersects[c] || 0
				}),
				y: framer_1.useTransform(clip.y, (c) => {
					const t = offset.top.get()
					const b = offset.bottom.get()
					const intersects = {
						'clip-bottom': (maxY - t) / height,
						'clip-top': b / height,
						overflow: maxY / height,
						contain: 1,
					}
					return intersects[c] || 0
				}),
			}
			// progress:
			// How far is the tracked frame from scrolling into view (0) to scrolling out (1)?
			const progress = {
				x: framer_1.useTransform(offset.left, (l) => {
					return framer_1.transform(l, [maxX, -width], [0, 1])
				}),
				y: framer_1.useTransform(offset.top, (t) => {
					return framer_1.transform(t, [maxY, -height], [0, 1])
				}),
			}
			// travel:
			// Is the tracked Frame below/right (-1), contained (0), or above/left (1)?
			const travel = {
				x: framer_1.useTransform(clip.x, (c) => {
					const l = offset.left.get()
					const r = offset.right.get()
					const intersects = {
						left: 1,
						right: -1,
						'clip-right': -1 + (maxX - l) / width,
						'clip-left': 1 - r / width,
						overflow: 0,
						contain: 0,
					}
					return intersects[c]
				}),
				y: framer_1.useTransform(clip.y, (c) => {
					const t = offset.top.get()
					const b = offset.bottom.get()
					const intersects = {
						above: 1,
						below: -1,
						'clip-bottom': -1 + (maxY - t) / height,
						'clip-top': 1 - b / height,
						overflow: 0,
						contain: 0,
					}
					return intersects[c]
				}),
			}
			// Store everything to tracked
			// under this Frame's id
			this.tracked.set(id, {
				absolute,
				offset,
				clip,
				travel,
				intersect,
				progress,
			})
			return this.tracked.get(id)
		}
		// Scroll to a point
		this.scrollToPoint = (point, options = {}) => {
			const { x, y } = this._scrollPoint
			if (this.animation) {
				this.animation.pause()
			}
			// Create the targets to animate
			const targets = {
				x: x.get(),
				y: y.get(),
			}
			// Use animejs to animate target to new values,
			// and update the motionValues when these change
			this._animation = animejs_1.default(
				Object.assign(
					{
						targets,
						x: -point.x,
						y: -point.y,
						change: () => {
							x.set(targets.x)
							y.set(targets.y)
						},
						begin: () => (this._isAnimating = true),
						complete: () => (this._isAnimating = false),
					},
					options
				)
			)
			return this._animation
		}
		// Scroll to a specific child Frame
		this.scrollToFrame = (id, edge, offset = 0, options = {}) => {
			const { x, y } = this._scrollPoint
			if (this.animation) {
				this.animation.pause()
			}
			const targets = {
				x: x.get(),
				y: y.get(),
			}
			if (!Array.isArray(edge)) {
				edge = [edge]
			}
			let anim = {
				x: 0,
				y: 0,
			}
			const tracked = this.tracked[id]
			// Decide which edges to offset
			const edgeX = edge.find((e) => e === 'left' || e === 'right')
			const edgeY = edge.find((e) => e === 'top' || e === 'bottom')
			// Set anim
			if (edgeX) {
				anim.x = -(tracked.absolute[edgeX] - offset)
			}
			if (edgeY) {
				anim.y = -(tracked.absolute[edgeY] - offset)
			}
			// Use animejs to animate target to new values,
			// and update the motionValues when these change
			this._animation = animejs_1.default(
				Object.assign(
					{ targets },
					anim,
					{
						change: () => {
							x.set(targets.x)
							y.set(targets.y)
						},
						begin: () => (this._isAnimating = true),
						complete: () => (this._isAnimating = false),
					},
					options
				)
			)
			return this._animation
		}
	}
	get overrides() {
		return {
			contentOffsetX: this._scrollPoint.x,
			contentOffsetY: this._scrollPoint.y,
			height: this._scrollSize.height,
			width: this._scrollSize.width,
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
	get tracked() {
		return this._tracked
	}
	get animation() {
		return this._animation
	}
	get isAnimating() {
		return this._isAnimating
	}
}
exports.ScrollController = ScrollController
const isBetween = (a, b, c) => a >= b && a <= c
const isntBetween = (a, b, c) => a < b && a > c
