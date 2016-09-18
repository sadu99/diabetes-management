function loginController($scope, $location, userService) {
  $scope.email = '';
  $scope.submit = (email) => {
    userService.login($scope.email).then((data) => {
      console.log(data);
      return $location.path('/');
    }, (error) => {
      if (error === 'userNotFound') {
        console.log(error);
        return $location.path('/new-user');
      }
    });
  };
}

export default loginController;