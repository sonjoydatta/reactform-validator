# React form validation using hook

This will help you to validate your form by simply passing an array in the `useForm` hook and it will return you a callback with `data` if all the fields are successfully validated with your given validation rules.

## How to use

-   You need copy `useForm.tsx` and `utils` folder from the `src/libs` folder.
-   Then you can follow the implementation way from the `src/App.tsx`

### Example array,

```javascript
    {
	name: {
		value: '',
		message: null,
		validate: [isNotEmpty, isMinLength(5)],
	},
	email: {
		value: '',
		message: null,
		validate: [isNotEmpty, isEmail],
	},
	password: {
		value: '',
		message: null,
		validate: [isNotEmpty, isMinLength(8)],
	},
	retypePassword: {
		value: '',
		message: null,
		equalTo: 'password',
		validate: [isNotEmpty, isMinLength(8)],
	},
	description: {
		value: '',
		message: null,
	},
};
```
