'user strict';

var mongoose = require('mongoose'),
   Schema = mongoose.Schema;

var OperationSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  title: {
    type: String,
    required: false,
    trim: true
  },
  debtor: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  creditor: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  author: {
    type: Schema.ObjectId,
    ref: 'User',
    required: false
  },
  amount: {
    type: Number,
    required :true
  }
});

/*
OperationSchema.path('title').validate(function(title) {
    return !!title;
}, 'Title cannot be blank');

OperationSchema.path('amount').validate(function(amount) {
    return amount > 0 && amount * 1 === amount;
}, 'Amount must be a positive number');

OperationSchema.path('author').validate(function(author) {
    return !!author;
}, 'Author cannot be empty');
*/

OperationSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).exec(cb);
};

mongoose.model('Operation', OperationSchema);

