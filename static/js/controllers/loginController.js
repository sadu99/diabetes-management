function loginController($scope, userService) {
  $scope.email = '';
  $scope.submit = (email) => userService.login(email);
}

export default loginController;