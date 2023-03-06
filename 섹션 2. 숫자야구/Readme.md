# 섹션 2. 숫자야구

## 1. import와 require 비교

- require은 Node의 모듈 시스템

```
const React = require('react');
import React from 'react';

export const hello = 'hello'; // import { hello } // 여러번 사용 가능 // exports.hello = 'hello';
export default hello // import hello // 한번만 사용 가능 // module.exports와 호환이 된다(깊게 들어가면 서로 다른 방식이다.)
```

- import는 바벨이 require로 변환해서 쓸 수 있게 도와준다. node에서는 require를 사용해야 한다(Webpack에서 사용할때).

## 2. 리액트 반복문(map) & 3. 리액트 반복문(key)

- 항상 작업을 할 때는 바뀌는 부분부터 확인하고 태그를 작성한다.
- React에서는 태그 내부 속성값들은 camelCase를 사용하기.
- 직접 정의하는 함수들의 경우 class 안에서는 화살표 함수로 정의해야 한다. 화살표함수를 하지 않으면 constructor을 새롭게 작성해줘야 한다.
- map
  - 리액트에서 반복문을 쓰는 방법(특히 여러개의 같은 태그를 작성해야 할때 사용)
  - 배열(Array)형식의 데이터에 사용할 수 있다. 배열의 길이만큼 내부 callback 함수가 동작한다. 그리고 배열안의 값을 받아올 때는 callback함수의 props로 변수를 지정해주면 받아올 수 있다.
  - [['사과', '맛있다'], ['바나나', '맛없다']]와 같은 2차원 배열은 callback함수에서 props로 넘겨주는 index를 활용해서 해당 배열의 값을 순차적으로 접근할 수 있다. 객체가 들어있는 배열의 경우 key값으로도 접근이 가능하다.
  - 반복문으로 생성해주는 element에 대해서는 고유한 key값도 설정해주어야 한다.(일반적으로 callback props로 받는 데이터 안에서 고유한 값을 지니는 값을 조합하거나 할당해주어서 지정한다.) 요소가 추가만 되는배열(삭제 행위가 일어나지 않는 배열) props로 받는 index를 key로 넣어줘도 된다.
  ```
  {[
    {fruit: '사과', taste: '맛있다'},
    {fruit: '바나나', taste: '맛없다'}
  ].map((v, i) => {
    return <li key={v.fruit + v.taste}></li>
  })}
  ```

## 4. 컴포넌트 분리와 props

- 배열로 들어오는 데이터는 따로 변수로 선언하거나 할당해서 가독성을 높여준다.
- 공통되게 태그를 생성해주는 map함수 내부 return 값의 경우 따로 새로운 컴포넌트를 생성해서 해당 내용을 정리하면 훨씬 가독성이 좋아진다.

```
{[
  {fruit: '사과', taste: '맛있다'},
  {fruit: '바나나', taste: '맛없다'}
].map((v, i) => {
  return <li key={v.fruit + v.taste}>
    <Div value={v} />
  </li>
})}

```

- 아래처럼 공통된 부분을 따로 뺴주어서 위에 넣어주면 된다. 또한 callback 함수 내부에 전달되는 값 중 v를 해당 컴포넌트의 props로 넘겨주어서 활용할 수 있게 할 수 있다.

```
const Div = ({ value }) => {
  return (
    <>
      <div>{ value }</div>
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
    </ㅇ>
  )
}
```

## 5. 주석과 메서드 바인딩

- React는 할아버지 >> 자손, 고조할아버지 >> 고조손자 등 depth가 깊은 child Component에 데이터를 전달하기 위해 전역 상태 관리 라이브러리(redux, recoil, context 등)를 사용한다.
- jsx의 주석은 {/\* 여기에 태그 \*/}
- 앞서 설명했던 class 컴포넌트에서 메서드를 바인딩 하기 위해서는 화살표 함수를 사용하면 this 사용에 문제가 생기지 않는다.

## 6. 숫자야구 만들기

- 파일 참조

## 7. Q&A

- this.state 자주 사용되는것들은 const { 변수 } = this.state로 구조분해 할당해서 사용할 수 있다. this.props도 마찬가지. 결국 모든 것들은 가독성 및 변수 사용의 효율화를 위해 구조분해 할당을 진행한다.
- getNumbers()를 밖에 빼는 이유. this를 쓰지 않으면 class Component 밖에 사용. 안에 넣으면 해당 컴포넌트 안에서만 사용 가능하고 밖에 있으면 다른 컴포넌트에서도 사용 가능하게 된다.
- [1, 2, 3] => [2, 4, 6] 규칙은 모두 두배다. 이 때 map으로 각 값들을 2배로 곱해주는 callback 함수를 넣어주면 된다. 이렇게 효율적으로 가독성 좋게 데이터 핸들링이 가능해서 사용한다. map안에서는 값 삭제가 불가능하다(filter 사용)

## 8. 숫자야구 Hooks로 전환하기 (useState lazy init)

- NumberBaseball.jsx 참고

## 9. React Devtools

- props 하는 과정에서 렌더링이 너무 자주 일어나서 성능에 문제가 생기는 경우가 있다.
- 이를 해결하기 위해서 변하는 값들을 확인하기 위해 React Developer Tools를 다운받아서 사용하는 것이 좋다.
- 개발모드를 배포로 바꾸려면 webpack에 development를 production으로 바꾸고 env파일도 production으로 해줘야 한다.
- 다방에서 다 뜯어보라(지금은 안되겠지만..)

## 10. shouldComponentUpdate

- 화면이 변경되어야 할 부분만 다시 렌더링되어야 하는데 불필요한 렌더링이 일어나는 것을 React-Developer-Tools로 확인하고 성능 최적화하기.
- React에서 어떤 이벤트가 발생했을 때 렌더링을 다시 해줄지에 대해서 직접 정의해줄 수 있다.

## 11. 억울한 자식 리렌더링 막기(PureComponent와 memo)

- PureComponent가 shouldComponentUpdate를 알아서 구현한 컴포넌트라고 생각하면 된다.
- 늘 중요하게 생각해야 하는 부분은 React가 어떻게 변화하는 값을 알아차리는지를 이해하고 이전과 같은 상태가 되지 않도록 조절해주는 부분이 중요하다.
- 부모컴포넌트가 리랜더링되면 자식컴포넌트도 같이 리렌더링된다. 이를 해결하기 위해서 PureComponent를 사용해서 props가 변화했을 때만 리렌더링 되게 설정이 가능하다. 함수형 컴포넌트에서는 memo라는 것을 활용해서 pureComponent와 같은 역할을 해줄 수 있다(부모컴포넌트가 리렌더링될때 강제로 리렌더링 되는 현상을 막아준다.).
- displayName은 DevTools에 보여지는 이름이 정상적으로 나오도록 해준다.

## 12 React.createRef

- this.ref, useRef.
- class 컴포넌트의 ref를 useRef와 비슷하게 해주는 방법 => createRef
- 통일하기 위한 방법으로도 사용된다.
- 함수 안에 함수를 넣을 수 있게(일급객체) 해준다.

## 13. props와 state 연결하기

- render()안에는 setState를 사용하지 않는다.
- props는 부모가 변경을 해야한다.
- 만약 자식컴포넌트에서 props 값을 변경해야 할때는 useState()를 활용해서 변경해준다. 즉, props를 다시 그 컴포넌트의 state로 만들어서 변경해주어야 한다는 것.
- class형도 마찬가지로 바로 state로 받아서 설정해줄 수 있다.
