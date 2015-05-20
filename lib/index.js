"use strict";

(function(){

var root = this;
var _old_hantools = this.HanTools;

var HanTools = {
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
