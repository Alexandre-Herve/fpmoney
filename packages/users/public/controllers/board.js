'use strict';

angular.module('mean.users')
.controller('BoardController', ['$scope', 'Users', 'Global', 'Operations', '$filter', function( $scope, Users, Global, Operations, $filter ){
  $scope.Global = Global;
  Operations.mines().$promise.then( function( operations ){
    $scope.operations = operations;
    $scope.debits = $filter( 'debits' )( $scope.operations, Global.user._id );
    $scope.credits = $filter( 'credits' )( $scope.operations, Global.user._id );
  });
}])

.filter('credits', function(){
  return function(operations, userId ){
    return operations.reduce( function(previous, current){
      var credit = current.creditor ? ( current.creditor._id == userId ? current.amount : 0 ) : 0;
      return credit + previous;
    }, 0);
  };
})

.filter('debits', function(){
  return function(operations, userId ){
    return operations.reduce( function(previous, current){
      var debt = current.debtor ? ( current.debtor._id == userId ? current.amount : 0 ) : 0;
      return debt + previous;
    }, 0);
  };
});
