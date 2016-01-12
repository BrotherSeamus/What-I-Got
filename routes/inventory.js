var express = require('express');
var router = express.Router();
var Collection = require('../models/collections');
var Category = require('../models/categories');
var Item = require('../models/items');

/*------------------------COLLECTIONS------------------------*/
/* GET Collection listing. */
router.get('/collection/:id', function(req, res, next) {
	var userId = req.params.id;
	Collection.find({userID: userId}, function(err, data){
		res.send(data);
	});

});

/*POST new Collection*/
router.post('/collection/:id', function(req, res, next) {
	var newCollection = {
		name: req.body.name,
		userID: req.params.id
	};

	Collection.create(newCollection, function(err, data){
		if(err) throw err;
		res.send(data);
	});
});

/*Update Collection Name*/
router.put('/collection/:id', function(req, res, next) {
	var collectionID = req.params.id;
	var collectionName = req.body.name;
	Collection.findByIdAndUpdate(collectionID, {name: collectionName}, {new:true}, function(err, data){
		res.send(data);
	});
});

/*DELETE Collection*/
router.delete('/collection/:id', function(req, res, next) {
	var ID = req.params.id;
	Collection.delete(ID, function(err){
		if(err) throw err;
		res.send();
	});
});

/*-------------------------CATEGORIES-------------------------*/
/* GET Category listing for a specific collection */
router.get('/category/:id', function(req, res, next) {
	var collectionId = req.params.id;
	Category.find({collectionID: collectionId}, function(err, data){
		res.send(data);
	});

});

/*POST new Category linked to a specific Collection*/
router.post('/category/:id', function(req, res, next) {
	var newCategory = {
		name: req.body.name,
		collectionID: req.params.id
	};

	Category.create(newCategory, function(err, data){
		if(err) throw err;
		res.send(data);
	});
});

/*Update Category Name*/
router.put('/category/:id', function(req, res, next) {
	var ID = req.params.id;
	var categoryName = req.body.name;
	Category.findByIdAndUpdate(ID, {name: categoryName}, {new:true}, function(err, data){
		res.send(data);
	});
});

/*DELETE Category*/
router.delete('/category/:id', function(req, res, next) {
	var ID = req.params.id;
	Category.delete(ID, function(err){
		if(err) throw err;
		res.send();
	});
});

/*----------------------------ITEMS----------------------------*/
/* GET Item listing for a specific Category */
router.get('/item/:id', function(req, res, next) {
	var categoryId = req.params.id;
	Item.find({categoryID: categoryId}, function(err, data){
		res.send(data);
	});

});

/*POST new Item to a specific Category*/
router.post('/item/:id', function(req, res, next) {
	var newItem = {
		name: req.body.name,
		qty: req.body.qty,
		consumable: req.body.consumable,
		briefDesc: req.body.bDesc,
		compDesc: req.body.cDesc,
		categoryID: req.params.id
	};

	Item.create(newItem, function(err, data){
		if(err) throw err;
		res.send(data);
	});
});

/*Update Item information*/
router.put('/item/', function(req, res, next) {
	var ID = req.body._id;
	Item.findByIdAndUpdate(ID, {
		name: req.body.name,
		qty: req.body.qty,
		consumable: req.body.consumable,
		briefDesc: req.body.briefDesc,
		compDesc: req.body.compDesc
	}, {new:true}, function(err, data){
		res.send(data);
	});
});

/*DELETE Item*/
router.delete('/item/:id', function(req, res, next) {
	var ID = req.params.id;
	Item.delete(ID, function(err, data){
		if(err) throw err;
		res.send(data);
	});

});

module.exports = router;
