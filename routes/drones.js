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
		res.render('drones/create-form');
	} catch (error) {
		console.log(error);
		next(error);
	}
});

router.post('/drones/create', async (req, res, next) => {
	// Iteration #3: Add a new drone

	try {
		const { name, propellers, maxSpeed } = req.body;

		let checkDrone = await Drone.findOne({ name });

		if (checkDrone) {
			let message = 'Drone already exists!';
			res.render('error', { message });
		}
		//avoid submitting & posting an empty form
		else if (!checkDrone && name && propellers && maxSpeed) {
			let newDrone = await Drone.create({ name, propellers, maxSpeed });
			res.redirect('/drones');
		} else {
			res.redirect('/drones/create');
		}
	} catch (error) {
		console.log(error);
		next(error);
	}
});

router.get('/drones/:id/edit', async (req, res, next) => {
	// Iteration #4: Update the drone
	const { id } = req.params;
	try {
		let droneToEdit = await Drone.findById(id);
		res.render('drones/update-form', { droneToEdit: droneToEdit });
	} catch (error) {
		console.log(error);
		next(error);
	}
});

router.post('/drones/:id/edit', async (req, res, next) => {
	// Iteration #4: Update the drone
	const { id } = req.params;
	const { name, propellers, maxSpeed } = req.body;

	try {
		let droneToUpdate = await Drone.findByIdAndUpdate(id, { name, propellers, maxSpeed }, { new: true });
		res.redirect(`/drones`);
	} catch (error) {
		console.log(error);
		next(error);
	}
});

router.post('/drones/:id/delete', async (req, res, next) => {
	// Iteration #5: Delete the drone
	const { id } = req.params;

	try {
		await Drone.findByIdAndDelete(id);
		res.redirect('/drones');
	} catch (error) {
		console.log(error);
		next(error);
	}
});

module.exports = router;
