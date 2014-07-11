'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Operation = mongoose.model('Operation'),
    _ = require('lodash');


/**
 * Find operation by id
 */
exports.operation = function(req, res, next, id) {
    Operation.load(id, function(err, operation) {
        if (err) return next(err);
        if (!operation) return next(new Error('Failed to load operation ' + id));
        req.operation = operation;
        next();
    });
};

/**
 * Create an operation
 */
exports.create = function(req, res) {
    var operation = new Operation(req.body);
    //operation.user = req.user;

    operation.save(function(err) {
        if (err) {
            return res.jsonp(500, {
                error: 'Cannot save the operation'
            });
        }
        res.jsonp(operation);

    });
};

/**
 * Update an operation
 */
exports.update = function(req, res) {
    var operation = req.operation;

    operation = _.extend(operation, req.body);

    operation.save(function(err) {
        if (err) {
            return res.jsonp(500, {
                error: 'Cannot update the operation'
            });
        }
        res.jsonp(operation);

    });
};

/**
 * Delete an operation
 */
exports.destroy = function(req, res) {
    var operation = req.operation;

    operation.remove(function(err) {
        if (err) {
            return res.jsonp(500, {
                error: 'Cannot delete the operation'
            });
        }
        res.jsonp(operation);

    });
};

/**
 * Show an operation
 */
exports.show = function(req, res) {
    res.jsonp(req.operation);
};

/**
 * List of Operations
 */
exports.all = function(req, res) {
    Operation.find().sort('-created').populate('creditor').populate('debtor').exec(function(err, operations) {
      console.log( operations );
        if (err) {
            return res.jsonp(500, {
                error: 'Cannot list the operations'
            });
        }
        res.jsonp(operations);

    });
};

/**
 * list my operations
 */

exports.mines = function(req, res) {
    Operation.find({ 
      $or: [
        { debtor: req.user.id }, 
        { creditor: req.user._id }
      ]
    }).sort('-created').populate('creditor').populate('debtor').exec(function(err, operations) {
        if (err) {
            return res.jsonp(500, {
                error: 'Cannot list the operations'
            });
        }
        res.jsonp(operations);

    });
};
