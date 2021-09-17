import { FC } from 'react';
import { appValidations as validate } from './libs/app.validations';
// import { FormValidator } from './libs/formValidator';
import { useForm } from './libs/useForm';

export const initialValues = { email: '', description: '' };
export const initialErrors: IInitialErrors = { email: null, description: null };
const App: FC = () => {
	// const [formData, setFormData] = useState({ values: initialValues, errors: initialErrors });

	const onCallback = (data: typeof initialValues) => {
		console.log(data);
	};

	/**
	 * Validate with React hooks
	 */
	const { values, errors, handleChange, handleSubmit } = useForm({
		initialValues,
		initialErrors,
		validate,
		onCallback,
	});

	/**
	 * Validate class validator
	 */
	// const { handleChange, handleSubmit } = new FormValidator(
	// 	formData.values,
	// 	formData.errors,
	// 	validate,
	// 	setFormData,
	// 	onCallback,
	// );
	// const { values, errors } = formData;

	return (
		<div className="App">
			<div className="container">
				<div className="row">
					<div className="col mt-5">
						<form onSubmit={handleSubmit} noValidate>
							<div className="mb-3">
								<label htmlFor="exampleFormControlInput1" className="form-label">
									Email address
								</label>
								<input
									type="email"
									name="email"
									className={`form-control${errors.email ? ' is-invalid' : ''}`}
									id="exampleFormControlInput1"
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

type IInitialErrors = {
	email: null | string;
	description: null | string;
};
