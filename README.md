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
console.log(HanTools.readNumber("천 이백 삼십 사"));

// 문자열 "점수 1234점"
console.log(HanTools.readNumber("점수 천 이백 삼십 사 점"));
```
