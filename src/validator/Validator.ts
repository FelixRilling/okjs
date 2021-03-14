/**
 * @internal
 */
type HtmlInputValue = string | boolean;

/**
 * A function which takes the input value of an element and the element itself.
 *
 * @internal
 */
type ValidationFunction<TResult> = (
    val: HtmlInputValue,
    element: HTMLInputElement,
    e?: Event
) => TResult;

/**
 * Interface for a single validator.
 *
 * @public
 */
export interface Validator {
    msg: string | ValidationFunction<string>;
    fn: ValidationFunction<boolean>;
}
