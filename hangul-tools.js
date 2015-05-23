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

var padZero = function padZero(n, l){
	for(n+=''; n.length<l; n='0'+n);
	return n;
};

// Making a regular expression for Numerals
var numRegExp_thousand = null,
	numRegExp = null,
	numReadMap = {};

(function(){
	var h_nums = [
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
	
	numRegExp = new RegExp("(\\s|^)"
		+ "((?:"+thousands+")["+h_nums.경+"]\\s?)?"
		+ "((?:"+thousands+")["+h_nums.조+"]\\s?)?"
		+ "((?:"+thousands+")["+h_nums.억+"]\\s?)?"
		+ "((?:"+thousands+")["+h_nums.만+"]\\s?)?"
		+ "("+thousands+")?"
	+"($|\\s)", 'g');
})();

var readNumber_thousands = function(s){
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
			
					경 = readNumber_thousands(경);
					조 = readNumber_thousands(조);
					억 = readNumber_thousands(억);
					만 = readNumber_thousands(만);
					일 = readNumber_thousands(일);

					var num = 경*1e16 + 조*1e12 + 억*1e8 + 만*1e4 + 일;
					return y+(num+'')+z;
				}).replace(/(^|\s)영($|\s)/g, function(x, y, z){return y+'0'+z;});
			}catch(e){
				return s;
			}
		}).join('');
	},
	'noConflict': function(){
		root.HanTools = _old_hantools;
		return HanTools;
	}
};

if((typeof exports) != 'undefined'){
	if((typeof module) != 'undefined' && module.exports){
		exports = module.exports = HanTools;
	}
	exports.HanTools = HanTools;
}else root.HanTools = HanTools;

}).call(this);
