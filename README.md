# hangul-tools
잡다한 한글 관련 자바스크립트 라이브러리.

*현재 제작중입니다.*

## hangul-tools 불러오기
`var HanTools = require('hangul-tools');`

## 초성, 중성, 종성 목록
```js
// 문자열 "ㄱㄲㄴㄷ...ㅎ"
console.log(HanTools.choseong);

// 문자열 "ㅏ...ㅣ"
console.log(HanTools.jungseong);

// 문자열 "Xㄱㄲㄳ...ㅎ"
console.log(HanTools.jongseong);

// (현재) 문자열 "X"
console.log(HanTools.CHAR_JONGSEONG_EMPTY);
```

## 글자 단위 연산
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
console.log(HanTools.toJongSeong("안녕하세요!"));

// [["ㅇ","ㅣ","ㅇ"], ["ㅇ","ㅕ"], "!"]
console.log(
	"잉여!".split('').map(HanTools.disintegrate)
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
경까지 지원하며, 해 이상은 지원하지 않습니다.

숫자를 인식할 때, 숫자와 그 뒤의 글 사이에는 띄어쓰기가 있어야 합니다.

```js
// 숫자 '1234'
console.log(HanTools.parseNumber("천 이백 삼십 사"));

// 문자열 "점수 1234점"
console.log(HanTools.replaceNumber("점수 천 이백 삼십 사 점"));

// 문자열 "천 이백 삼십 사"
console.log(HanTools.readNumber(1234));
```
