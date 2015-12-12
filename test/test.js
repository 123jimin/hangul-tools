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
			assert.strictEqual(HanTools.disintegrate("ㅔ"), "ㅔ");
		});
	});
	describe('#compose()', function(){
		it("should compose hanguls properly", function(){
			assert.strictEqual(HanTools.compose("ㄱㅡㄹ"), "글");
			assert.strictEqual(HanTools.compose("ㅈㅏ"), "자");
			assert.strictEqual(HanTools.compose([null, "ㅏ"]), "ㅏ");
			assert.strictEqual(HanTools.compose(["ㄷ", "ㅏ"]), "다");
			assert.strictEqual(HanTools.compose(["ㅎ", "ㅣ", "ㅎ"]), "힣");
		});
	});
	describe('#dueum()', function(){
		it("should convert the first character correctly", function(){
			assert.strictEqual(HanTools.dueum("녀자"), "여자");
			assert.strictEqual(HanTools.dueum("로동"), "노동");
			assert.strictEqual(HanTools.dueum("니르다"), "이르다");
			assert.strictEqual(HanTools.dueum("량민"), "양민");
			assert.strictEqual(HanTools.dueum("력사"), "역사");
			assert.strictEqual(HanTools.dueum("례외"), "예외");
			assert.strictEqual(HanTools.dueum("로인"), "노인");
			assert.strictEqual(HanTools.dueum("리유"), "이유");
			assert.strictEqual(HanTools.dueum("룡인"), "용인");
			assert.strictEqual(HanTools.dueum("뇨료"), "요료");
			assert.strictEqual(HanTools.dueum("려행"), "여행");
			assert.strictEqual(HanTools.dueum("년도"), "연도");
			assert.strictEqual(HanTools.dueum("뢰"), "뇌");
			assert.strictEqual(HanTools.dueum("리"), "이");
		});
		it("should not convert other first characters", function(){
			assert.strictEqual(HanTools.dueum("나"), "나");
			assert.strictEqual(HanTools.dueum("유"), "유");
			assert.strictEqual(HanTools.dueum("뇌"), "뇌");
			assert.strictEqual(HanTools.dueum("부녀자"), "부녀자");
		});
	});
	describe('#josa()', function(){
		it("should return some string for empty string or non-Hangul", function(){
			var test = function testJosa(s, a){
				var josa = HanTools.josa(s, a);
				assert.ok(josa == a[0] || josa == a[1], "Josa should be one of given two.");
			};
			test("", "이가");
			test("나는 a", "을를");
			test("ㅏ", "이가");
			test("Hello, world!", "을를");
			test("Node.js", "은는");
		});
		it("should return correct josa", function(){
			assert.strictEqual(HanTools.josa("내", "이가"), "가");
			assert.strictEqual(HanTools.josa("남", "이가"), "이");
			assert.strictEqual(HanTools.josa("당신", "을를"), "을");
			assert.strictEqual(HanTools.josa("소금", "을를"), "을");
		});
		it("should work for any strings or arrays", function(){
			assert.strictEqual(HanTools.josa("인간", "12"), "1");
			assert.strictEqual(HanTools.josa("감자", "12"), "2");
			assert.strictEqual(HanTools.josa("소금", [true, false]), true);
			assert.strictEqual(HanTools.josa("감자", [true, false]), false);
		});
	});
	describe('#addJosa()', function(){
		it("should add correct josa", function(){
			assert.strictEqual(HanTools.addJosa("내", "이가"), "내가");
			assert.strictEqual(HanTools.addJosa("당신", "을를"), "당신을");
			assert.strictEqual(HanTools.addJosa("좋아하", "은는"), "좋아하는");
			assert.strictEqual(HanTools.addJosa("것", "은는"), "것은");
		});
	});
	describe('#parseNumber()', function(){
		it("should parse Korean numbers correctly", function(){
			assert.strictEqual(HanTools.parseNumber("천 구백 육십 사"), 1964);
			assert.strictEqual(HanTools.parseNumber("오천 오백 사십 육"), 5546);
			assert.strictEqual(HanTools.parseNumber("구백억 846만 사천 삼백 이십일"), 90008464321);
			assert.strictEqual(HanTools.parseNumber("영"), 0);
		});
	});
	describe('#replaceNumber()', function(){
		it("should recognize Korean numbers correctly", function(){
			assert.strictEqual(HanTools.replaceNumber("점수 천 이백 삼십 사 점"), "점수 1234 점");
			assert.strictEqual(HanTools.replaceNumber("점수 천이백삼십사 점"), "점수 1234 점");
			assert.strictEqual(HanTools.replaceNumber("일 더하기 일 은 귀요미!"), "1 더하기 1 은 귀요미!");
			assert.strictEqual(HanTools.replaceNumber("영"), "0");
			assert.strictEqual(HanTools.replaceNumber("   영"), "   0");
			assert.strictEqual(HanTools.replaceNumber("*  이천오백구십만 칠천오십"), "*  25907050");
		});
		it("should handle numbers with inner-zeros correctly", function(){
			assert.strictEqual(HanTools.replaceNumber("백조 한 마리"), "100000000000000 한 마리");
			assert.strictEqual(HanTools.replaceNumber("구조 구"), "9000000000009");
			assert.strictEqual(HanTools.replaceNumber("이천오백구십만 칠천오십"), "25907050");
		});
	});
	describe('#readNumber()', function(){
		it("should be inverse of parseNumber", function(){
			var test = function testReadNumberInv(n, ans){
				var res = HanTools.readNumber(n);
				assert.strictEqual(res.replace(/\s+/g, ''), ans.replace(/\s+/g, ''));
				assert.strictEqual(HanTools.parseNumber(res), n);
			};
			test(0, "영");
			test(4, "사");
			test(100, "백");
			test(1234, "천 이백 삼십 사");
			test(129048901258, "천 이백 구십억 사천 팔백 구십만 천 이백 오십 팔");
			test(55554444, "오천 오백 오십 오만 사천 사백 사십 사");
			test(11121100, "천 백 십 이만 천 백")
		});
	});
});
