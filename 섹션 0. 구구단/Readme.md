## 1. 왜 React를 사용하는가?

- Vue와 React 취향차이
- SPA(Single Page Application)을 위해 사용
- 부족했던 것을 보완한다. => Web Page를 Web App처럼 동작하게끔 한다.
- 백엔드가 가지고 있는 JS 지식으로는 부족해서 프론트엔드 개발자가 나오게 됐다.
- 데이터가 바뀔 때 화면도 같이 바뀌도록 하는 것 이부분이 자바스크립트로만 구현하기에는 어려운 부분이다. 이를 위해서 Angular, Vue, React를 사용한다.
- 페이스북을 예로 들면 특정 페이지에서는 닉네임이 변경됐지만, 어떤 페이지에서는 변경이 안되는 현상이 나타나서 이를 해결하기 위해 React 개발.

## 2. 강의 수강할 떄 주의 할 점

- 너무 React에 의존하거나 최고라고 생각할 필요는 없다.
- 프론트엔드 개발자의 기본 소양은 HTML, CSS, JS이므로 프레임워크 및 라이브러리를 너무 의존할 필요가 없다.
- 스코프, 실행 컨텍스트 등 JS 소양을 충분히 쌓아야 한다.
- CRA와 같은 것도 좋지만 좀 더 기본소양을 쌓는데에 집중을 하자.

## 3. 첫 React 컴포넌트(아직은 Class) & 4. 가독성을 위한 JSX(XML임!)

- class 문법은 점차 사용을 안하는 추세, 함수 컴포넌트를 생성하는 방법을 알아야 한다.
- 컴포넌트는 데이터와 화면을 하나로 묶어놓은 덩어리라고 생각하면 된다. 즉, 데이터가 바뀌면 화면도 바뀌어야 한다.

```
<!-- JSX를 동작하게 해주는 Babel -->
<script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
<!-- 이 태그를 통해서 babel을 적용시킬 수 있다. -->
<script type="text/babel">

<script>
  'use strict';

  class LikeButton extends React.Component {
    constructor(props) {
      super(props);
      <!-- state는 데이터 -->
      this.state = { liked: false };
    }

    render() {
      if (this.state.liked) {
        return "You liked this.";
      }

      <!-- 이 부분이 화면을 나타냄 -->
      return React.createElement(
        "button",
        <!-- 불변성을 헤치는 방법 -->
        { onClick: () => this.state.liked = true },
        <!-- 불변성을 지키게 React에서 제공하는 setState -->
        { onClick: () => this.setState({ liked: true }) },
        "Like"
      );
      <!-- 이부분은 JSX를 적용해서 화면을 보여주는 방법 -->
      <!-- 하지만 이 코드는 정상적으로 동작하지 않는다. 태그를 인식하지 못하기 때문 -->
      <!-- 이를 위해서 Babel 사용 -->
      return (
        <!-- React에서는 태그는 반드시 소문자 컴포넌트 이름은 대문자 -->
        <!-- return에는 단 하나의 태그만 와야 하므로 여러 태그가 있을 때는 div나 고스트태그로 감싸줘야 한다. -->
        <!-- if, for문을 사용하지 못하기 때문에 삼항연산자를 사용하거나 배열의 메서드를 활용해서 조건/반복 기능을 수행한다. -->
        <button onClick={() => this.setState({liked: true})}>
          Like
        </button>
      );
    }
  }
</script>
<script>
  <!-- root div 태그안에 해당 컴포넌트를 그린다.(React 17버전의 코드). 정상작동은 함 -->
  ReactDOM.render(
    React.createElement(LikeButton), document.querySelector("#root")
  );

  <!-- JSX를 적용한 렌더링 방법(v17) -->
  ReactDOM.render(
    <LikeButton />, document.querySelector("#root")
  );

  <!-- 18버전의 코드 -->
  ReactDOM.createRoot(document.querySelector('#root')).render(<LikeButton/>);

</script>
```

## 5. 클래스 컴포넌트의 형태와 리액트 데브툴즈

- 리액트의 지켜야할 규칙 3번째 객체를 함부로 바꾸지 마라(불변성). 즉 state를 함부로 변경하지 말 것. 복사할 것
  - setState를 사용할 수 있다.
- pop/push/shift/unshift/splice vs concat/slice의 차이
  - 배열 직접적으로 수정 vs 새로운 배열을 만들어낸다
- React 데브툴즈를 설치해서 사용하면 state처럼 데이터를 보면서 화면의 변화를 체크할 수 있다. profiler은 성능 문제를 해결할 때 사용하고, Components로 컴포넌트와 state와 props를 체크하면서 개발할 때 사용.

```
  class LikeButton extends React.Component {
    constructor(props) {
      super(props);
      this.state = {liked: false};
      <!-- 이 문법을 추가해서 아래의 onClickButton이 동작하게 해야한다. 이를 해결하기 위해 Arrow Function이 생겼다. -->
      this.onClickButton = this.onClickButton.bind(this)
    }

    onClickButton {
      this.setState({liked:true});
    }
    <!-- 이러면 bind메서드를 써서 위코드처럼 작성하지 않아도 동작하게 해준다. -->
    onClickButton = () => {
      this.setState({liked:true});
    }

    render() {
      if (this.state.liked) {
        return 'You liked this.';
      }

      return (
        <button onClick={this.onClickButton}>
          Like
        </button>
      );
    }
  }
```

## 6. 함수 컴포넌트(함수형 아님)

```
<!-- 이렇게 화살표 함수로도 가능 -->
<!-- this를 쓸 일이 없다. -->
const LikeButton = () => {

function LikeButton() {
  const [liked, setLiked] = React.useState(false);
  if(liked) {
    return "You liked this";
  }
  return (
    <button onClick={() => {setLiked(true);}}>Like</button>
  )
}
```

- 일반적으로 웹사이트를 들어갔을 때 화면에 변경이 있는 부분은 대부분 state이다.
- 라이브러리의 동작 방식을 보고 스스로 재구성할 수 있는 것이 중요하다.

## 7. 구구단 리액트로 만들기 & 8. 클래스 메서드

- 변경되어야 할 데이터 즉, 숫자, 땡/딩동댕 그리고 input값을 state로 지정해야한다.
- 곱하기에 들어가는 숫자는 랜덤한 숫자로 지정
- 소괄호로 div태그를 감싸줘서 div 위치 맞추기
- return되는 부분에 JSX({})를 활용해서 값들을 넣어서 state가 변할때 화면에 보이는 값들도 변할 수 있도록 한다.
- form태그와 input태그는 이벤트(onChange, onSubmit)에 맞게 state를 변경하거나 state 변경에 따른 동작 로직을 작성한다.

## 9. Fragment와 기타 팁들

- return에 여러 태그를 감쌀때 div태그로 감싸게 되는데 아무 의미 없는 태그가 되고 이게 DOM에 나타나기 때문에 불필요한 태그가 된다. 이를 해결할 수 있는게 <></> 이러한 고스트태그를 사용하는데 일반적으로 이 태그는 바벨이 처리를 못하므로 <React.Fragment></React.Fragment> 태그로 감싸주면 불필요한 태그가 생성되지 않는다.
- 소괄호는 그룹 연산자로의 기능을 수행한다.
- class 메서드를 직접 정의할 때 function을 사용하면 this가 달라져버리기 때문에 화살표 함수를 사용해야만 한다.
- 실무에서는 constructor을 없애고 그냥 state만 작성해준다.

## 10. 함수형 setState

- 이전 state와 현재 state에 대해 헷갈릴 경우네는 setState 내부에 return 함수를 작성해서 prevState라는 인자로 받은 값을 이용해 명시적으로 이전값이 뭐고 현재 값을 어떻게 할지 로직작성이 용이해진다.
- 동일한 state를 setState로 여러번 값을 동시에 바꿔주는 경우 예상하는 값과 다른 값이 될 수 있다.(비동기 처리때문) 이 때문에 이전 값을 통해 state를 바꿔줄때는 setState안에 return문을 작성한다.

## 11. ref

- 화면을 React가 만들 수 있도록 두고 데이터만 우리가 바꿔주는 방식으로 구현하는 것이 좋다.
- input에 focus 속성을 넣고 싶을 때

```
onSubmt = (e) => {
  e.preventDefault();
  <!-- ref로 태그를 지정해주고 거기에 focus 속성 적용 -->
  this.input.focus();
}
<input ref={(c) => this.input = c;}/>
```

- setState 할 때마다 화면 render가 새로된다는 것을 알아야 한다.
- render 내에 메서드 로직을 작성하지 않고 따로 빼는 이유는 해당 함수가 랜더 될때마다 계속 새로 생성되므로 비효율적이므로 따로 작성해두고 그 함수명만 불러와서 사용하는 것이 좋다.
