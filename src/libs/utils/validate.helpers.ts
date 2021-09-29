export const isNotEmpty = (name: string, value: string, onCallback?: VoidFunction): string | void => {
	if (value.trim().length < 1) return `${formatValidatorKey(name)} is required`;
	return isNotUndefined(onCallback);
};

export const isMinLength = (name: string, value: string, length = 3, onCallback?: VoidFunction): string | void => {
	if (value.trim().length < length) return `${formatValidatorKey(name)} should be at least ${length} characters long`;
	return isNotUndefined(onCallback);
};

export const isEmail = (email: string, onCallback?: VoidFunction): string | void => {
	const regex = /^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$/; // eslint-disable-line
	const isValid = regex.test(String(email).toLowerCase());
	if (!isValid) return 'Email address is invalid';
	return isNotUndefined(onCallback);
};

export const isNullProperties = (obj: Record<string, any>): boolean => {
	for (const key in obj) {
		if (obj[key] !== null && obj[key] !== '') return false;
	}
	return true;
};

const isNotUndefined = (onCallback?: VoidFunction): void => {
	if (onCallback && typeof onCallback !== 'undefined') return onCallback();
};

const formatValidatorKey = (value: string): string => {
	const val = value.replace(/([A-Z])/g, ' $1');
	return val.charAt(0).toUpperCase() + val.slice(1).toLowerCase();
};
