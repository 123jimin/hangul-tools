var assert = require('assert'),
	HanTools = require('../');

describe('HanTools', function(){
	// More like sanity checks
	describe('#constants', function(){
		assert.strictEqual(typeof HanTools.CHOSEONG, 'string', "Choseong list should be string.");
		assert.strictEqual(typeof HanTools.JUNGSEONG, 'string', "Jungseong list should be string.");
		assert.strictEqual(typeof HanTools.JONGSEONG, 'string', "Jongseong list should be string.");
		assert.strictEqual(typeof HanTools.JONGSEONG_EMPTY, 'string', "JONGSEONG_EMPTY should be string.");
		assert.strictEqual(HanTools.CHOSEONG, "ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ", "Choseong list should be exact.");
		assert.strictEqual(HanTools.JUNGSEONG , "ㅏㅐㅑㅒㅓㅔㅕㅖㅗㅘㅙㅚㅛㅜㅝㅞㅟㅠㅡㅢㅣ", "Jungseong list should be exact.");
		assert.strictEqual(HanTools.JONGSEONG.slice(1), "ㄱㄲㄳㄴㄵㄶㄷㄹㄺㄻㄼㄽㄾㄿㅀㅁㅂㅄㅅㅆㅇㅈㅊㅋㅌㅍㅎ", "Jongseong list should be exact.");
		assert.strictEqual(HanTools.JONGSEONG_EMPTY, HanTools.JONGSEONG[0], "The first character of the jongseong list should be JONGSEONG_EMPTY.");
		assert.strictEqual(HanTools.JONGSEONG_EMPTY.length, 1, "JONGSEONG_EMPTY's length must be 1");
	});
});
