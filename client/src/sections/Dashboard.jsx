import React from 'react';
import PropTypes from 'prop-types';
import Auth from '../utils/AuthClass';

import ShowUsers from '../components/ShowUsers';
import Typography from '../components/Typography';
import MyEvents from '../components/MyEvents';
import Avatar from '../components/Avatar';
import { Icon } from '../components/Icon';

class Dashboard extends React.Component {
	state = {
		username: '',
		company: '',
		location: '',
		email: '',
		description: '',
		events: [],
		users: [],
		user: this.props.currentUser
	};

	Auth = new Auth();

	handleRemoveEvent = id => {
		this.Auth
			.authFetch(`/users/events/${id}`, { method: 'DELETE' })
			.then(res => res.json())
			.then(res => {
				console.log('removed event', res);

				this.setState(prevState => ({
					events: prevState.events.filter(event => event._id !== id)
				}));
			});
	};

	initializeUserBio = () => {
		this.Auth
			.authFetch('/users/me', { method: 'GET' })
			.then(res => res.json())
			.then(res => {
				this.setState(() => ({
					company: res.settings.company,
					email: res.email,
					location: res.settings.location,
					description: res.settings.description
				}));
			})
			.catch(err => console.log(err));
	};

	initializeEventData = () => {
		this.Auth
			.authFetch('/users/settings', {
				method: 'GET'
			})
			.then(event => event.json())
			.then(event => {
				let events = event.events;
				this.setState({
					events
				});
			});
	};

	initializeShowUsers = () => {
		const uid = this.state.user.currentUser._id;
		let loadedUsers = [];

		fetch('/users/usersList', {
			method: 'GET'
		})
			.then(users => users.json())
			.then(users => {
				users.map(user => {
					if (user._id !== uid) {
						loadedUsers.push(user);
						this.setState({
							users: loadedUsers
						});
					}
				});
			});
	};

	displayUsers = () =>
		this.state.users.length > 0 &&
		this.state.users.map(user => {
			let styles = {
				svg: {
					fill: user.isLoggedIn ? '#57e657' : '#ff0000'
				}
			};
			return (
				<li key={user._id}>
					<div className="show-users__flex-container">
						<div className="show-users__flex-container">
							<Avatar avatar={user.settings.avatar} />
							{user.username}
						</div>
						<div className="show-users__icon-wrapper">
							<Icon
								icon="circle"
								addStyles={styles.svg}
								size={20}
								view1={24}
								view2={28}
							/>
						</div>
					</div>
				</li>
			);
		});

	componentDidMount = () => {
		this.initializeEventData();
		this.initializeShowUsers();
	};

	render() {
		return (
			<div className="dashboard__container">
				<div className="dashboard__title-wrapper">
					<Typography headingPrimary="Dashboard" classname="dashboard__title" />
					<Typography
						headingSecondary="What would you like to do?"
						classname="dashboard__sub-title"
					/>
				</div>
				<div className="dashboard__dashboard-card-layout">
					{this.state.users && (
						<ShowUsers
							displayUsers={this.displayUsers}
							users={this.state.users}
							company={this.state.company}
							location={this.state.location}
							description={this.state.description}
							email={this.state.email}
							logout={this.props.logout}
						/>
					)}

					<MyEvents
						events={this.state.events}
						handleRemoveEvent={this.handleRemoveEvent}
					/>
				</div>
				<div>content</div>
			</div>
		);
	}
}

Dashboard.propTypes = {
	logout: PropTypes.func
};

export default Dashboard;
