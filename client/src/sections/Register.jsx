import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import {
	isLoggedIn,
	setUser,
	setUsername,
	setAvatar
} from '../actions/users';
import Typography from '../components/Typography';
import authorize from '../utils/AuthClass';
import Signup from '../components/Signup';

class Register extends Component {
	state = {
		formType: 'password',
		checked: false,
		username: null,
		password: null,
		errors: null
	};

	handleOnChange = evt => {
		const { name, value } = evt.target;
		this.setState(() => ({ [name]: value, errors: '' }));
	};

	handleCheckBoxChange = () => {
		let form = document.querySelector('#password');

		if (form !== null || form !== undefined) {
			this.setState(() => ({
				formType:
					this.state.formType === 'password' ? 'text' : 'password',
				checked: !this.state.checked ? true : false
			}));
		}
	};

	handleOnSubmit = async event => {
		event.preventDefault();

		const { register, setToken } = authorize;
		const { username, password } = this.state;

		const sanitizeUser = username.toString().toLowerCase().trim();

		if (sanitizeUser.length && password.length) {
			if (sanitizeUser.length > 3) {
				this.setState(() => ({ errors: '' }));
				try {
					const response = await register(sanitizeUser, password);
					const res = await response.json();
					if (res.error) {
						this.setState(() => ({ errors: res.error }));
					} else {
						setToken(res.tokens[0].token);
						this.props.setUser(res);
						this.props.setUsername(this.state.username);
						this.props.isLoggedIn(true);
						this.props.setAvatar(res.settings.avatar);
						this.props.history.push('/dashboard');
					}
				} catch (error) {
					this.setState(() => ({
						errors: `there is an registration error ${error}`
					}));
				}
			} else {
				this.setState(() => ({
					errors: 'username must be more than 3 letters'
				}));
			}
		} else {
			this.setState(() => ({
				errors: 'Please fill out form'
			}));
		}
	};

	render() {
		return (
			<div className="signup">
				<div className="signup__title">
					<Typography
						className={'signup__heading'}
						headingPrimary="Sign Up for nightlife"
					/>
				</div>

				<div className="signup__card">
					<div className="signup__container">
						<form onSubmit={this.handleOnSubmit}>
							<Signup
								errors={this.state.errors}
								formType={this.state.formType}
								checked={this.state.checked}
								handleCheckBoxChange={this.handleCheckBoxChange}
								handleOnChange={this.handleOnChange}
							/>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

const RegisterWithRouter = withRouter(
	connect(null, { setUser, setUsername, isLoggedIn, setAvatar })(
		Register
	)
);

export default RegisterWithRouter;
