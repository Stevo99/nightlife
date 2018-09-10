import React from 'react';
import PropTypes from 'prop-types';

import Auth from '../utils/AuthClass';
import defaultImgSrc from '../images/bar-default-img.jpg';
import Button from './Button';
import { truncateRes } from '../utils/functions';

const styles = {
	eventButton: {
		width: '100%',
		height: '4rem',
		border: 'none',
		color: 'white',
		fontWeight: 'bold',
		marginBottom: '1.5rem',
		background: 'var(--secondary-color)'
	},
	detailsButton: {
		width: '100%',
		height: '4rem',
		border: 'none',
		color: 'white',
		fontWeight: 'bold',
		background: 'var(--secondary-color)'
	}
};

class SearchResComponent extends React.Component {
	state = { events: [] };
	Auth = new Auth();

	addEvent = () => {
		const name = this.props.name;
		this.Auth
			.authFetch('/events', {
				method: 'POST',
				body: JSON.stringify({ name })
			})
			.then(data => data.json())
			.then(data => {
				console.log(data);
				this.setState(() => ({ events: data.name }));
				this.props.history.push('/dashboard');
			})
			.catch(err => console.log(err));
	};
	componentDidMount = () => {};

	render() {
		return (
		
				<div className="results__card">
					<div className="results__card--left">
						<img
							src={
								this.props.imageSrc !== '' &&
								typeof this.props.imageSrc === 'string' ? (
									this.props.imageSrc
								) : (
									defaultImgSrc
								)
							}
							alt={this.props.imageAlt}
						/>
					</div>
					<div className="results__card--right">
						<div className="results__inner-container">
							<div className="results__name-location-wrapper">
								<h2 className="heading-secondary results__name">
									{truncateRes(this.props.name, 25)}
								</h2>
								<p className="results__location">
									{this.props.location}
								</p>
							</div>
							{this.props.isLoggedIn && (
								<div className="button-wrapper">
									<Button
										addStyles={styles.eventButton}
										type="submit"
										onClick={this.addEvent}
										name="Add to My Events"
									/>
									<Button 
										type="submit" 
										addStyles={styles.detailsButton} 
										name="See more details" 
									/>
								</div>								
							)}
						    {/* {this.props.isLoggedIn && (
								<div className="results__lower-box">
									Number of people attending: 0
								</div>
							)} */}
							{!this.props.isLoggedIn && (
								<div className="results__lower-box">
									Sign in to see more details and keep track of events
								</div>
							)}
						</div>
					</div>
				</div>
			
		);
	}
}

SearchResComponent.propTypes = {
	isLoggedIn: PropTypes.bool,
	imageSrc: PropTypes.string,
	imageAlt: PropTypes.string,
	addEvent: PropTypes.func,
	name: PropTypes.string
};

export default SearchResComponent;
