var mongoose = require('mongoose');
var Category = require('../models/categories');
var Item = require('../models/items');

//creates a schema to standardize collection creation
var CollectionSchema = new mongoose.Schema({
	name: {type: String, required: true},
	userID: {type: String, required: true}
});

// Deletes Collection and all associated Categories and Items
CollectionSchema.statics.delete = function(id, callback){
	// Deletes the Collection using the Collection id
	this.findById(id, function(err, result){
		if (err) {
			callback(err);
		} else if (result != undefined){
			result.remove(callback);
		}
	});
	// Deletes all associated Categories and Items using Category.delete method
	Category.find({collectionID: id}, function(err, data){
		if(err) {
			callback(err);
		} else if (data) {
			data.forEach(function(record){
				console.log(record._id);
				var ID = record._id;
				Category.delete(ID, function(err){
					if(err) {
						callback(err);
					}
				})
			});
		}
	});
};

module.exports = mongoose.model('Collection', CollectionSchema);