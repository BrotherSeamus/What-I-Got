var express = require('express');
var router = express.Router();
var ShoppingList = require('../models/shoppinglists');
var ProjectList = require('../models/projectlists');


/*------------------------Project List-------------------------*/
/* GET Project List. */
router.get('/project/:id', function(req, res, next) {
	var userId = req.params.id;
	ProjectList.find({userID: userId}, function(err, data){
		res.send(data);
	});
});

/*POST new Project List item*/
router.post('/project/:id', function(req, res, next) {
	var newProjectList = {
		name: req.body.name,
		userID: req.params.id
	};

	ProjectList.create(newProjectList, function(err, data){
		if(err) throw err;
		res.send(data);
	});
});

/* DELETE Project List Item*/
router.delete('/project/:id', function(req, res, next) {
	var ID = req.params.id;
	ProjectList.delete(ID, function(err, data){
		if(err) throw err;
		res.send(data);
	});
});

/*------------------------Shopping List-------------------------*/
/* GET  Shopping List. */
router.get('/shopping/:id', function(req, res, next) {
	var userId = req.params.id;
	ShoppingList.find({userID: userId}, function(err, data){
		res.send(data);
	});
});

/*POST new Shopping List item*/
router.post('/shopping/:id', function(req, res, next) {
	var newShoppingList = {
		name: req.body.name,
		userID: req.params.id
	};

	ShoppingList.create(newShoppingList, function(err, data){
		if(err) throw err;
		res.send(data);
	});
});

/* DELETE Shopping List Item*/
router.delete('/shopping/:id', function(req, res, next) {
	var ID = req.params.id;
	ShoppingList.delete(ID, function(err, data){
		if(err) throw err;
		res.send(data);
	});
});

module.exports = router;