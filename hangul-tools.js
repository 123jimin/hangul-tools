"use strict";

(function(){

var HANGUL_FIRST = '가',
	HANGUL_LAST = '힣',
	HANGUL_FIRST_CODE = HANGUL_FIRST.charCodeAt(0),
	HANGUL_LAST_CODE = HANGUL_LAST.charCodeAt(0);

var root = this;
var _old_hantools = this.HanTools;

var HanTools = {
	'CHOSEONG': "ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ",
	'JUNGSEONG': "ㅏㅐㅑㅒㅓㅔㅕㅖㅗㅘㅙㅚㅛㅜㅝㅞㅟㅠㅡㅢㅣ",
	'JONGSEONG': "Xㄱㄲㄳㄴㄵㄶㄷㄹㄺㄻㄼㄽㄾㄿㅀㅁㅂㅄㅅㅆㅇㅈㅊㅋㅌㅍㅎ",
	'JONGSEONG_EMPTY': "X",
	'isHangul': function(s){
		for(var i=0; i<s.length; i++)
			if(s[i] < HANGUL_FIRST || s[i] > HANGUL_LAST) return false;
		return true;
	},
	'toChoseong': function(s){
		var r, i, c, CHOSEONG = HanTools.CHOSEONG;
		if(s.length == 1){
			c = s.charCodeAt(0);
			if(c >= HANGUL_FIRST_CODE && c <= HANGUL_LAST_CODE)
				return CHOSEONG[0|(c-HANGUL_FIRST_CODE)/588];
			else
				return s;
		}
		r = "";
		for(i=0; i<s.length; i++){
			c = s.charCodeAt(i);
			if(c >= HANGUL_FIRST_CODE && c <= HANGUL_LAST_CODE)
				r += CHOSEONG[0|(c-HANGUL_FIRST_CODE)/588];
			else
				r += s[i];
		}
		return r;
	},
	'toJungseong': function(s){
		var r, i, c, JUNGSEONG = HanTools.JUNGSEONG;
		if(s.length == 1){
			c = s.charCodeAt(0);
			if(c >= HANGUL_FIRST_CODE && c <= HANGUL_LAST_CODE)
				return JUNGSEONG[0|(c-HANGUL_FIRST_CODE)/28%21];
			else
				return s;
		}
		r = "";
		for(i=0; i<s.length; i++){
			c = s.charCodeAt(i);
			if(c >= HANGUL_FIRST_CODE && c <= HANGUL_LAST_CODE)
				r += JUNGSEONG[0|(c-HANGUL_FIRST_CODE)/28%21];
			else
				r += s[i];
		}
		return r;
	},
	'toJongseong': function(s){
		var r, i, c, JONGSEONG = HanTools.JONGSEONG;
		if(s.length == 1){
			c = s.charCodeAt(0);
			if(c >= HANGUL_FIRST_CODE && c <= HANGUL_LAST_CODE)
				return JONGSEONG[0|(c-HANGUL_FIRST_CODE)%28];
			else
				return s;
		}
		r = "";
		for(i=0; i<s.length; i++){
			c = s.charCodeAt(i);
			if(c >= HANGUL_FIRST_CODE && c <= HANGUL_LAST_CODE)
				r += JONGSEONG[(c-HANGUL_FIRST_CODE)%28];
			else
				r += s[i];
		}
		return r;
	},
	'disintegrate': function(s){
		var c = s.charCodeAt(0);
		if(c >= HANGUL_FIRST_CODE && c <= HANGUL_LAST_CODE){
			c -= HANGUL_FIRST_CODE;
			if(c % 28)
				return [
					HanTools.CHOSEONG[0|c/588],
					HanTools.JUNGSEONG[0|c/28%21],
					HanTools.JONGSEONG[c%28]
				];
			else
				return [
					HanTools.CHOSEONG[0|c/588],
					HanTools.JUNGSEONG[0|c/28%21]
				];
		}else return s;
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
