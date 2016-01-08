var mongoose = require('mongoose');
var Item = require('../models/items');


//creates a schema to standardize category creation
var CategorySchema = new mongoose.Schema({
	name: {type: String, required: true},
	collectionID: {type: String, required: true}
});

// Deletes Categories and all associated Items
CategorySchema.statics.delete = function(id, callback){
	this.findById(id, function(err, result){
		if (err) {
			callback(err);
		} else if (result != undefined){
			result.remove(callback);
		}
	});
	Item.remove({categoryID: id}, function(err){
		if(err) {
			callback(err);
		} else if (!err) {
			callback()
		}
	})
};

module.exports = mongoose.model('Category', CategorySchema);