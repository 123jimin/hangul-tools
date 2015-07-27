var assert = require('assert'),
	HanTools = require('../');

describe('HanTools', function(){
	describe('#Keyboard', function(){
		it("should have some important keyboards", function(){
			assert.strictEqual(typeof HanTools.Keyboard, 'function');
			assert.strictEqual(typeof HanTools.Keyboard.QWERTY, 'function');
			assert.strictEqual(typeof HanTools.Keyboard.DUBEOLSIK, 'function');
			assert.strictEqual(typeof HanTools.Keyboard.SEBEOLSIK_390, 'function');
		});
	});
});
