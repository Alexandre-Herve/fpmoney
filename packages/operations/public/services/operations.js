'use strict';

angular.module('mean.operations').factory('Operations', [ '$resource', function( $resource ) {
        return $resource('operations/:operationId', {
          operationId: '@_id'
        }, {
          'mines': { method: 'GET', params: { operationId: "mines" }, isArray: true }
        });
}]);
