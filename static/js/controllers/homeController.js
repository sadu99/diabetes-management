import dialogController from './dialogController';
import Highcharts from 'highcharts-commonjs';
import _ from 'lodash';
import moment from 'moment';

function homeController($scope, $mdDialog, $timeout, $location, userService) {
    let history = userService.getUserHistory();
    $scope.user = history.length ? history[history.length - 1] : userService.getUserData();

    function convertTimestampToUnix(timestamp) {
        return moment(timestamp, "YYYY-MM-DDTHH:mm:ss").valueOf();
    }
    $scope.config = {
        blood_pressure: {
            yAxis: 'Blood Pressure (mm Hg)',
            unit: 'mm Hg',
            mappingFunc: data => {
                return [convertTimestampToUnix(data.timestamp), parseInt(data.blood_pressure, 10)];
            }
        },
        glucose: {
            yAxis: 'Glucose Concentration (mg/dL)',
            unit: 'mg/dL',
            mappingFunc: data => {
                return [convertTimestampToUnix(data.timestamp), data.glucose];
            }
        },
        insulin: {
            yAxis: 'Insulin Concentration (mu U/mL)',
            unit: 'mu U/mL',
            mappingFunc: data => {
                return [convertTimestampToUnix(data.timestamp), data.insulin];
            }
        },
        BMI: {
            yAxis: 'Body Mass Index (kg/m^2)',
            unit: 'kg/m^2',
            mappingFunc: data => {
                return [convertTimestampToUnix(data.timestamp), data.mass/(data.height^2)];
            }
        }
    };
    $scope.chartSelection = 'glucose';
    let chart;
    $scope.createChart = (type) => {
        if (chart) {
            Highcharts.destroy(chart);
            chart = null;
        }
        chart = Highcharts.createChart(document.getElementById('history-container'), {
            title: {
                text: ''
            },
            xAxis: {
                type: 'datetime'
            },
            yAxis: {
                title: {
                    text: $scope.config[type].yAxis
                }
            },
            tooltip: {
                valueSuffix: $scope.config[type].unit
            },
            legend: {
                enabled: false
            },
            series: [{
                name: $scope.config[type].yAxis,
                data: history.map($scope.config[type].mappingFunc)
            }]
        });
    }

    $scope.createChart($scope.chartSelection);

    function resultCallback(userData, result) {
        $scope.result = _.assign({}, userData, result);
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

    // HACK
    let initialSend = _.cloneDeep($scope.user);
    initialSend.date_of_birth = convertTime(initialSend.date_of_birth);
    userService.sendRecord(initialSend);

    function convertTime(date) {
        return moment(date).format('YYYY-MM-DD');
    }
}

export default homeController;
