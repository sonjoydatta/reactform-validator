import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useState } from 'react';

export const useForm = <T, K>(props: PropsType<T, K>): ReturnType<T, K> => {
	const { initialValues, initialErrors, validate, onCallback } = props;
	const [values, setValues] = useState<T>(initialValues);
	const [errors, setErrors] = useState<K>(initialErrors);

	/**
	 * Check if all properties is NULL
	 * @param obj
	 * @returns
	 */
	const isNullProperties = (obj: Record<string, any>): boolean => {
		for (const key in obj) {
			if (obj[key] !== null && obj[key] !== '') return false;
		}
		return true;
	};

	/**
	 * Change event handler for `HTMLInputElement` `HTMLSelectElement` `HTMLTextAreaElement`
	 * @param e
	 */
	const handleChange = (e: ChangeEvent<FormElement>) => {
		const { name, type, value } = e.target;
		const errorsData = validate({ [name]: value } as any);
		setErrors((prevState) => ({ ...prevState, ...errorsData }));
		if (type === 'checkbox') {
			const { checked } = e.target as HTMLInputElement;
			setValues((prevState) => ({ ...prevState, [name]: checked }));
		} else {
			setValues((prevState) => ({ ...prevState, [name]: value }));
		}
	};

	/**
	 * Form event submit handler `Form`
	 * @param e
	 */
	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const errorsData = validate(values);
		setErrors((prevState) => ({ ...prevState, ...errorsData }));
		if (isNullProperties(errorsData)) onCallback(values);
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

type PropsType<T, K> = {
	initialValues: T;
	initialErrors: K;
	validate: (values: Partial<T>) => Partial<K>;
	onCallback: (values: T) => void;
};

type ReturnType<T, K> = {
	values: T;
	errors: K;
	setValues: Dispatch<SetStateAction<T>>;
	setErrors: Dispatch<SetStateAction<K>>;
	handleChange: (e: ChangeEvent<FormElement>) => void;
	handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
};

type FormElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
