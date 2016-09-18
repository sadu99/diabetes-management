function config($routeProvider, $locationProvider, $httpProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'static/views/home.html',
            controller: 'homeController'
        })
        .when('/login', {
            templateUrl: 'static/views/login.html',
            controller: 'loginController'
        })
        .when('/new-user', {
          	templateUrl: 'static/views/home.html',
            controller: 'homeController'
        })
        .otherwise({
            redirectTo: '/'
        });

    config.$inject = ['$routeProvider', "$locationProvider", "$httpProvider"];
}

export default config;
