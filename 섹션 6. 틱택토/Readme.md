# 섹션 6. 틱택토

## 1. 틱택토와 useReducer 소개

- TicTacToe.jsx 참고
- 규모가 작으면 useReducer, contextAPI 사용. 큰 규모는 redux 사용
- tictactoe > table > tr > td 이렇게 세개의 컴포넌트로 쪼개는 컴포넌트 설계과정 진행.
- 어떤 데이터가 들어가야 할지 명확하게 정의하기.
- 실제 클릭은 td에서 발생. 그렇기 때문에 depth가 3개 밑에 있는 td에 props를 너무 많이 해줘야 하는 문제가 발생해서 이를 useReducer로 처리.
- useReducer(reducer, initialState, lazyinit)

## 2. reducer, action, dispatch의 관계

```
  const [state, dispatch] = useReducer(reducer, initialState);
  dispatch(action) => dispatch로 action을 실행한다. 그럴때마다 reducer가 실행된다.
```

- state => 이벤트 => action => dispatch => reducer => state 변경
- map함수로 배열 길이 만큼 자식 태그 생성(3\*3 3개의 tr, 9개의 td생성)

## 3. action 만들어 dispatch 하기

- td 태그에 onClickTd 함수를 만들고 props 받은 dispatch와 인덱스 값을 활용해서 reducer에 정의한 액션에 맞는 이벤트가 동작할 수 있도록 구현(type: CLICK_CELL)
- 자바스크립트는 직접 화면까지 그려야 하지만, react는 state만 신경쓰면 돼서 굉장히 편리하다.
- useReducer는 불변성을 지키는데 불편한 점이 있는데, immer 라는 라이브러리로 가독성을 해결할 수 있다.
- ... << 얕은복사
- context API는 td => tictactoe로 바로 데이터 전달이 가능해진다.

## 4. 틱택토 구현하기

- TicTacToe.jsx, Table.jsx, Tr,jsx, Td.jsx 참고

## 5. 테이블 최적화하기

- 성능 최적화를 위한 React Devtools
- 한칸을 누르는데 전체가 리렌더링 되는 부분의 문제
  - 어떤값이 바뀌는지 확인하기 위해서는 useRef에 바뀔 수 있는 state 값들을 넣고 변화가 있을 때마다 비교할 수 있게 useEffect 안에서 값이 비교해본다.
  - 이 때 td 하나만 누르는데 9칸이 전부 리렌더링이 된다.
  - 그렇다면 Tr에서 바뀌는 점이 있는지 확인해본다.
  - Tr에서도 리렌더링이 일어난다는 점을 확인하고, 어떤 값들이 바뀌는지, 어떤 값들이 렌더링을 다시 하게 하는지 체크한다.
  - Td에 memo로 감싸게 되면 더이상 3칸이 모두 리렌더링 되지 않고 Tr 3개만 리렌더링 되고 있고 Tr에도 memo로 감싸면 해당 Tr만 리렌더링이 됩니다.
  - 이렇게 성능 최적화를 할 수 있다.
  - 만약 memo로도 만족스럽지 않는 최적화가 이루어진다면 useMemo로 태그를 기억할 수 있도록 한다.
  - 초록색으로 빛나는것은 그래도 괜찮은데 빨간색으로 반짝이면 1순위로 최적화를 해야한다.
