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
			assert.strictEqual(typeof Keyboard, 'function');
			assert.strictEqual(typeof Keyboard.QWERTY, 'function');
			assert.strictEqual(typeof Keyboard.DUBEOLSIK, 'function');
			assert.strictEqual(typeof Keyboard.SEBEOLSIK_390, 'function');
		});

		describe('#convert()', function(){
			it("should behave correctly on simple inputs", function(){
				assert.strictEqual(Keyboard.convert("dkssud", Keyboard.QWERTY, Keyboard.DUBEOLSIK), "안녕");
				assert.strictEqual(Keyboard.convert("qkqh rhrl", Keyboard.QWERTY, Keyboard.DUBEOLSIK), "바보 고기");
				assert.strictEqual(Keyboard.convert("anfrhk", Keyboard.QWERTY, Keyboard.DUBEOLSIK), "물과");
				assert.strictEqual(Keyboard.convert("rkskekfkakqktk dkwkckzkxkvkgk", Keyboard.QWERTY, Keyboard.DUBEOLSIK), "가나다라마바사 아자차카타파하");
				assert.strictEqual(Keyboard.convert("안녕", Keyboard.DUBEOLSIK, Keyboard.QWERTY), "dkssud");
				
				assert.strictEqual(Keyboard.convert("jfshea", Keyboard.QWERTY, Keyboard.SEBEOLSIK_390), "안녕");
				assert.strictEqual(Keyboard.convert(";f;v kvkd", Keyboard.QWERTY, Keyboard.SEBEOLSIK_390), "바보 고기");
				assert.strictEqual(Keyboard.convert("ibwk/f", Keyboard.QWERTY, Keyboard.SEBEOLSIK_390), "물과");
				assert.strictEqual(Keyboard.convert("kfhfufyfif;fnf jflfof0f'fpfmf", Keyboard.QWERTY, Keyboard.SEBEOLSIK_390), "가나다라마바사 아자차카타파하");
				assert.strictEqual(Keyboard.convert("안녕", Keyboard.SEBEOLSIK_390, Keyboard.QWERTY), "jfshea");
			});
			it("should compose jongseongs correctly (Keyboard.DUBEOLSIK)", function(){
				assert.strictEqual(Keyboard.convert("rkRkdns", Keyboard.QWERTY, Keyboard.DUBEOLSIK), "가까운");
				assert.strictEqual(Keyboard.convert("rkrrkdns", Keyboard.QWERTY, Keyboard.DUBEOLSIK), "각가운");
				assert.strictEqual(Keyboard.convert("rrkrkdns", Keyboard.QWERTY, Keyboard.DUBEOLSIK), "까가운");
				assert.strictEqual(Keyboard.convert("rrkrrkdns", Keyboard.QWERTY, Keyboard.DUBEOLSIK), "깍가운");
				assert.strictEqual(Keyboard.convert("rrkrrrkdns", Keyboard.QWERTY, Keyboard.DUBEOLSIK), "깎가운");
				assert.strictEqual(Keyboard.convert("rrkrRkdns", Keyboard.QWERTY, Keyboard.DUBEOLSIK), "깍까운");
				assert.strictEqual(Keyboard.convert("rrkRrkdns", Keyboard.QWERTY, Keyboard.DUBEOLSIK), "깎가운");
				assert.strictEqual(Keyboard.convert("qkfqk", Keyboard.QWERTY, Keyboard.DUBEOLSIK), "발바");
				assert.strictEqual(Keyboard.convert("qhqtlek", Keyboard.QWERTY, Keyboard.DUBEOLSIK), "봅시다");
				assert.strictEqual(Keyboard.convert("qhqt lek", Keyboard.QWERTY, Keyboard.DUBEOLSIK), "봆 ㅣ다");
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
					);
					assert.deepEqual(
						Keyboard.DUBEOLSIK.getKeySequence("정ㄱ-ㅠ 표현싴으로는 무리가 좀 있다 없다"),
						_simple_seq("w_j_d_r_-_b_ _v_y_g_u_s_t_l_z_d_m_f_h_s_m_s_ _a_n_f_l_r_k_ _w_h_a_ _d_l_t^e_k_ _d_j_q_t_e_k_")
					);
				});

			});
			describe('#type()', function(){
				it("should work for examples in getKeySequence()", function(){
					assert.strictEqual(Keyboard.DUBEOLSIK.type(_simple_seq("s_k_f_k_t_a_k_f_t^k_a_l_ _e_b_d_r_n_l_r_d_p_ _e_k_f_d_k_")), "나랏말싸미 듕귁에 달아");
					assert.strictEqual(Keyboard.DUBEOLSIK.type(_simple_seq("d_t_d_ _r^r^")), "ㅇㅅㅇ ㄲㄲ");
					assert.strictEqual(Keyboard.DUBEOLSIK.type(_simple_seq("w_j_d_r_-_b_ _v_y_g_u_s_t_l_z_d_m_f_h_s_m_s_ _a_n_f_l_r_k_ _w_h_a_ _d_l_t^e_k_ _d_j_q_t_e_k_")), "정ㄱ-ㅠ 표현싴으로는 무리가 좀 있다 없다");
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
					assert.deepEqual(
						Keyboard.SEBEOLSIK_390.getKeySequence("정ㄱ-ㅠ 표현싴으로는 무리가 좀 있다 없다"),
						_simple_seq("l_t_a_k_-_5_ _p_4_m_e_s_n_d_e^j_g_y_v_h_g_s_ _i_b_y_d_k_f_ _l_v_z_ _j_d_2_u_f_ _j_t_x^u_f_")
					);
				});
			});
			
			describe('#type()', function(){
				it("should work for examples in getKeySequence()", function(){
					assert.strictEqual(Keyboard.SEBEOLSIK_390.type(_simple_seq("h_f_y_f_q_i_f_w_n_n_f_i_d_ _u_5_a_k_9_d_x_j_c_ _u_f_w_j_f_")), "나랏말싸미 듕귁에 달아");
					assert.strictEqual(Keyboard.SEBEOLSIK_390.type(_simple_seq("j_n_j_ _k_k_k_k_")), "ㅇㅅㅇ ㄲㄲ");
					assert.strictEqual(Keyboard.SEBEOLSIK_390.type(_simple_seq("l_t_a_k_-_5_ _p_4_m_e_s_n_d_e^j_g_y_v_h_g_s_ _i_b_y_d_k_f_ _l_v_z_ _j_d_2_u_f_ _j_t_x^u_f_")), "정ㄱ-ㅠ 표현싴으로는 무리가 좀 있다 없다");
					assert.strictEqual(Keyboard.SEBEOLSIK_390.type(_simple_seq(";_f_;_v_")), "바보");
				});
			});
		});
	});
});
