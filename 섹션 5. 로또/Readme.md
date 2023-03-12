# 섹션 5. 로또 추첨기

## 1. 로또 추첨기 컴포넌트

- useCallback과 useMemo의 활용을 위해서 만든 주제
- LottoClass.jsx 참고
- 데이터를 미리 준비해놓고 나중에 화면으로만 조금 늦게 보여줌으로써 게임을 구현하는 경우가 대부분이다.
- Ball.jsx => 공마다 색깔이 다른 부분을 구현한 함수 컴포넌트, pure component로 쓰고 싶다면 memo 사용.

## 2. setTimeout 여러번 사용하기

- LottoClass.jsx 참고

## 3. componentDidUpdate

- 업데이트를 해주고 싶은 상황을 정의하고 해당 부분의 UI를 갱신해준다.
- LottoClass.jsx 참고

## 4. useEffect로 업데이트 감지하기

- Lotto.jsx 참고
- state를 안쓰는 Ball.jsx 같은 부분은 따로 빼는 것이 좋다.
- ref를 이용해서 timeout 여부를 관리하고 useEffect의 인자로 넣어 timeout을 실행해야 하는 순간을 조절해서 useEffect 활용.

## 5. useMemo와 useCallback

- React hooks는 렌더링 될때마다 모든 내용이 다시 실행되는데, 이는 너무 비효율적이다. 그렇기 때문에 특정 요소만 변했을 때 실행할 함수나 요소를 변경시키기 위한 hook이 바로 useMemo와 useCallback이다.
- useMemo
  - 복잡한 함수 결괏값을 기억(dependency 배열에 넣은 값이 변경되기 전까지)
- useRef
  - 일반 값을 기억
- useCallback
  - 함수 자체를 기억(dependency 배열에 넣은 값이 변경되기 전까지)
  - 너무 기억을 잘해서 dependency를 지정하지 않으면 그때 기억하고 있던 state 값을 그대로 들고 있는다.(즉 onClickRedo를 useCallback으로 들고 있고 dependency 배열에 아무값도 넣지 않으면 redo 동작은 하지만, 숫자는 제일 처음 기억하고 있던 값을 들고 있고 변경된 값으로 바뀌지 않는다.)
  - 자식 컴포넌트에 함수를 넘겨줄때는 useCallback으로 넘겨줘야한다. 왜냐하면 부모컴포넌트에서는 매번 새로운 함수가 할당되고 자식에게는 그 새로운 함수가 전달되는 것으로 인식되기 때문.

## 6. Hooks에 대한 자잘한 팁들

- hooks는 무조건 조건문안에 들어가면 안되고 최상단에 있어야 한다.
- useEffect 내부에 useState를 사용하면 안된다.
- 순서가 보장되지 않을 수 있기 때문이다.
- 특정 state들의 변경에 따른 로직을 각각 작성하고 싶으면 useEffect를 여러 번 작성해주어도 좋다.
- class에서는 한번에, hooks에서는 따로따로 작성
