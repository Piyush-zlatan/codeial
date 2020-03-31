const Kue = require('kue');

//For paraller jobs
const queue = Kue.createQueue();

module.exports = queue;