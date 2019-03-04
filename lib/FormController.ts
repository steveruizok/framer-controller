import Controller from './index'

type BooleanFromStatus = (status: Form) => boolean
type StringFromValue = (value: any) => string
type BooleanFromValue = (value: any) => boolean

type FormField = {
	defaultValue?: any
	required?: boolean | BooleanFromStatus
	validation?: BooleanFromValue
	errorText?: string | StringFromValue
	hidden?: boolean | BooleanFromStatus
}

type FormFields = { [key: string]: FormField }

type Entry = {
	value: any
	errorText: string
	valid: boolean
	hidden: boolean
	required: boolean
}

type Entries = { [key in keyof FormFields]: Entry }

interface Form {
	fields: FormFields
	entries: Entries
	ready: boolean
}

/**
 * Control forms.
 * When creating a form, use an object to define the form's `fields`. 
 * For each field, provide a set of optional properties used to 
 * determine the field's `entry`:
	 * - `defaultValue` - a value for new or reset fields
	 * - `required` - a boolean (or method that takes the Form's state and returns a boolean)
	 * - `validation` - method that takes the field's entry value and returns a boolean
	 * - `errorText` - a string (or method that takes the Form's state and returns a string)
	 * - `hidden` - a boolean (or method that takes the Form's state and returns a boolean)
   * @example```
const controller = new FormController({
  name: {
    defaultValue: "",
    validation: (v) => v.includes(" "),
    errorText: "Please provide a first and last name.",
    required: true,
    hidden: false
  }
})```
 */
export class FormController extends Controller<Form> {
	constructor(fields: FormFields) {
		super({
			fields,
			entries: Object.keys(fields).reduce(
				(a, id) => ({
					...a,
					[id]: {
						value: fields[id].defaultValue,
						errorText: '',
						valid: false,
						hidden: false,
						required: false,
					},
				}),
				{} as Entries
			),
			ready: false,
		})
		const state = this.getComputedState()
		this.resetState(state)
	}

	/**
	 * Return the next state, given a set of incoming entries.
	 * @param incoming
	 */
	private getComputedState(incoming: Partial<Form['entries']> = {}) {
		let { fields, entries } = this.state
		let ready = true

		// Merge in new entries

		entries = { ...entries, ...incoming }

		// Set value-computed properties

		entries = Object.keys(entries).reduce((a, id) => {
			const field = this.state.fields[id]
			const entry = entries[id]

			const { validation, errorText: fieldErrorText } = field
			const { value } = entry

			let valid = false
			let errorText = ''

			// Does the field have value, and does that value pass validation?
			if (value !== undefined && value !== null) {
				valid = validation === undefined ? true : validation(value)

				// If not complete, use error text (as string or function) if provided
				errorText =
					value && !valid && fieldErrorText
						? typeof fieldErrorText === 'string'
							? fieldErrorText
							: fieldErrorText(value)
						: ''
			}

			return {
				...a,
				[id]: {
					value,
					valid,
					errorText,
					hidden: false,
					required: false,
				},
			}
		}, {})

		// Now that the values are all set, set state-computed properties

		for (let id in entries) {
			const field = this.state.fields[id]
			const entry = entries[id]

			entry.hidden =
				field.hidden === undefined
					? false
					: typeof field.hidden === 'boolean'
					? field.hidden
					: field.hidden({
							fields,
							entries,
							ready,
					  })

			entry.required = field.required
				? typeof field.required === 'boolean'
					? field.required
					: field.required({
							fields,
							entries,
							ready,
					  })
				: false

			// If form is still ready, but this field is both required
			// and incomplete, mark it not ready
			if (entry.required && !entry.valid) {
				ready = false
			}
		}

		return {
			fields,
			entries,
			ready,
		}
	}

	/**
	 * Set the value of one of the form's entries.
	 * @param {keyof Form['fields']} id - The entry's `id`.
	 * @param {*} value - The entry's new value.
	 */
	setValue = (id: keyof Form['fields'], value: any) => {
		const { entries } = this.state
		const state = this.getComputedState({
			...entries,
			[id]: { ...entries[id], value },
		})
		this.setState(state)
	}

	/**`
	 * Reset the form's values. All entrys will be reset to the entry's `defaultValue` or `null`.
	 */
	reset = () => {
		const entries = Object.keys(this.state.entries).reduce((a, id) => {
			let entry = this.state.entries[id]
			let field = this.state.fields[id]
			return {
				...a,
				[id]: {
					...entry,
					value: field.defaultValue || null,
				},
			}
		}, {})

		const state = this.getComputedState(entries)

		this.setState(state)
	}

	/**
	 * The form's fields. 	 */
	get fields() {
		return this.state.fields
	}

	/**
	 * The form's entries. For each field, the
	 * - `value` - The entry's value.
	 * - `valid` - Whether that value is `valid`, according to its `field.validation`.
	 * - `errorText` - Any current `errorText` set on invalid fields.
	 * - `required` - Whether the field is currently required.
	 * - `hidden` - Whether the field is currently hidden.
	 */
	get entries() {
		return this.state.entries
	}

	/**
	 * Whether all required entries are valid.
	 */
	get ready() {
		return this.state.ready
	}
}