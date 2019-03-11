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
		if (index < 0) return arr
		acc.splice(index, 1)
		return acc
	})

	return arr
}
