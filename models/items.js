var mongoose = require('mongoose');

//creates a schema to standardize user creation
var ItemSchema = new mongoose.Schema({
	name: {type: String, required: true},
	qty: {type: Number, required: true},
	consumable: {type: Boolean, required: true},
	briefDesc: {type: String},
	compDesc: {type: String},
	categoryID: {type: String, required: true}
});

ItemSchema.statics.delete = function(id, callback){
	this.findById(id, function(err, result){
		if (err) {
			callback(err);
		} else if (result != undefined){
			result.remove(callback);
		}
	});
};

module.exports = mongoose.model('Item', ItemSchema);