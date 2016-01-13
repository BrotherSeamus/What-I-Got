var mongoose = require('mongoose');
var Item = require('../models/items');


//creates a schema to standardize Shopping List creation
var ShoppingListSchema = new mongoose.Schema({
	name: {type: String, required: true},
	userID: {type: String, required: true}
});

// Deletes Shopping Lists
ShoppingListSchema.statics.delete = function(id, callback){
	this.findById(id, function(err, result) {
		if (err) {
			callback(err);
		} else if (result != undefined) {
			result.remove(callback);
		}
	})
};

module.exports = mongoose.model('ShoppingList', ShoppingListSchema);