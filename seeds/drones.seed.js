// Iteration #1

droneArray = [
	{ name: 'Drone Weasley', propellers: 7, maxSpeed: 15 },
	{ name: 'Dronald Duck', propellers: 3, maxSpeed: 11 },
	{ name: 'Khal Drono', propellers: 9, maxSpeed: 28 },
];

const mongoose = require('mongoose');

// ℹ️ Sets the MongoDB URI for our app to have access to it.
// If no env has been set, we dynamically set it to whatever the folder name was upon the creation of the app

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1/lab-express-drones';

const Drone = require('../models/Drone.model');

mongoose
	.connect(MONGO_URI)
	.then((x) => {
		console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
		return Drone.create(droneArray);
	})
	.then(() => {
		console.log(`Successfully created ${droneArray.length} drone models in the database`);
		return mongoose.connection.close();
	})
	.then(() => {
		console.log('Closed connection to database.');
	})
	.catch((err) => {
		console.error('Error connecting to mongo: ', err);
	});
