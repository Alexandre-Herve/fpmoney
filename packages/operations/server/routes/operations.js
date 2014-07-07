'use strict';

var operations = require('../controllers/operations');

// Operation authorization helpers
var hasAuthorization = function(req, res, next) {
    if (!req.user.isAdmin && req.operation.user.id !== req.user.id) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

module.exports = function(Operations, app, auth) {

    app.route('/operations')
        .get(operations.all)
        .post(auth.requiresLogin, operations.create);
    app.route('/operations/:operationId')
        .get(operations.show)
        .put(auth.requiresLogin, hasAuthorization, operations.update)
        .delete(auth.requiresLogin, hasAuthorization, operations.destroy);

    // Finish with setting up the operationId param
    app.param('operationId', operations.operation);
};

