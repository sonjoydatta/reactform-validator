import { ChangeEvent, FormEvent } from 'react';

export class FormValidator<T, K> {
	constructor(
		private values: T,
		private errors: K,
		private validate: (values: Partial<T>) => Partial<K>,
		private onChangeCallback: ({ values, errors }: { values: T; errors: K }) => void,
		private onCallback: (values: T) => void,
	) {
		this.values = values;
		this.errors = errors;
		this.validate = validate;
		this.onChangeCallback = onChangeCallback;
		this.onCallback = onCallback;
	}

	/**
	 * Change event handler for `HTMLInputElement` `HTMLSelectElement` `HTMLTextAreaElement`
	 * @param e
	 */
	public handleChange = (e: ChangeEvent<FormElement>): void => {
		const { name, type, value } = e.target;
		const errorsData = this.validate({ [name]: value } as any);
		this.errors = { ...this.errors, ...errorsData };
		if (type === 'checkbox') {
			const { checked } = e.target as HTMLInputElement;
			this.values = { ...this.values, [name]: checked };
		} else {
			this.values = { ...this.values, [name]: value };
		}
		this.onChangeCallback({ values: this.values, errors: this.errors });
	};

	/**
	 * Form event submit handler `Form`
	 * @param e
	 */
	public handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
		e.preventDefault();
		const errorsData = this.validate(this.values);
		this.errors = { ...this.errors, ...errorsData };
		this.onChangeCallback({ values: this.values, errors: this.errors });
		if (this.isNullProperties(errorsData)) this.onCallback(this.values);
	};

	/**
	 * Check if all properties is NULL
	 * @param obj
	 * @returns
	 */
	private isNullProperties = (obj: Record<string, any>): boolean => {
		for (const key in obj) {
			if (obj[key] !== null && obj[key] !== '') return false;
		}
		return true;
	};
}

type FormElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
