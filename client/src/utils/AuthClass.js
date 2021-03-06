class Auth {
	register = async (username, password) => {
		return await fetch('/users/sign-up', {
			headers: {
				'Content-Type': 'application/json'
			},
			method: 'POST',
			body: JSON.stringify({ username, password })
		}).then(res => {
			return new Promise((resolve, reject) => {
				if (!res) {
					return reject();
				} else {
					return resolve(res);
				}
			});
		});
	};

	login = async (username, password) => {
		return await fetch('/users/sign-in', {
			headers: {
				'Content-Type': 'application/json'
			},
			method: 'POST',
			body: JSON.stringify({ username, password })
		}).then(res => {
			return new Promise((resolve, reject) => {
				if (!res) {
					return reject();
				} else {
					return resolve(res);
				}
			});
		});
	};

	authFetch = async (url, options) => {
		let headers = {
			'Content-Type': 'application/json',
			'x-auth': `${this.getToken()}`
		};
		return await fetch(url, {
			headers,
			...options
		}).then(res => {
			return new Promise((resolve, reject) => {
				if (!res) {
					return reject();
				} else {
					return resolve(res);
				}
			});
		});
	};

	isTokenExpired(token) {
		try {
			const { exp } = decode(token);
			if (exp < Date.now() / 1000) {
				// Checking if token is expired
				return true;
			} else return false;
		} catch (err) {
			return false;
		}
	}

	isLoggedIn = () => {
		const token = this.getToken();
		return !!token && this.isTokenExpired(token);
	};

	setToken = token => {
		localStorage.setItem('TOKEN', token);
	};

	getToken = () => {
		return localStorage.getItem('TOKEN');
	};

	removeToken = () => {
		localStorage.removeItem('TOKEN');
	};

	logout = () => {
		this.authFetch('/users/token', {
			method: 'DELETE'
		});
		this.removeToken();
	};

	_checkStatus(response) {
		// raises an error in case response status is not a success
		if (response.status >= 200 && response.status < 300) {
			return response.json();
		} else {
			var error = new Error(response.statusText);
			throw error;
		}
	}
}

const authorize = new Auth();
export default authorize;
