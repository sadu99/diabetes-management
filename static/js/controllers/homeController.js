import dialogController from './dialogController';

function homeController($scope, $mdDialog, $location, userService) {
    $scope.user = userService.getUserData();

    $scope.addNewRecord = function(ev) {
        $mdDialog.show({
            controller: dialogController,
            templateUrl: 'static/views/newRecord.tmpl.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            fullscreen: false
        });
    };
    if ($location.path() === '/new-user') {
        $scope.addNewRecord();
    } else if (!userService.isUserRegistered()) {
        return $location.path('/login');
    }

}

export default homeController;
