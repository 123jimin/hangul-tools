var assert = require('assert'),
	HanTools = require('../');

describe('HanTools', function(){
	// More like sanity checks
	describe('#constants', function(){
		it("should be exact", function(){
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
	describe('#isHangul()', function(){
		it("should correctly return true for hanguls", function(){
			assert.ok(HanTools.isHangul("가"));
			assert.ok(HanTools.isHangul("강"));
			assert.ok(HanTools.isHangul("힣"));
			assert.ok(HanTools.isHangul("안녕하세요"));
			assert.ok(HanTools.isHangul("가힣아햏햏"));
		});
		it("should find non-hanguls", function(){
			assert.ok(!HanTools.isHangul("F"));
			assert.ok(!HanTools.isHangul("ㅏ"));
			assert.ok(!HanTools.isHangul("ㅓ"));
			assert.ok(!HanTools.isHangul("ㅇ"));
			assert.ok(!HanTools.isHangul("뭐라고?"));
			assert.ok(!HanTools.isHangul("안녕 하세요"));
		});
	});
	describe('#toChoseong()', function(){
		it("should choseongfy a string", function(){
			assert.strictEqual(HanTools.toChoseong("노드.제이에스"), "ㄴㄷ.ㅈㅇㅇㅅ");
			assert.strictEqual(HanTools.toChoseong("안녕하세요 ㅇㅅㅇ, 만나서 반갑습니다."), "ㅇㄴㅎㅅㅇ ㅇㅅㅇ, ㅁㄴㅅ ㅂㄱㅅㄴㄷ.");
		});
	});
	describe('#toJungseong()', function(){
		it("should jungseongfy a string", function(){
			assert.strictEqual(HanTools.toJungseong("노드.제이에스"), "ㅗㅡ.ㅔㅣㅔㅡ");
			assert.strictEqual(HanTools.toJungseong("안녕하세요 ㅇㅅㅇ, 만나서 반갑습니다."), "ㅏㅕㅏㅔㅛ ㅇㅅㅇ, ㅏㅏㅓ ㅏㅏㅡㅣㅏ.");
		});
	});
	describe('#toJongseong()', function(){
		it("should jongseongfy a string", function(){
			var X = HanTools.JONGSEONG_EMPTY;
			assert.strictEqual(HanTools.toJongseong("안녕하세요!"), "ㄴㅇ"+X+X+X+"!");
			assert.strictEqual(HanTools.toJongseong("노드.제이에스"), X+X+"."+X+X+X+X);
			assert.strictEqual(HanTools.toJongseong("안녕하세요 ㅇㅅㅇ, 만나서 반갑습니다."), "ㄴㅇ"+X+X+X+" ㅇㅅㅇ, ㄴ"+X+X+" ㄴㅂㅂ"+X+X+".");
		});
	});
	describe('#disintegrate()', function(){
		it("should disintegrate a character properly", function(){
			assert.deepEqual(HanTools.disintegrate("가"), ["ㄱ", "ㅏ"]);
			assert.deepEqual(HanTools.disintegrate("강"), ["ㄱ", "ㅏ", "ㅇ"]);
			assert.deepEqual(HanTools.disintegrate("ㅔ"), "ㅔ");
		});
	});
	describe('#dueum()', function(){
		it("should convert the first character correctly", function(){
			assert.deepEqual(HanTools.dueum("녀자"), "여자");
			assert.deepEqual(HanTools.dueum("로동"), "노동");
			assert.deepEqual(HanTools.dueum("니르다"), "이르다");
			assert.deepEqual(HanTools.dueum("량민"), "양민");
			assert.deepEqual(HanTools.dueum("력사"), "역사");
			assert.deepEqual(HanTools.dueum("례외"), "예외");
			assert.deepEqual(HanTools.dueum("로인"), "노인");
			assert.deepEqual(HanTools.dueum("리유"), "이유");
			assert.deepEqual(HanTools.dueum("룡인"), "용인");
			assert.deepEqual(HanTools.dueum("뇨료"), "요료");
			assert.deepEqual(HanTools.dueum("려행"), "여행");
			assert.deepEqual(HanTools.dueum("년도"), "연도");
			assert.deepEqual(HanTools.dueum("뢰"), "뇌");
			assert.deepEqual(HanTools.dueum("리"), "이");
		});
		it("should not convert other first characters", function(){
			assert.deepEqual(HanTools.dueum("나"), "나");
			assert.deepEqual(HanTools.dueum("유"), "유");
			assert.deepEqual(HanTools.dueum("뇌"), "뇌");
			assert.deepEqual(HanTools.dueum("부녀자"), "부녀자");
		});
	});
	describe('#josa()', function(){
	});
	describe('#addJosa()', function(){
	});
	describe('#parseNumber()', function(){
	});
	describe('#replaceNumber()', function(){
	});
	describe('#readNumber()', function(){
	});
});
