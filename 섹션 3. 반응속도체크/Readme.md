# 섹션 3. 반응속도체크

## 1. React 조건문

- 삼항연산자
  - 조건 ? true일때 : false일때
  ```
  {
    this.state.result.length === 0
    ? null
    : this.state.result.reduce((a, c) => a + c) / this state.result.length
  }
  ```
  - 안에 사용되는 로직들 중에 너무 긴 로직들은 따로 변수로 정의하는 것이 가독성 측면에서 좋다.

## 2. setTimeout 넣어 반응속도체크

- setTimeout은 두번째 인자로 전달받은 시간(ms단위)뒤에 인자로 전달받은 callback함수를 실행하는 함수이다.(비동기)
- 비동기처리에 대한 코드를 작성할때는 언제 어느순간에 각 state와 setTimeout을 초기화시킬지에 대해서 정의해줘야 한다.
- clearTimeout => setTimeout을 종료시키는 함수
- 반응 속도는 new Date()를 활용해서 끝시간에서 시작시간을 빼주면 된다.

## 3. 성능 체크와 Q&A

- 내부 state 값의 형태를 잘 이해하고 있으면 reset이나 여러 편의 기능을 만드는 것이 수월해진다.
- 늘 Devtools를 활용해서 성능체크를 하는 습관을 들이는 것이 좋다.
  - 렌더링이 쓸데없이 일어나는 부분이 있는지, 자식컴포넌트와 부모 컴포넌트간의 관계 등을 잘 파악해야 한다.
- 주기적으로 console을 찍어보면 좋다.
- useMemo, useCallback과 같은 hook을 이용해서 성능 최적화를 할 수 있다.(쓸데없는 리렌더링을 방지해주는 hook)

## 4. 반응속도체크 Hooks로 전환하기

- hooks에서는 this의 속성을 ref로 사용한다.
- state가 변경되면 return 부분이 다시 실행된다.
- ref는 return 부분이 다시 실행되지 않는다. 즉 불필요한 렌더링을 막을 때 useRef 사용.

## 5. return 내부에 for과 if 쓰기

- jsx에서는 {} 안에 로직을 작성할 수 있는데 즉시 실행 함수를 작성해서 내부에 if문과 for문을 작성할 수 있지만, 굳이 이렇게 하기 보다는 함수로 따로 정의해서 불러와서 사용하는 것이 좋다.
