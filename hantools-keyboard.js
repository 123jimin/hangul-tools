"use strict";

(function(){

var _extend = function _extend(parent, f){
	var child = f ? function _extended(){
		f.apply(this, arguments);
	} : function _extended(){};
	child.prototype = new parent();
	child.prototype.constructor = parent;
	return child;
};

var _push_multi = function _push_multi(a, p){
	p.forEach(function(e){a.push(e)});
};

var QWERTY_SHIFT = {
	'`': '~', '1': '!', '2': '@', '3': '#', '4': '$', '5': '%', '6': '^', '7': '&', '8': '*', '9': '(', '0': ')',
	'-': '_', '=': '+', '\\': '|', '[': '{', ']': '}', ';': ':', '\'': '\"', ',': '<', '.': '>', '/': '?'
}, QWERTY_SHIFT_INV = {};

var _qwerty_key = function(c){
	if('A' <= c && c <= 'Z') return [c.toLowerCase(), true];
	else if(c in QWERTY_SHIFT_INV) return [QWERTY_SHIFT_INV[c], true];
	else return [c, false];
}, _qwerty_key_inv = function(key){
	if('a' <= key[0] && key[0] <= 'z')
		return key[1] ? key[0].toUpperCase() : key[0];
	else if(key[1] && key[0] in QWERTY_SHIFT)
		return QWERTY_SHIFT[key[0]];
	else
		return key[0];
};

var _key_map_convert = function(s){
	return s ? s.split('').map(function(c){return _qwerty_key(c);}) : [];
};

var DUBEOLSIK_MAP = [
	"rRseEfaqQtTdwWczxvg".split('').map(function(c){
		return c <= 'Z' ? [[c.toLowerCase(), true]] : [[c, false]];
	}),
	"k o i O j p u P h hk ho hl y n nj np nl b m ml l".split(' ').map(_key_map_convert),
	" r R rt s sw sg e f fr fa fq ft fx fv fg a q qt t T d w c z x v g".split(' ').map(_key_map_convert)
], DUBEOLSIK_MAP_INV = "ㅁㅠㅊㅇㄷㄹㅎㅗㅑㅓㅏㅣㅡㅜㅐㅔㅂㄱㄴㅅㅕㅍㅈㅌㅛㅋ";

var SEBEOLSIK_390_MAP = [
	"k kk h u uu y i ; ;; n nn j l ll o 0 \' p m".split(' ').map(_key_map_convert),
	"f r 6 R t c e 7 v /f /r /d 4 b 9t 9c 9d 5 g 8 d".split(' ').map(_key_map_convert),
	" x F xq s s! S A w D C w3 wq wW wQ V z 3 X q 2 a ! Z E W Q 1".split(' ').map(_key_map_convert)
];

var _composible_hangul = function(x, y){
	switch(x+y){
		case "ㄱㄱ": return "ㄲ"; case "ㄱㅅ": return "ㄳ";
		case "ㄴㅈ": return "ㄵ"; case "ㄴㅎ": return "ㄶ";
		case "ㄷㄷ": return "ㄸ"; case "ㄹㄱ": return "ㄺ";
		case "ㄹㅁ": return "ㄻ"; case "ㄹㅂ": return "ㄼ";
		case "ㄹㅅ": return "ㄽ"; case "ㄹㅌ": return "ㄾ";
		case "ㄹㅍ": return "ㄿ"; case "ㄹㅎ": return "ㅀ";
		case "ㅂㅂ": return "ㅃ"; case "ㅂㅅ": return "ㅄ";
		case "ㅅㅅ": return "ㅆ"; case "ㅈㅈ": return "ㅉ";
		case "ㅗㅏ": return "ㅘ"; case "ㅗㅐ": return "ㅙ";
		case "ㅗㅣ": return "ㅚ"; case "ㅜㅓ": return "ㅝ";
		case "ㅜㅔ": return "ㅞ"; case "ㅜㅣ": return "ㅟ";
		case "ㅡㅣ": return "ㅢ"; default: return null;
	}
};

(function init_dict(){
	for(var key in QWERTY_SHIFT) QWERTY_SHIFT_INV[QWERTY_SHIFT[key]] = key;
})();

var root = this;
var _old_hantools_keyboard = this.HanTools_Keyboard;

var HanTools_Keyboard = function INIT_HANTOOLS_KEYBOARD(HanTools){

var _kor_key = function(map, c){
	var ind = HanTools.CHOSEONG.indexOf(c);
	if(ind >= 0) return map[0][ind];
	ind = HanTools.JUNGSEONG.indexOf(c);
	if(ind >= 0) return map[1][ind];
	ind = HanTools.JONGSEONG.indexOf(c);
	if(ind >= 0) return map[2][ind];
	return map[3] && c in map[3] ? map[3][c] : [_qwerty_key(c)];
};

var Keyboard = function Keyboard(){
	this.output = "";
	this.buffer = [];
};
Keyboard.prototype.type = function(){return this;};
Keyboard.prototype.getBufferString = function(){return this.buffer.join('');};
Keyboard.prototype.getString = function(){return this.output + this.getBufferString();};
Keyboard.prototype.flushBuffer = function(){this.output += this.getBufferString(); this.buffer.splice(0, this.buffer.length);};
Keyboard.type = function Keyboard_type(seq){
	return (new this()).type(seq).getString();
};

Keyboard.QWERTY = _extend(Keyboard, Keyboard);
Keyboard.QWERTY.getKeySequence = function QWERTY_getKeySequence(str){
	var i, seq = [];
	for(i=0; i<str.length; i++) seq.push(_qwerty_key(str[i]));
	return seq;
};
Keyboard.QWERTY.type = Keyboard.type;
Keyboard.QWERTY.prototype.type = function QWERTY$type(seq){
	seq.forEach(function(key){
		this.buffer.push(_qwerty_key_inv(key));
	}, this);
	this.flushBuffer();
	return this;
};

Keyboard.DUBEOLSIK = _extend(Keyboard, Keyboard);
Keyboard.DUBEOLSIK.getKeySequence = function DUBEOLSIK_getKeySequence(str){
	var seq = [];
	str.split('').map(HanTools.disintegrate).forEach(function(part){
		var ind;
		if(typeof part == 'string') _push_multi(seq, _kor_key(DUBEOLSIK_MAP, part));
		else part.forEach(function(c){_push_multi(seq, _kor_key(DUBEOLSIK_MAP, c));});
	});
	return seq;
};
Keyboard.DUBEOLSIK.type = Keyboard.type.bind(Keyboard.DUBEOLSIK);
Keyboard.DUBEOLSIK.prototype.getBufferString = function DUBEOLSIK$getBufferString(){
	if(this.buffer.length == 4){
		var _c = _composible_hangul(this.buffer[2], this.buffer[3]);
		if(_c){
			this.buffer[2] = _c;
			this.buffer.pop();
		}
	}
	return HanTools.compose(this.buffer);
};
Keyboard.DUBEOLSIK.prototype.type = function DUBEOLSIK$type(seq){
	seq.forEach(function(key){
		var ch = key[0];
		if('a' <= ch && ch <= 'z'){
			ch = DUBEOLSIK_MAP_INV[ch.charCodeAt(0)-97];
			if(key[1]){
				if(ch == 'ㄱ') ch = 'ㄲ';
				else if(ch == 'ㄷ') ch = 'ㄸ';
				else if(ch == 'ㅂ') ch = 'ㅃ';
				else if(ch == 'ㅅ') ch = 'ㅆ';
				else if(ch == 'ㅈ') ch = 'ㅉ';
				else if(ch == 'ㅐ') ch = 'ㅒ';
				else if(ch == 'ㅔ') ch = 'ㅖ';
			}
			var p, _c = _composible_hangul(this.buffer[this.buffer.length-1], ch),
				v = HanTools.JUNGSEONG.indexOf(ch) >= 0;
			if(v){
				if(_c){
					this.buffer[this.buffer.length-1] = _c;
					return;
				}
				if(this.buffer.length >= 3){
					p = this.buffer.pop();
					this.flushBuffer();
					this.buffer.push(p, ch);
				}else if(this.buffer.length == 2){
					this.flushBuffer();
					this.buffer.push(null, ch);
				}else{
					if(this.buffer.length == 0) this.buffer.push(null);
					this.buffer.push(ch);
				}
			}else{
				if(this.buffer.length == 0) this.buffer.push(ch);
				else if(this.buffer[0] == null){
					this.flushBuffer();
					this.buffer.push(ch);

				}else if(this.buffer.length == 1 && _c) this.buffer[0] = _c;
				else if(this.buffer.length == 2 || this.buffer.length == 3 && _c) this.buffer.push(ch);
				else{
					this.flushBuffer();
					this.buffer.push(ch);
				}
			}
		}else{
			this.flushBuffer();
			this.output += _qwerty_key_inv(key);
		}
	}, this);
	return this;
};

Keyboard.SEBEOLSIK_390 = _extend(Keyboard, Keyboard);
Keyboard.SEBEOLSIK_390.getKeySequence = function SEBEOLSIK_390_getKeySequence(str){
	var seq = [];
	str.split('').map(HanTools.disintegrate).forEach(function(part){
		var ind;
		if(typeof part == 'string'){
			switch(part){
				case 'ㅘ': seq.push(['v', false], ['f', false]); break;
				case 'ㅙ': seq.push(['v', false], ['r', false]); break;
				case 'ㅚ': seq.push(['v', false], ['d', false]); break;
				case 'ㅝ': seq.push(['b', false], ['f', false]); break;
				case 'ㅞ': seq.push(['b', false], ['c', false]); break;
				case 'ㅟ': seq.push(['b', false], ['d', false]); break;
				default: _push_multi(seq, _kor_key(SEBEOLSIK_390_MAP, part));
			}
		}else{
			_push_multi(seq, SEBEOLSIK_390_MAP[0][HanTools.CHOSEONG.indexOf(part[0])]);
			_push_multi(seq, SEBEOLSIK_390_MAP[1][HanTools.JUNGSEONG.indexOf(part[1])]);
			if(part.length == 3) _push_multi(seq, SEBEOLSIK_390_MAP[2][HanTools.JONGSEONG.indexOf(part[2])]);
		}
	});
	return seq;
};
Keyboard.SEBEOLSIK_390.type = Keyboard.type.bind(Keyboard.SEBEOLSIK_390);
Keyboard.SEBEOLSIK_390.prototype.getBufferString = function SEBEOLSIK_390$getBufferString(){
	return HanTools.compose(this.buffer);
};
Keyboard.SEBEOLSIK_390.prototype.type = function SEBEOLSIK_390$type(seq){
	seq.forEach(function(key){
		var ch, part=0, _c;
		
		switch(ch=_qwerty_key_inv(key)){
			case 'a': ch='ㅇ'; part=3; break; case 'A': ch='ㄷ'; part=3; break;
			case 'b': ch='ㅜ'; part=2; break; case 'B': ch='!'; part=0; break;
			case 'c': ch='ㅔ'; part=2; break; case 'C': ch='ㄻ'; part=3; break;
			case 'd': ch='ㅣ'; part=2; break; case 'D': ch='ㄺ'; part=3; break;
			case 'e': ch='ㅕ'; part=2; break; case 'E': ch='ㅋ'; part=3; break;
			case 'f': ch='ㅏ'; part=2; break; case 'F': ch='ㄲ'; part=3; break;
			case 'g': ch='ㅡ'; part=2; break; case 'G': ch='/'; part=3; break;
			case 'h': ch='ㄴ'; part=1; break; case 'H': ch='\''; part=0; break;
			case 'i': ch='ㅁ'; part=1; break; case 'I': ch='8'; part=0; break;
			case 'j': ch='ㅇ'; part=1; break; case 'J': ch='4'; part=0; break;
			case 'k': ch='ㄱ'; part=1; break; case 'K': ch='5'; part=0; break;
			case 'l': ch='ㅈ'; part=1; break; case 'L': ch='6'; part=0; break;
			case 'm': ch='ㅎ'; part=1; break; case 'M': ch='1'; part=0; break;
			case 'n': ch='ㅅ'; part=1; break; case 'N': ch='0'; part=0; break;
			case 'o': ch='ㅊ'; part=1; break; case 'O': ch='9'; part=0; break;
			case 'p': ch='ㅍ'; part=1; break; case 'P': ch='>'; part=0; break;
			case 'q': ch='ㅅ'; part=3; break; case 'Q': ch='ㅍ'; part=3; break;
			case 'r': ch='ㅐ'; part=2; break; case 'R': ch='ㅒ'; part=2; break;
			case 's': ch='ㄴ'; part=3; break; case 'S': ch='ㄶ'; part=3; break;
			case 't': ch='ㅓ'; part=2; break; case 'T': ch=';'; part=0; break;
			case 'u': ch='ㄷ'; part=1; break; case 'U': ch='7'; part=0; break;
			case 'v': ch='ㅗ'; part=2; break; case 'V': ch='ㅀ'; part=3; break;
			case 'w': ch='ㄹ'; part=3; break; case 'W': ch='ㅌ'; part=3; break;
			case 'x': ch='ㄱ'; part=3; break; case 'X': ch='ㅄ'; part=3; break;
			case 'y': ch='ㄹ'; part=1; break; case 'Y': ch='<'; part=0; break;
			case 'z': ch='ㅁ'; part=3; break; case 'Z': ch='ㅊ'; part=3; break;
			case '1': ch='ㅎ'; part=3; break; case '!': ch='ㅈ'; part=3; break;
			case '2': ch='ㅆ'; part=3; break; case '3': ch='ㅂ'; part=3; break;
			case '4': ch='ㅛ'; part=2; break; case '5': ch='ㅠ'; part=2; break;
			case '6': ch='ㅖ'; part=2; break; case '7': ch='ㅖ'; part=2; break;
			case '8': ch='ㅢ'; part=2; break; case '9': ch='ㅜ'; part=2; break;
			case '0': ch='ㅋ'; part=1; break; case '<': ch='2'; part=0; break;
			case '>': ch='3'; part=0; break; case ';': ch='ㅂ'; part=1; break;
			case '\'': ch='ㅌ'; part=1; break;
			case '/': if(this.buffer.length == 1){ch='ㅗ'; part=2;} break;
			default: part = 0;
		}

		if(part == 0){
			this.flushBuffer();
			this.output += ch;
		}else if(part == 1){
			if(this.buffer[0]){
				_c = !this.buffer[1] && this.buffer[0] == ch && _composible_hangul(this.buffer[0], ch);
				if(_c) this.buffer[0] = _c;
				else{
					this.flushBuffer();
					this.buffer.push(ch);
				}
			}else{
				this.buffer[0] = ch;
			}
		}else if(part == 2){
			if(this.buffer[1]){
				_c = _composible_hangul(this.buffer[1], ch);
				if(_c) this.buffer[1] = _c;
				else{
					this.flushBuffer();
					this.buffer.push(null, ch);
				}
			}else{
				if(!this.buffer[0]) this.buffer[0] = null;
				this.buffer[1] = ch;
			}
		}else if(part == 3){
			if(this.buffer[2]){
				_c = this.buffer[2] != ch || ch == 'ㄱ' || ch == 'ㅅ' ? _composible_hangul(this.buffer[2], ch) : null;
				if(_c) this.buffer[2] = _c;
				else{
					this.flushBuffer();
					this.buffer.push(null, null, ch);
				}
			}else{
				if(!this.buffer[0]) this.buffer[0] = null;
				if(!this.buffer[1]) this.buffer[1] = null;
				this.buffer[2] = ch;
			}
		}
	}, this);
	return this;
};

Keyboard.getKeySequence = Keyboard.QWERTY.getKeySequence;

Keyboard.convert = function Keyboard_convert(text, from, to){
	if(from == null) from = Keyboard.QWERTY;
	if(to == null) to = Keyboard.QWERTY;
	return to.type(from.getKeySequence(text));
};

return Keyboard;

};

if((typeof exports) != 'undefined'){
	if((typeof module) != 'undefined' && module.exports){
		exports = module.exports = HanTools_Keyboard;
	}
	exports.HanTools_Keyboard = HanTools_Keyboard;
}else{
	root.HanTools_Keyboard = HanTools_Keyboard;
}

}).call(this);
