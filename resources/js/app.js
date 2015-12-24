var destinyExplorer = angular.module('destinyExplorer', [
  'ngRoute',
  'LocalStorageModule',
  'cfp.hotkeys',
  'ngSanitize'
]);

destinyExplorer.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'resources/js/partials/destiny.html',
        controller: 'DestinyCtrl'
      })
  }]);