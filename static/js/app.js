import angular from 'angular';
import angularRoute from 'angular-route';
import uiBootstrap from 'angular-ui-bootstrap';
import config from './config';
import homeController from './controllers/homeController';
import newUserController from './controllers/newUserController';
import loginController from './controllers/loginController';
import userService from './services/userService';
import 'angular-animate';
import 'angular-aria';
import 'angular-material';
import 'babel-polyfill';
//configuration could be updated and seperated into different files if needed

var moduleName = "app";
var app = angular.module(moduleName, ['ngRoute', 'ui.bootstrap', 'ngMaterial'])
    .config(config)
    .factory('userService', userService)
    .controller('newUserController', newUserController)
    .controller('loginController', loginController)
    .controller('homeController', homeController);

export default moduleName;
