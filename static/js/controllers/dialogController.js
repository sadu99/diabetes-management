function dialogController($scope, $mdDialog, userService) {
    $scope.form = userService.getUserData();
    $scope.isUserRegistered = userService.isUserRegistered();

    $scope.cancel = () => $mdDialog.cancel();
    $scope.submit = () => $mdDialog.hide();
}

export default dialogController;