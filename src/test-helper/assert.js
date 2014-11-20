var nodeAssert = require('assert');
var sinon = require('sinon');

export var assert = {};
for (let key in nodeAssert) assert[key] = nodeAssert[key];
for (let key in sinon.assert) assert[key] = sinon.assert[key];
