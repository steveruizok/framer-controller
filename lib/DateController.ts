import { Controller } from './Controller'
import * as dayjs from 'dayjs'

type IDate = dayjs.Dayjs
type Dates<T> = { [K in keyof T]: string }
type State<T> = { [K in keyof T]: IDate }

/**
 * Manage a stateful object of different dates. Uses `dayjs`.
 */
export class DateController<
	C extends { [key: string]: dayjs.ConfigType }
> extends Controller<State<C>> {
	_keys: Array<keyof C>
	_data: State<C>

	constructor(config: C) {
		super(Object.keys(config).reduce(
			(a, k) => ({
				...a,
				[k]: dayjs(config[k]),
			}),
			{}
		) as State<C>)

		this._keys = Object.keys(config)

		let controller = this

		const dataShape: State<C> = this._keys.reduce(
			(a, k) => ({ ...a, [k]: a[k] }),
			{} as State<C>
		)

		this._data = this._keys.reduce((a, k: keyof C) => {
			Object.defineProperty(a, k, {
				get() {
					return controller.state[k]
				},
				set(value: dayjs.Dayjs) {
					controller.set(k, value)
				},
			})

			return a
		}, dataShape)
	}

	/**
	 * Set a value on state.
	 */
	protected set = (key: keyof C, value: dayjs.Dayjs) => {
		this.setState({
			...this.state,
			[key]: value,
		})
	}

	/**
	 * Get the current date.
	 */
	get now(): dayjs.Dayjs {
		return dayjs(new Date())
	}

	/**
	 * Get the dates stored in state as strings.
	 */
	get dates(): Dates<C> {
		return this._keys.reduce(
			(a, k) => ({
				...a,
				[k]: this.data[k].toString(),
			}),
			{} as Dates<C>
		)
	}

	/**
	 * Get the current data state.
	 */
	get data(): State<C> {
		return this._data
	}
}
