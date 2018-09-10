import React from 'react';
import Auth from '../utils/AuthClass';

import Typography from '../components/Typography';
import AvatarComponent from '../components/AvatarComponent';
import AccountBioForm from '../components/AccountBioForm';

class Account extends React.Component {
	state = {
		company: '',
		email: '',
		location: '',
		Biography: ''
	};

	Auth = new Auth();

	handleOnSubmit = event => {
		event.preventDefault();
		this.initializeUserData();
		this.handleUpdateUserInfo();
		this.props.history.push('/dashboard');
	};

	handleOnChange = event => {
		const { name, value } = event.target;
		this.setState(() => ({ [name]: value }));
	};

	handleUpdateUserInfo = () => {
		const { company, email, location, description } = this.state;

		this.Auth
			.authFetch('/users/settings/biography', {
				method: 'PATCH',
				body: JSON.stringify({
					company,
					email,
					location,
					description
				})
			})
			.then(res => res.json())
			.then(res => {
				console.log(res);
				this.setState(() => ({
					company: res.settings.company,
					email: res.email,
					location: res.settings.location,
					description: res.settings.description
				}));
			});
	};

	initializeUserData = () => {
		this.Auth
<<<<<<< HEAD
			.authFetch('/settings/avatar', { method: 'POST' })
			.then(results => results.json())
			.then(results => {
				let avatar = results[0].avatar;
				let avatarSelect = results[0].avatarSelect;
				console.log(avatar);
				this.setState(() => ({ avatar, avatarSelect }));
=======
			.authFetch('/users/me', { method: 'GET' })
			.then(res => res.json())
			.then(res => {
				this.setState(() => ({
					company: res.settings.company,
					email: res.email,
					location: res.settings.location,
					description: res.settings.description
				}));
>>>>>>> development
			});
	};

	componentDidMount = () => {
		this.initializeUserData();
	};

	render() {
		return (
			<div className="account">
				<div style={{ display: 'flex' }}>
					<Typography
						headingPrimary="Account"
						classname="account__title"
						addStyles={{color: 'var(--primary-text-color)'}}
					/>
					<Typography
						classname="account__sub-title"
						headingSecondary="create a profile"
						addStyles={{color: 'var(--text-secondary)'}}
					/>
				</div>
				<div className="account__profile-card">
					<Typography
						classname="account__card-title"
						headingTertiary="Change Avatar"
					/>
					<hr />
					<AvatarComponent />
					<hr />
					<Typography
						classname="account__card-title"
						headingTertiary="Add User Info"
					/>
					<hr />
					<AccountBioForm
						company={this.state.company}
						email={this.state.email}
						location={this.state.location}
						description={this.state.description}
						handleOnChange={this.handleOnChange}
						handleOnSubmit={this.handleOnSubmit}
					/>
				</div>
			</div>
		);
	}
}

export default Account;
