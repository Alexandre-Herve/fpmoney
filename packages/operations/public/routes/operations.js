'use strict';

angular.module('mean.operations').config(['$stateProvider',
    function($stateProvider) {
        $stateProvider
        .state('operations', {
            url: '/operations/list',
            templateUrl: 'operations/views/index.html'
        })
        .state('new operation', {
            url: '/operations/new',
            templateUrl: 'operations/views/new.html'
        })
        .state('operation', {
            url: '/operations/:operationId',
            templateUrl: 'operations/views/operation.html'
        });
    }
]);
