function userService($http) {
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
		isUserRegistered: () => false,
	};
}

export default userService;