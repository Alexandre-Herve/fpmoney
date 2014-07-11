'use strict';

angular.module('mean.users').config(['$stateProvider', function($stateProvider) {
  $stateProvider
  .state('users', {
    url: '/users',
    templateUrl: 'users/views/users.tpl.html'
  });
}]);
