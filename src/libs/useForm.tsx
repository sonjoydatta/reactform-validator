import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useState } from 'react';
import { isNullProperties } from './utils/validate.helpers';

export const useForm = <T,>(initialState: T, onCallback: (data: IUseFormValues<T>) => void): ReturnType<T> => {
	/**
	 * Get initial values & errors
	 * @returns
	 */
	const getInitialData = () => {
		const valuesObj = {} as IUseFormValues<T>;
		const errorsObj = {} as IUseFormErrors<T>;

		for (const key in initialState) {
			const value = initialState[key] as unknown as { value: string; message: string };
			valuesObj[key] = value?.value || '';
			errorsObj[key] = value?.message || null;
		}

		return {
			valuesObj,
			errorsObj,
		};
	};

	const [values, setValues] = useState<IUseFormValues<T>>({ ...getInitialData().valuesObj });
	const [errors, setErrors] = useState<IUseFormErrors<T>>({ ...getInitialData().errorsObj });

	/**
	 * Change event handler for `HTMLInputElement` `HTMLSelectElement` `HTMLTextAreaElement`
	 * @param e
	 */
	const handleChange = (e: ChangeEvent<FormElement>) => {
		const { name, type, value } = e.target;
		const validate = (initialState[name as keyof T] as any)?.validate;
		if (validate) {
			const error = validate(name, value) || null;
			setErrors((v) => ({ ...v, [name]: error }));
		}

		if (type === 'checkbox') {
			const { checked } = e.target as HTMLInputElement;
			setValues((v) => ({ ...v, [name]: checked }));
		} else {
			setValues((v) => ({ ...v, [name]: value }));
		}
	};

	/**
	 * Form event submit handler `Form`
	 * @param e
	 */
	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const errorsObj = {} as IUseFormErrors<T>;

		for (const key in values) {
			const value = values[key];
			const validate = (initialState[key as keyof T] as any)?.validate;
			if (validate) errorsObj[key] = validate(key, value) || null;
		}

		if (!isNullProperties(errorsObj)) {
			setErrors(errorsObj);
		} else {
			onCallback(values);
		}
	};

	return {
		values,
		errors,
		setValues,
		setErrors,
		handleChange,
		handleSubmit,
	};
};

export type IUseFormValues<T> = Record<keyof T, string>;
export type IUseFormErrors<T> = Record<keyof T, string | null>;

type ReturnType<T> = {
	values: IUseFormValues<T>;
	errors: IUseFormErrors<T>;
	setValues: Dispatch<SetStateAction<IUseFormValues<T>>>;
	setErrors: Dispatch<SetStateAction<IUseFormErrors<T>>>;
	handleChange: (e: ChangeEvent<FormElement>) => void;
	handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
};

type FormElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
