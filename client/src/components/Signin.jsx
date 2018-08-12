import React from 'react';

import Topography from '../components/Topography';
import { BorderlessForm } from '../components/Form';
import Button from '../components/Button';

const styles = {
	title: {
		textAlign: 'center',
		color: 'blue',
		fontWeight: 'bold'
	},
	borderlessForm: {
		marginBottom: '3px'
	},
	button: {
		width: '18rem',
		height: '4rem',
		color: 'white',
		fontSize: '1.5rem',
		fontWeight: 'bold',
		margin: '0 auto',
		background: 'var(--primary-color)'
	}
};

const Signin = ({ handleOnChange }) => (
	<div className="signup">
		<div className="signup__signup-container">
			<Topography addStyles={styles.title} headingSecondary="Sign In" />
			<div style={{ marginBottom: '2rem' }}>
				<BorderlessForm
					addStyles={styles.borderlessForm}
					type="text"
					name="username"
					label="username"
					handleOnChange={handleOnChange}
				/>
				<BorderlessForm
					addStyles={styles.borderlessForm}
					type="password"
					name="password"
					label="password"
					btnName="Submit"
					handleOnChange={handleOnChange}
				/>
			</div>
			<Button addStyles={styles.button} type="submit" name="Submit" />
		</div>
	</div>
);

export default Signin;
