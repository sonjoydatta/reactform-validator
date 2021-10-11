import { FC } from 'react';
import { IUseFormValues, useForm } from './libs/useForm';
import { isEmail, isMinLength, isNotEmpty } from './libs/utils/validate.helpers';

const App: FC = () => {
	const onSuccess = (data: IUseFormValues<typeof initialState>) => {
		console.log(data);
	};

	const { values, errors, handleChange, handleSubmit } = useForm(initialState, onSuccess);

	return (
		<div className="App">
			<div className="container">
				<div className="row">
					<div className="col-md-6 offset-md-3 my-5">
						<form onSubmit={handleSubmit} noValidate>
							<div className="mb-3">
								<label htmlFor="name" className="form-label">
									Name
								</label>
								<input
									type="text"
									name="name"
									className={`form-control${errors.name ? ' is-invalid' : ''}`}
									id="name"
									placeholder="John Doe"
									onChange={handleChange}
									value={values.name}
								/>
								<div className="invalid-feedback">{errors.name}</div>
							</div>
							<div className="mb-3">
								<label htmlFor="email" className="form-label">
									Email address
								</label>
								<input
									type="email"
									name="email"
									className={`form-control${errors.email ? ' is-invalid' : ''}`}
									id="email"
									placeholder="name@example.com"
									onChange={handleChange}
									value={values.email}
								/>
								<div className="invalid-feedback">{errors.email}</div>
							</div>
							<div className="mb-3">
								<label htmlFor="newPassword" className="form-label">
									New password
								</label>
								<input
									type="password"
									name="password"
									className={`form-control${errors.password ? ' is-invalid' : ''}`}
									id="newPassword"
									onChange={handleChange}
									value={values.password}
								/>
								<div className="invalid-feedback">{errors.password}</div>
							</div>
							<div className="mb-3">
								<label htmlFor="retypeNewPassword" className="form-label">
									Re-type new password
								</label>
								<input
									type="password"
									name="retypePassword"
									className={`form-control${errors.retypePassword ? ' is-invalid' : ''}`}
									id="retypeNewPassword"
									onChange={handleChange}
									value={values.retypePassword}
								/>
								<div className="invalid-feedback">{errors.retypePassword}</div>
							</div>
							<div className="mb-3">
								<label htmlFor="description" className="form-label">
									Example textarea
								</label>
								<textarea
									rows={3}
									name="description"
									className={`form-control${errors.description ? ' is-invalid' : ''}`}
									id="description"
									onChange={handleChange}
									value={values.description}
								></textarea>
								<div className="invalid-feedback">{errors.description}</div>
							</div>
							<button type="submit" className="btn btn-primary">
								Submit
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default App;

const initialState = {
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
