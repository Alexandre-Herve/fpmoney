'use strict';

angular.module('mean.users')

.factory('Users', [ '$resource', function( $resource ) {
  return $resource('users/:userId', {
    userId: '@_id'
  }, {
    all: { method: 'GET', params: { userId: "all" }, isArray: true }
  });
}])

.factory('UsersOperations', [ '$resource', function( $resource ){
  return $resource('users/:userId/operations', {
    userId: '@_id'
  });
}]);
