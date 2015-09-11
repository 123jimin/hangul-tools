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
];

var SEBEOLSIK_390_MAP = [
	"k kk h u uu y i ; ;; n nn j l ll o 0 \' p m".split(' ').map(_key_map_convert),
	"f r 6 R t c e 7 v /f /r /d 4 b 9t 9c 9d 5 g 8 d".split(' ').map(_key_map_convert),
	" x F xq s s! S A w D C w3 wq wW wQ V z 3 X q 2 a ! Z E W Q 1".split(' ').map(_key_map_convert)
];

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
Keyboard.type = function Keyboard_type(seq){
	return (new this()).type(seq).getString();
};

Keyboard.QWERTY = _extend(Keyboard);
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
	this.output += this.getBufferString();
	this.buffer.splice(0, this.buffer.length);
	return this;
};

Keyboard.DUBEOLSIK = _extend(Keyboard, function DUBEOLSIK(){
	Keyboard.call(this);
	this.state = 0;
});
Keyboard.DUBEOLSIK.getKeySequence = function DUBEOLSIK_getKeySequence(str){
	var seq = [];
	str.split('').map(HanTools.disintegrate).forEach(function(part){
		var ind;
		if(typeof part == 'string') _push_multi(seq, _kor_key(DUBEOLSIK_MAP, part));
		else part.forEach(function(c){_push_multi(seq, _kor_key(DUBEOLSIK_MAP, c));});
	});
	return seq;
};
Keyboard.DUBEOLSIK.type = Keyboard.type;
Keyboard.DUBEOLSIK.prototype.type = function DUBEOLSIK$type(seq){
	seq.forEach(function(key){
		
	}, this);
	return this;
};

Keyboard.SEBEOLSIK_390 = _extend(Keyboard);
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
Keyboard.SEBEOLSIK_390.type = Keyboard.type;

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
