'use strict';

angular.module('mean.operations').controller('OperationsController', ['$scope', 'Global', 'Operations', 'Users', 
    function($scope, Global, Operations, Users) {
        $scope.global = Global;
        $scope.alerts = [];
        $scope.package = {
            name: 'operations'
        };
        console.log( Operations );
        $scope.operations = Operations.query();

        $scope.users = Users.query( function(){
          console.log( $scope.users );
        });

        $scope.addOperation = function(){
          $scope.alerts = [];
          var operation = new Operations( $scope.newOperation );
          operation.$save().then( function(){
            $scope.alerts.push({
              msg: 'L\'opération a été ajoutée avec succès',
              type: 'success'
            })
            $scope.newOperation = {};
          }, function(){
            $scope.alerts.push({
              msg: 'Il y a eu un problème lors de l\'ajout de l\'opération',
              type: 'danger'
            })
          });
        };

        $scope.remove = function( operation, index ){
          operation.$delete().then( function( response ){
            $scope.operations.splice( index, 1 );
            $scope.alerts.push({msg: 'L\'opération a bien été supprimée', type: 'success'});
            
          });
        };
    }
]);
