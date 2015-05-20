var assert = require('assert'),
	HanTools = require('../');

describe('HanTools', function(){
	// More like sanity checks
	describe('#constants', function(){
		assert.strictEqual(typeof HanTools.CHOSEONG, 'string', "Choseong list should be string.");
		assert.strictEqual(typeof HanTools.JUNGSEONG, 'string', "Jungseong list should be string.");
		assert.strictEqual(typeof HanTools.JONGSEONG, 'string', "Jongseong list should be string.");
		assert.strictEqual(typeof HanTools.JONGSEONG_EMPTY, 'string', "JONGSEONG_EMPTY should be string.");
		assert.strictEqual(HanTools.CHOSEONG.length, 19, "There are 19 choseongs.");
		assert.strictEqual(HanTools.JUNGSEONG.length, 21, "There are 21 jungseongs.");
		assert.strictEqual(HanTools.JONGSEONG.length, 28, "There are 28 jongseongs.");
		assert.strictEqual(HanTools.JONGSEONG_EMPTY.length, 1, "JONGSEONG_EMPTY's length must be 1.");
		assert.strictEqual(HanTools.CHOSEONG, "ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ", "Choseong list should be exact.");
		assert.strictEqual(HanTools.JUNGSEONG , "ㅏㅐㅑㅒㅓㅔㅕㅖㅗㅘㅙㅚㅛㅜㅝㅞㅟㅠㅡㅢㅣ", "Jungseong list should be exact.");
		assert.strictEqual(HanTools.JONGSEONG.slice(1), "ㄱㄲㄳㄴㄵㄶㄷㄹㄺㄻㄼㄽㄾㄿㅀㅁㅂㅄㅅㅆㅇㅈㅊㅋㅌㅍㅎ", "Jongseong list should be exact.");
		assert.strictEqual(HanTools.JONGSEONG_EMPTY, HanTools.JONGSEONG[0], "The first character of the jongseong list should be JONGSEONG_EMPTY.");
	});
});
