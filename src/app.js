var app = angular.module('todoApp', [
    'ngRoute',
    'LocalStorageModule'
]);

app.config(function (localStorageServiceProvider) {
    localStorageServiceProvider
        .setPrefix('todolist')
        .setStorageType('localStorage');
});
