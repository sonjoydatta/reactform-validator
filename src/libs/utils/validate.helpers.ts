export const isNotEmpty = (name: string, value: string): string | undefined => {
	if (value.trim().length < 1) return `${formatValidatorKey(name)} is required`;
};

export const isMinLength = (length = 3) => {
	return (name: string, value: string): string | undefined => {
		if (value.trim().length < length)
			return `${formatValidatorKey(name)} should be at least ${length} characters long`;
	};
};

export const isEmail = (name: string, email: string): string | undefined => {
	const regex = /^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$/; // eslint-disable-line
	const isValid = regex.test(String(email).toLowerCase());
	if (!isValid) return 'Email address is invalid';
};

export const isEqual = (name: string, value: string, value2: string | null): string | undefined => {
	if (value !== value2) return `${formatValidatorKey(name)} does not match`;
};

export const isNullProperties = (obj: Record<string, unknown>): boolean => {
	for (const key in obj) {
		if (obj[key] !== null && obj[key] !== '') return false;
	}
	return true;
};

const formatValidatorKey = (value: string): string => {
	const val = value.replace(/([A-Z])/g, ' $1');
	return val.charAt(0).toUpperCase() + val.slice(1).toLowerCase();
};
