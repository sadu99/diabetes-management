import dialogController from './dialogController';

function homeController($scope, $mdDialog, $timeout, $location, userService) {
    $scope.user = userService.getUserData();

    function resultCallback(result) {
        $scope.result = result;
    }

    userService.subscribe(resultCallback);

    $scope.addNewRecord = (ev) => {
        $mdDialog.show({
            controller: dialogController,
            templateUrl: 'static/views/newRecord.tmpl.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            fullscreen: false
        });
    };

    $scope.logout = () => userService.logout();
    if ($location.path() === '/new-user') {
        $timeout(() => $scope.addNewRecord(), 100);
    } else if (!userService.isUserRegistered()) {
        return $location.path('/login');
    }

}

export default homeController;
