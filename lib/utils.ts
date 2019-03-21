// Helpers

/**
 * Return a new array without the given item.
 * @param array
 * @param item
 */
export function without(array: any[], items: any | any[]) {
	let arr = [...array]

	if (!Array.isArray(items)) {
		items = [items]
	}

	arr = items.reduce((acc: any[], item: any) => {
		let index = acc.indexOf(item)
		if (index < 0) return acc
		acc.splice(index, 1)
		return acc
	}, arr)

	return arr
}

export const throttle = (fn: (...params: any) => any, wait: number) => {
	let inThrottle: boolean, lastFn: any, lastTime: number

	return function() {
		const context = this,
			args = arguments
		if (!inThrottle) {
			fn.apply(context, args)
			lastTime = Date.now()
			inThrottle = true
		} else {
			clearTimeout(lastFn)
			lastFn = setTimeout(function() {
				if (Date.now() - lastTime >= wait) {
					fn.apply(context, args)
					lastTime = Date.now()
				}
			}, Math.max(wait - (Date.now() - lastTime), 0))
		}
	}
}
