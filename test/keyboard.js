var assert = require('assert'),
	HanTools = require('../');

var Keyboard = HanTools.Keyboard;

var _simple_seq = function _simple_seq(s){
	var i, a = [];
	for(i=0; i<s.length; i+=2)
		a.push([s[i], s[i+1]=='^']);
	return a;
};

describe('HanTools', function(){
	describe('#Keyboard', function(){
		it("should have some important keyboards", function(){
			assert.strictEqual(typeof HanTools.Keyboard, 'function');
			assert.strictEqual(typeof HanTools.Keyboard.QWERTY, 'function');
			assert.strictEqual(typeof HanTools.Keyboard.DUBEOLSIK, 'function');
			assert.strictEqual(typeof HanTools.Keyboard.SEBEOLSIK_390, 'function');
		});

		describe('#convert()', function(){
			it("should behave correctly", function(){

			});
		});
		
		describe('#QWERTY', function(){
			describe('#getKeySequence()', function(){
				it("should be able to get key sequences", function(){
					assert.deepEqual(
						Keyboard.QWERTY.getKeySequence("Hello, world!"),
						_simple_seq("h^e_l_l_o_,_ _w_o_r_l_d_1^")
					);
				});
			});
		});

		describe('#DUBEOLSIK', function(){
			describe('#getKeySequence()', function(){
				it("should be able to get key sequences for Hangul strings", function(){
					assert.deepEqual(
						Keyboard.DUBEOLSIK.getKeySequence("나랏말싸미 듕귁에 달아"),
						_simple_seq("s_k_f_k_t_a_k_f_t^k_a_l_ _e_b_d_r_n_l_r_d_p_ _e_k_f_d_k_")
					);
					assert.deepEqual(
						Keyboard.DUBEOLSIK.getKeySequence("ㅇㅅㅇ ㄲㄲ"),
						_simple_seq("d_t_d_ _r^r^")
					)
				});

			});
		});

		describe('#SEBEOLSIK_390', function(){
			describe('#getKeySequence()', function(){
				it("should be able to get key sequences for Hangul strings", function(){
					assert.deepEqual(
						Keyboard.SEBEOLSIK_390.getKeySequence("나랏말싸미 듕귁에 달아"),
						_simple_seq("h_f_y_f_q_i_f_w_n_n_f_i_d_ _u_5_a_k_9_d_x_j_c_ _u_f_w_j_f_")
					);
					assert.deepEqual(
						Keyboard.SEBEOLSIK_390.getKeySequence("ㅇㅅㅇ ㄲㄲ"),
						_simple_seq("j_n_j_ _k_k_k_k_")
					);
				});
			});
		});
	});
});
