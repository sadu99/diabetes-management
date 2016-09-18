import moment from 'moment';
import _ from 'lodash';

function dialogController($scope, $mdDialog, userService) {
    $scope.form = userService.getUserData();
    $scope.isUserRegistered = userService.isUserRegistered();

    $scope.cancel = () => $mdDialog.cancel();
    $scope.submit = () => {
        let submittedForm = _.cloneDeep($scope.form);
        submittedForm.date_of_birth = convertTime(submittedForm.date_of_birth);
        $mdDialog.hide();
        userService.sendRecord(submittedForm);
    }

    function convertTime(date) {
        return moment(date).format('YYYY-MM-DD');
    }
}

export default dialogController;