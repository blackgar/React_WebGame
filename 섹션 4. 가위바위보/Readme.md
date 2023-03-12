# 섹션 4. 가위바위보

## 1. 리액트 라이프사이클 소개 & 2. setInterval과 라이프사이클 연동하기

- componentDidMount() {}

  - 컴포넌트가 성공적으로 렌더링을 완료하는 순간 실행되는 리액트 라이프사이클 메서드
  - 리렌더링 될때는 실행되지 않는다.
  - 해당 부분에 비동기 요청을 많이 정리한다.
  - setInterval 함수를 해당 부분에 넣게 된다.
  - 이번 섹션에서는 가위바위보 이미지를 적절하게 잘라서 화면에 보여주기 위한 과정으로 활용.
  - **클로저문제 발생**
    - 비동기 setTimeout 함수에서 바깥에 있는 변수 imgCoord를 참조할 때는 이미 고정된 값이 되어 있기 때문에, 클로저 문제가 발생한다. 그래서 바깥에 변수를 선언해서 가져오는게 아니라 비동기 함수 내부에서 변수를 선언하고 가져올 수 있도록 해야한다.

- componentDidUpdate() {}

  - 컴포넌트가 리렌더링 될때 실행시킬 함수

- componentWillUnmount() {}

  - 컴포넌트가 제거되기 직전에 실행될 함수
  - 해당 부분에 비동기 요청 정리 많이 진행한다.
  - 해당부분에서 clearInterval을 해준다.

- 클래스 컴포넌트 화면 구현 순서 : constructor -> render -> ref -> componentDidMount -> (setState / props 바뀔때 -> shouldComponentUpdate -> render -> componentDidUpdate) -> 부모가 나를 없앴을 때 -> componentWillUnmount -> 소멸

## 3. 가위바위보 게임 만들기

- RSPClass.jsx 참고
- onClickBtn 함수에서 가위바위보 중 하나의 버튼을 눌렀을 때 setInterval을 잠시 멈춰서 현재 컴퓨터가 낸 손을 확인하고 이에 대해서 이겼는지, 비겼는지, 졌는지를 확인할 수 있는 로직 작성.

## 4. 고차 함수와 Q&A

- (choice) => () => 이렇게 화살표 함수를 한번 더 작성하면 아래에서 onClick 이벤트에서 () => 이 부분을 제거해도 동작할 수 있게 해주는데, 이를 고차 함수라고 한다.
- setInterval을 매우짧게 하면 setState와 render까지의 시간에서 엇갈리는 경우가 없을까?
  - 너무 짧게 시간을 세팅하면 너무 자주 렌더링이 되어서 화면이 감당하는 것처럼 문제가 생기는 것처럼 보이지만, 결국 setState는 Queue로 쌓여서 엇갈리는 경우는 없다. 단, setState를 연달아 쓰는 경우에는 해당 setState를 하나로 묶어서 처리하게 된다.

## 5. Hooks와 useEffect

- RSP.jsx 참고
- componentDidMount(), componentDidUpdate() 역할을 useEffect로 대체하고 있고 useEffect 안의 return문이 componentWillUnmount 역할을 하게 된다.
- useEffect에는 클로져 문제를 해결할 수 있게 dependency 배열에 어떤 state가 변할 때 useEffect를 실행할지에 대한 변수를 넣어준다.
- componentDidMount()는 처음에는 실행되고 그 이후에는 실행이 안되는데 useEffect는 지속적으로 state가 변경될때마다 실행이 된다는 차이점이 있다.

## 6. 클래스와 Hooks 라이프사이클 비교

- useEffect에 관련없는 state를 넣으면 이상하게 동작할 수 있기 때문에 넣어줄 배열을 잘 확인해야 한다.
- useLayoutEffect() => 화면 완전히 바뀌고 나서 실행되는 hook이다.

## 7. 커스텀 훅으로 우아하게 interval하기

- useInterval.js 참고
- 가독성을 높이기 위해서 커스텀 훅을 많이 활용한다.
