function userService($http, $q) {
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

	return {
		getUserData: () => userData,
		isUserRegistered: () => isUserRegistered,
		login: (email) => {
			const deferred = $q.defer();

			$http.get('/api/history/' + email).then((response) => {
				const data = response.data;
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
		sendRecord: (form) => {
			return $http.post('/api/go', form);
		}
	};
}

export default userService;