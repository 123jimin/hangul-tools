# hangul-tools
한글 분해, 결합, 조사 처리, 두음 법칙 적용, 숫자 읽기, 쿼티를 한글로 변환 등등의
잡다한 한글 관련 함수를 사용할 수 있는 자바스크립트 라이브러리입니다.

아직 한글 조합형이나 옛한글 등은 지원하지 않고 있습니다.

*현재 제작중입니다.*

## hangul-tools 불러오기
`var HanTools = require('hangul-tools');`

```HTML
<!-- hantools-keyboard.js는 키보드 관련 기능이 필요 없을 때는 불러올 필요 없음 -->
<script src="./hantools-keyboard.js"></script>
<script src="./hangul-tools.js"></script>
```

## 초성, 중성, 종성 목록
```js
// 문자열 "ㄱㄲㄴㄷ...ㅎ"
console.log(HanTools.CHOSEONG);

// 문자열 "ㅏ...ㅣ"
console.log(HanTools.JUNGSEONG);

// 문자열 "Xㄱㄲㄳ...ㅎ"
console.log(HanTools.JONGSEONG);

// (현재) 문자열 "X"
console.log(HanTools.JONGSEONG_EMPTY);
```

## 글자 단위 연산
한글을 확인하려 `isHangul`을 호출했을 때, 공백이나 초성, 중성, 기타 문자들이 들어가 있으면 `false`를 반환하는 것에
주의해 주시기 바랍니다.

또한, `disintegrate`와 `compose` 함수는 기본적인 초성, 중성, 종성 분해 및 결합만을
할 수 있습니다. 복합 자음이나 모음은 분해가 되지 않으니 주의 해 주세요.

```js
// true
console.log(HanTools.isHangul("강"));

// false
console.log(HanTools.isHangul("ㅓ"));

// 문자열 "ㄴㄷ.ㅈㅇㅇㅅ"
console.log(HanTools.toChoseong("노드.제이에스"));

// 문자열 "ㅗㅡ.ㅔㅣㅔㅡ"
console.log(HanTools.toJungseong("노드.제이에스"));

// 문자열 "ㄴㅇXXX!"
console.log(HanTools.toJongseong("안녕하세요!"));

// [["ㅇ","ㅣ","ㅇ"], ["ㅇ","ㅕ"], "!"]
console.log(
	"잉여!".split('').map(HanTools.disintegrate)
);

// 문자열 "글자ㅏ다"
console.log(
	HanTools.compose("ㄱㅡㄹ") +
	HanTools.compose("ㅈㅏ") +
	HanTools.compose([null, "ㅏ"]) +
	HanTools.compose(["ㄷ", "ㅏ", null])
);

// 문자열 "요로"
console.log(HanTools.dueum("뇨로"));
```

## 조사 다루기
길이 2의 문자열이나 배열을 사용할 수 있습니다.

```js
var s1 = "내",
	s2 = "당신",
	s3 = "좋아하",
	s4 = "것";

// 문자열 "내가 당신을 좋아하는 것은"
console.log("%s%s %s%s %s %s"
	, s1, HanTools.josa(s1, "이가")
	, s2, HanTools.josa(s2, "을를")
	, HanTools.addJosa(s3, "은는")
	, HanTools.addJosa(s4, "은는"));
```

## 숫자 읽기
경까지 지원하며, 해 이상은 지원하지 않습니다. 서수(첫, 두, 세, ...)나 순우리말 숫자(하나, 둘, 셋, ..., 열, 스물, ...)도 지원하지 않습니다.
또한, 현재는 숫자를 그대로 읽은 것만 인식할 수 있습니다.

숫자를 인식할 때, 숫자와 그 뒤의 글 사이에는 띄어쓰기가 있어야 합니다.

```js
// 숫자 '1234'
console.log(HanTools.parseNumber("천 이백 삼십 사"));

// 문자열 "점수 1234 점"
console.log(HanTools.replaceNumber("점수 천 이백 삼십 사 점"));

// 문자열 "천 이백 삼십 사"
console.log(HanTools.readNumber(1234));
```

## 키보드
두벌식과 세벌식 390을 지원합니다.

```js
var andro_key = HanTools.Keyboard.QWERTY.getKeySequence("dkssud"),
	meda_key = HanTools.Keyboard.QWERTY.getKeySequence("jfshea");

// 문자열 "안녕 안녕"
console.log("%s %s"
	, HanTools.Keyboard.DUBEOLSIK.type(andro_key)
	, HanTools.Keyboard.SEBEOLSIK_390.type(meda_key));

// 문자열 "안녕"
console.log(HanTools.Keyboard.convert("dkssud", HanTools.Keyboard.QWERTY, HanTools.Keyboard.DUBEOLSIK));
```

## 시간과 시각
