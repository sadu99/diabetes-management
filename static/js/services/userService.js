import _ from 'lodash';

function userService($http, $q, $location) {
	const clients = [];
	let isUserRegistered = false;
	let userData = {
		email: '',
		first_name: '',
		last_name: '',
		phone_number: '',
		mass: '',
		height: '',
		date_of_birth: '',
		blood_pressure: '',
		glucose: '',
		insulin: '',
		timestamp: '',
	};
	let history = [];

	return {
		getUserData: () => userData,
		getUserHistory: () => history,
		isUserRegistered: () => isUserRegistered,
		subscribe: (cb) => clients.push(cb),
		login: (email) => {
			const deferred = $q.defer();

			$http.get('/api/history/' + email).then((response) => {
				const data = response.data;
				history = data;
				if (data && data.length) {
					isUserRegistered = true;
					userData = data[data.length - 1];
					return deferred.resolve(response.data);
				}
				isUserRegistered = false;
				userData.email = email;
				deferred.reject('userNotFound');
			}, (response) => {
				isUserRegistered = false;
				return deferred.reject('serverError');
			});
			return deferred.promise;
		},
		logout: () => {
			userData = {
				email: '',
				first_name: '',
				last_name: '',
				phone_number: '',
				mass: '',
				height: '',
				date_of_birth: '',
				blood_pressure: '',
				glucose: '',
				insulin: '',
				timestamp: '',
			};

			return $location.path('/login');
		},
		sendRecord: (form) => {
			_.assign(userData, _.cloneDeep(form));
			return $http.post('/api/go', form).then(response => {
				clients.forEach(cb => cb(userData, response.data));
				return response;
			});
		}
	};
}

export default userService;