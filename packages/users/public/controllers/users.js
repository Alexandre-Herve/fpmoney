'user strict';
angular.module('mean.users')
.controller('UsersController', ['$scope', 'Users', 'UsersOperations', function( $scope, Users, UsersOperations ){
  Users.all().$promise.then( function( response ){
    $scope.users = response;
    angular.forEach( response, function( user ){
      UsersOperations.query({ userId: user._id }).$promise.then( function( response ){
        user.operations = response;
      });
    });
  });
}]);
