import { initialErrors, initialValues } from '../App';

export const appValidations = (values: Partial<typeof initialValues>): Partial<typeof initialErrors> => {
	const errors: Partial<typeof initialErrors> = {};

	const formatValidatorKey = (value: string): string => {
		const val = value.replace(/([A-Z])/g, ' $1');
		return val.charAt(0).toUpperCase() + val.slice(1).toLowerCase();
	};

	const isEmailAddress = (email: string): boolean => {
		const regex = /^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$/; // eslint-disable-line
		return regex.test(String(email).toLowerCase());
	};

	if (values && Object.keys(values).length > 0) {
		let key: keyof typeof initialErrors;
		for (key in values) {
			const value = values[key];
			if (key in initialErrors) {
				if (!value) {
					errors[key] = `${formatValidatorKey(key)} is required`;
				} else {
					if (key === 'email' && !isEmailAddress(value)) {
						errors.email = 'Email address is invalid';
					} else {
						errors[key] = null;
					}
				}
			}
		}
	}

	return errors;
};
