const express = require('express');
const router = express.Router();

// require the Drone model here
const Drone = require('../models/Drone.model');

router.get('/drones', async (req, res, next) => {
	// Iteration #2: List the drones
	try {
		let allDrones = await Drone.find();
		res.render('drones/list', { drones: allDrones });
	} catch (error) {
		console.log(error);
		next(error);
	}
});

router.get('/drones/create', async (req, res, next) => {
	// Iteration #3: Add a new drone

	try {

		res.render('drones/create-form')


	} catch (error) {
		console.log(error);
		next(error);
	}


});

router.post('/drones/create', async (req, res, next) => {
	// Iteration #3: Add a new drone

	try {
		const { name, propellers, maxSpeed } = req.body;

		//avoid submitting & posting an empty form
		if (name && propellers && maxSpeed) {
		let newDrone = await Drone.create({ name, propellers, maxSpeed })
		res.redirect('/drones');}
		else {
			res.redirect('/drones/create')
		}

	} catch (error) {
		console.log(error);
		next(error);
	}
});

router.get('/drones/:id/edit', (req, res, next) => {
	// Iteration #4: Update the drone
	// ... your code here
});

router.post('/drones/:id/edit', (req, res, next) => {
	// Iteration #4: Update the drone
	// ... your code here
});

router.post('/drones/:id/delete', (req, res, next) => {
	// Iteration #5: Delete the drone
	// ... your code here
});

module.exports = router;
