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
					<div className="col mt-5">
						<form onSubmit={handleSubmit} noValidate>
							<div className="mb-3">
								<label htmlFor="exampleFormControlInput1" className="form-label">
									Name
								</label>
								<input
									type="text"
									name="name"
									className={`form-control${errors.name ? ' is-invalid' : ''}`}
									id="exampleFormControlInput1"
									placeholder="John Doe"
									onChange={handleChange}
									value={values.name}
								/>
								<div className="invalid-feedback">{errors.name}</div>
							</div>
							<div className="mb-3">
								<label htmlFor="exampleFormControlInput2" className="form-label">
									Email address
								</label>
								<input
									type="email"
									name="email"
									className={`form-control${errors.email ? ' is-invalid' : ''}`}
									id="exampleFormControlInput2"
									placeholder="name@example.com"
									onChange={handleChange}
									value={values.email}
								/>
								<div className="invalid-feedback">{errors.email}</div>
							</div>
							<div className="mb-3">
								<label htmlFor="exampleFormControlTextarea1" className="form-label">
									Example textarea
								</label>
								<textarea
									rows={3}
									name="description"
									className={`form-control${errors.description ? ' is-invalid' : ''}`}
									id="exampleFormControlTextarea1"
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
	description: {
		value: '',
		message: null,
	},
};
