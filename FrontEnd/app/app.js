'use strict';

// Declare app level module which depends on views, and components
angular.module('libraryApp', [
  'ngRoute',
  'libraryApp.author',
  'libraryApp.book',
  'libraryApp.version'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('pages');

  $routeProvider.otherwise({redirectTo: '/author'});
}]);
