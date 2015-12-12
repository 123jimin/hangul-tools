"use strict";

(function(){

var HANGUL_FIRST = '가',
	HANGUL_LAST = '힣',
	HANGUL_FIRST_CODE = HANGUL_FIRST.charCodeAt(0),
	HANGUL_LAST_CODE = HANGUL_LAST.charCodeAt(0);

var CHOSEONG = "ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ",
	JUNGSEONG = "ㅏㅐㅑㅒㅓㅔㅕㅖㅗㅘㅙㅚㅛㅜㅝㅞㅟㅠㅡㅢㅣ",
	JONGSEONG = "Xㄱㄲㄳㄴㄵㄶㄷㄹㄺㄻㄼㄽㄾㄿㅀㅁㅂㅄㅅㅆㅇㅈㅊㅋㅌㅍㅎ",
	CHOSEONG_LEN = CHOSEONG.length,
	JUNGSEONG_LEN = JUNGSEONG.length,
	JONGSEONG_LEN = JONGSEONG.length;

var HANGUL_NUMBERS = [
	"영",
	"일一壹",
	"이二",
	"삼三參",
	"사四",
	"오五伍",
	"육六",
	"칠七",
	"팔八",
	"구九",
	"십十拾"
];

var padZero = function padZero(n, l){
	for(n+=''; n.length<l; n='0'+n);
	return n;
};

// Making a regular expression for Numerals
var numRegExp_thousand = null,
	numRegExp = null,
	numReadMap = {};

(function(h_nums){
	h_nums.forEach(function(s, i){
		s.split('').forEach(function(c){
			numReadMap[c] = i;
		});
	});
	h_nums.십 = h_nums[10];
	h_nums.백 = "백百";
	h_nums.천 = "천千仟";
	h_nums.만 = "만萬";
	h_nums.억 = "억億";
	h_nums.조 = "조兆";
	h_nums.경 = "경京";
	var digits = "[1-9" + h_nums.join('') + "]",
		thousands =
			"(?:"+digits+"?["+h_nums.천+"]\\s?)?" +
			"(?:"+digits+"?["+h_nums.백+"]\\s?)?" +
			"(?:"+digits+"?["+h_nums.십+"]\\s?)?" +
			digits + "?|[1-9][0-9]{0,3}";

	numRegExp_thousand = new RegExp("^"
		+ "(?:("+digits+"?["+h_nums.천+"])\\s?)?"
		+ "(?:("+digits+"?["+h_nums.백+"])\\s?)?"
		+ "(?:("+digits+"?["+h_nums.십+"])\\s?)?"
		+ "("+digits+")?$");
	
	numRegExp = new RegExp("(\\s+|^)"
		+ "((?:"+thousands+")["+h_nums.경+"]\\s?)?"
		+ "((?:"+thousands+")["+h_nums.조+"]\\s?)?"
		+ "((?:"+thousands+")["+h_nums.억+"]\\s?)?"
		+ "((?:"+thousands+")["+h_nums.만+"]\\s?)?"
		+ "("+thousands+")?"
	+"($|\\s+)", 'g');
})(HANGUL_NUMBERS);

var parseNumber_thousands = function(s){
	if(!s) return 0;
	var m = s.match(numRegExp_thousand);
	if(m == null) return parseInt(s, 10) || 0;
	var x=0, i;
	for(i=1; i<=4; i++){
		x *= 10;
		if(m[i]){
			if(m[i].length == 1 && i < 4) x++;
			else if(m[i][0] in numReadMap)
				x += numReadMap[m[i][0]];
			else
				x += parseInt(m[i][0], 10) || 0;
		}
	}
	return x;
}, readNumber_thousands = function(n){
	if(n<10) return HANGUL_NUMBERS[n][0];
	return [0|n/1000, (0|n/100)%10, (0|n/10)%10, n%10].map(function(n, i){
		if(n == 0) return "";
		else if(n == 1) return "천백십일"[i];
		else if(i == 3) return HANGUL_NUMBERS[n][0];
		else return HANGUL_NUMBERS[n][0] + "천백십"[i];
	}).join(' ');
};

var root = this;
var _old_hantools = this.HanTools;

var HanTools = {
	'CHOSEONG': CHOSEONG,
	'JUNGSEONG': JUNGSEONG,
	'JONGSEONG': JONGSEONG,
	'JONGSEONG_EMPTY': "X",
	'isHangul': function(s){
		for(var i=0; i<s.length; i++)
			if(s[i] < HANGUL_FIRST || s[i] > HANGUL_LAST) return false;
		return true;
	},
	'toChoseong': function(s){
		var r, i, c;
		if(s.length == 1){
			c = s.charCodeAt(0);
			if(c >= HANGUL_FIRST_CODE && c <= HANGUL_LAST_CODE)
				return CHOSEONG[0|(c-HANGUL_FIRST_CODE)/(JUNGSEONG_LEN*JONGSEONG_LEN)];
			else
				return s;
		}
		r = "";
		for(i=0; i<s.length; i++){
			c = s.charCodeAt(i);
			if(c >= HANGUL_FIRST_CODE && c <= HANGUL_LAST_CODE)
				r += CHOSEONG[0|(c-HANGUL_FIRST_CODE)/(JUNGSEONG_LEN*JONGSEONG_LEN)];
			else
				r += s[i];
		}
		return r;
	},
	'toJungseong': function(s){
		var r, i, c;
		if(s.length == 1){
			c = s.charCodeAt(0);
			if(c >= HANGUL_FIRST_CODE && c <= HANGUL_LAST_CODE)
				return JUNGSEONG[0|(c-HANGUL_FIRST_CODE)/JONGSEONG_LEN%JUNGSEONG_LEN];
			else
				return s;
		}
		r = "";
		for(i=0; i<s.length; i++){
			c = s.charCodeAt(i);
			if(c >= HANGUL_FIRST_CODE && c <= HANGUL_LAST_CODE)
				r += JUNGSEONG[0|(c-HANGUL_FIRST_CODE)/JONGSEONG_LEN%JUNGSEONG_LEN];
			else
				r += s[i];
		}
		return r;
	},
	'toJongseong': function(s){
		var r, i, c;
		if(s.length == 1){
			c = s.charCodeAt(0);
			if(c >= HANGUL_FIRST_CODE && c <= HANGUL_LAST_CODE)
				return JONGSEONG[0|(c-HANGUL_FIRST_CODE)%JONGSEONG_LEN];
			else
				return s;
		}
		r = "";
		for(i=0; i<s.length; i++){
			c = s.charCodeAt(i);
			if(c >= HANGUL_FIRST_CODE && c <= HANGUL_LAST_CODE)
				r += JONGSEONG[(c-HANGUL_FIRST_CODE)%JONGSEONG_LEN];
			else
				r += s[i];
		}
		return r;
	},
	'disintegrate': function(s){
		var c = s.charCodeAt(0);
		if(c >= HANGUL_FIRST_CODE && c <= HANGUL_LAST_CODE){
			c -= HANGUL_FIRST_CODE;
			if(c % JONGSEONG_LEN)
				return [
					CHOSEONG[0|c/(JUNGSEONG_LEN*JONGSEONG_LEN)],
					JUNGSEONG[0|c/JONGSEONG_LEN%JUNGSEONG_LEN],
					JONGSEONG[c%JONGSEONG_LEN]
				];
			else
				return [
					CHOSEONG[0|c/(JUNGSEONG_LEN*JONGSEONG_LEN)],
					JUNGSEONG[0|c/JONGSEONG_LEN%JUNGSEONG_LEN]
				];
		}else return s;
	},
	'compose': function(a){
		var x, y, z;

		if(a.length == 0) return "";

		// One component only
		if(a.length == 1 || !a[1] && !a[2])
			return a[0] ? a[0] : "";
		
		// No vowel
		y = JUNGSEONG.indexOf(a[1]);
		if(a.length > 3 || y == -1) return a.join('');

		// Vowel only
		if((a.length == 2 || a[2] == null) && a[0] == null)
			return a[1];

		x = CHOSEONG.indexOf(a[0]);
		if(x == -1) return a.join('');
		
		z = a[2] ? JONGSEONG.indexOf(a[2]) : 0;
		if(z == -1) return a.join('');
		
		return String.fromCharCode(HANGUL_FIRST_CODE + z + JONGSEONG_LEN*(y + JUNGSEONG_LEN*x));
	},
	'dueum': function(s){
		if(!s) return '';
		var c = s.charCodeAt(0);
		if(c < HANGUL_FIRST_CODE || c > HANGUL_LAST_CODE) return s;
		switch(0|(c-HANGUL_FIRST_CODE)/JONGSEONG_LEN){
			// 녀, 뇨, 뉴, 니
			case 48: case 54:
			case 59: case 62:
				c += 5292; break;
			// 랴, 려, 례, 료, 류, 리
			case 107: case 111:
			case 112: case 117:
			case 122: case 125:
				c += 3528; break;
			// 라, 래, 로, 뢰, 루, 르
			case 105: case 106:
			case 113: case 116:
			case 118: case 123:
				c -= 1764; break;
		}
		return String.fromCharCode(c) + s.slice(1);
	},
	'josa': function(s, a){
		if(!s) return a[0];
		var c = s.charCodeAt(s.length-1);
		return a[+!((c-HANGUL_FIRST_CODE)%JONGSEONG_LEN)];
	},
	'addJosa': function(s, a){
		return s + HanTools.josa(s, a);
	},
	'parseNumber': function(s){
		// need to find a better way...
		return parseInt(HanTools.replaceNumber(s));
	},
	'replaceNumber': function(s){
		return s.split(/([\[\]\(\)\^\+\-\*\/.,?!])/).map(function(s){
			if(!s || !s.trim()) return s;
			try{
				return s.replace(numRegExp, function(x, y, 경, 조, 억, 만, 일, z){
					if(!경 && !조 && !억 && !만 && !일) return y+z;
				
					if(경){경 = 경.replace(/\s/g,'').slice(0,-1); if(!경) 경 = '1';}
					if(조){조 = 조.replace(/\s/g,'').slice(0,-1); if(!조) 조 = '1';}
					if(억){억 = 억.replace(/\s/g,'').slice(0,-1); if(!억) 억 = '1';}
					if(만){만 = 만.replace(/\s/g,'').slice(0,-1); if(!만) 만 = '1';}
			
					경 = parseNumber_thousands(경);
					조 = parseNumber_thousands(조);
					억 = parseNumber_thousands(억);
					만 = parseNumber_thousands(만);
					일 = parseNumber_thousands(일);

					var num = 경*1e16 + 조*1e12 + 억*1e8 + 만*1e4 + 일;
					return y+(num+'')+z;
				}).replace(/(^|\s)영($|\s)/g, function(x, y, z){return y+'0'+z;});
			}catch(e){
				return s;
			}
		}).join('');
	},
	'readNumber': function(n){
		if(n < 10000) return readNumber_thousands(n);
		var i=0, a=[];
		if(n%10000) a.unshift(readNumber_thousands(n%10000));
		for(; n=Math.floor(n/10000); i++){
			if(n%10000) a.unshift(readNumber_thousands(n%10000)+"만억조경"[i])
		}
		return a.join(' ');
	},
	'noConflict': function(){
		root.HanTools = _old_hantools;
		return HanTools;
	}
};

if((typeof exports) != 'undefined'){
	HanTools.Keyboard = require("./hantools-keyboard.js")(HanTools);
	if((typeof module) != 'undefined' && module.exports){
		exports = module.exports = HanTools;
	}
	exports.HanTools = HanTools;
}else{
	if('HanTools_Keyboard' in root) HanTools.Keyboard = root.HanTools_Keyboard;
	root.HanTools = HanTools;
}

}).call(this);
