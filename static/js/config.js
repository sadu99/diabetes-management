function config($routeProvider, $locationProvider, $httpProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'static/views/home.html',
            controller: 'homeController'
        })
        .when('/new-user', {
          	templateUrl: 'static/views/new-user-form.html',
            controller: 'newUserController'
        })
        .otherwise({
            redirectTo: '/'
        });

    config.$inject = ['$routeProvider', "$locationProvider", "$httpProvider"];
}

export default config;
