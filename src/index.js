'use strict';

const Jailor = require('./jailor');
const Verifyer = require('./verifyer');

const MidGuard = [Jailor, Verifyer];

module.exports = MidGuard;
