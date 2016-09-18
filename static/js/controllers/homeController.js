import dialogController from './dialogController';

function homeController($scope, $mdDialog, $location, userService) {
    if (!userService.isUserRegistered()) return $location.path('/login');

    $scope.user = {
        first_name: 'zi'
    };

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
}

export default homeController;
