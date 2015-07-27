"use strict";

(function(){

var _extend = function _extend(parent, f){
	var child = f ? function _extended(){
		f.apply(this, arguments);
	} : function _extended(){};
	child.prototype = new parent();
	return child;
};

var root = this;
var _old_hantools_keyboard = this.HanTools_Keyboard;

var HanTools_Keyboard = function INIT_HANTOOLS_KEYBOARD(HanTools){

var Keyboard = function Keyboard(){};

Keyboard.QWERTY = _extend(Keyboard);
Keyboard.DUBEOLSIK = _extend(Keyboard);
Keyboard.SEBEOLSIK_390 = _extend(Keyboard);

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
