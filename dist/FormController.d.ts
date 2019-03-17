import { Controller } from "./Controller";
declare type BooleanFromStatus = (status: Form) => boolean;
declare type StringFromValue = (value: any) => string;
declare type BooleanFromValue = (value: any) => boolean;
declare type FormField = {
    defaultValue?: any;
    required?: boolean | BooleanFromStatus;
    validation?: BooleanFromValue;
    errorText?: string | StringFromValue;
    hidden?: boolean | BooleanFromStatus;
};
declare type Options = {
    [key: string]: FormField;
};
declare type Entry = {
    value: any;
    errorText: string;
    valid: boolean;
    hidden: boolean;
    required: boolean;
};
declare type Entries = {
    [key in keyof Options]: Entry;
};
interface Form {
    fields: Options;
    data: Entries;
    ready: boolean;
}
/**
 * Control forms.
 * When creating a form, use an object to define the form's `fields`.
 * For each field, provide a set of optional properties used to
 * determine the field's `data` entry:
     * - `defaultValue` - a value for new or reset fields
     * - `required` - a boolean (or method that takes the Form's state and returns a boolean)
     * - `validation` - method that takes the field's data value and returns a boolean
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
export declare class FormController extends Controller<Form> {
    constructor(options: Options);
    /**
     * Return the next state, given a set of incoming entries.
     * @param incoming
     */
    private getComputedState;
    /**
     * Set the value of one of the form's data entries.
     * @param {keyof Form['fields']} id - The data entry's `id`.
     * @param {*} value - The data entry's new value.
     */
    setValue: (id: string | number, value: any) => void;
    /**
     * The form's fields. 	 */
    readonly fields: Options;
    /**
     * The form's data entries. For each field, the
     * - `value` - The entry's value.
     * - `valid` - Whether that value is `valid`, according to its `field.validation`.
     * - `errorText` - Any current `errorText` set on invalid fields.
     * - `required` - Whether the field is currently required.
     * - `hidden` - Whether the field is currently hidden.
     */
    readonly data: Entries;
    /**
     * Whether all required data entries are valid.
     */
    readonly ready: boolean;
}
export {};
