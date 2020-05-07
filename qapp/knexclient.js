const env = process.env.ENVIRONMENT || 'development';
const knexconfig = require('./knexfile')[env];

module.exports = require('knex')(knexconfig)