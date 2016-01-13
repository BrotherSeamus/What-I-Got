var mongoose = require('mongoose');
var Item = require('../models/items');


//creates a schema to standardize Project List creation
var ProjectListSchema = new mongoose.Schema({
	name: {type: String, required: true},
	userID: {type: String, required: true}
});

// Deletes Shopping Lists
ProjectListSchema.statics.delete = function(id, callback){
	this.findById(id, function(err, result) {
		if (err) {
			callback(err);
		} else if (result != undefined) {
			result.remove(callback);
		}
	})
};

module.exports = mongoose.model('ProjectList', ProjectListSchema);