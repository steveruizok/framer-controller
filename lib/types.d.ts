import anime from 'animejs'

export type State<T> = Partial<T & { controller?: any }>
export type FunctionBasedParameter = (index: number, length: number) => number
export type AnimeCallbackFunction = (anim: anime.AnimeInstance) => void
export type EasingOptions =
	| 'linear'
	| 'easeInQuad'
	| 'easeInCubic'
	| 'easeInQuart'
	| 'easeInQuint'
	| 'easeInSine'
	| 'easeInExpo'
	| 'easeInCirc'
	| 'easeInBack'
	| 'easeInElastic'
	| 'easeOutQuad'
	| 'easeOutCubic'
	| 'easeOutQuart'
	| 'easeOutQuint'
	| 'easeOutSine'
	| 'easeOutExpo'
	| 'easeOutCirc'
	| 'easeOutBack'
	| 'easeOutElastic'
	| 'easeInOutQuad'
	| 'easeInOutCubic'
	| 'easeInOutQuart'
	| 'easeInOutQuint'
	| 'easeInOutSine'
	| 'easeInOutExpo'
	| 'easeInOutCirc'
	| 'easeInOutBack'
	| 'easeInOutElastic'

export type AnimateOptions = {
	duration?: number | FunctionBasedParameter
	delay?: number | FunctionBasedParameter
	elasticity?: number | FunctionBasedParameter
	round?: number | boolean | FunctionBasedParameter

	easing?: EasingOptions | string | ReadonlyArray<number>

	begin?: AnimeCallbackFunction
	run?: AnimeCallbackFunction
	update?: AnimeCallbackFunction
	complete?: AnimeCallbackFunction
}
