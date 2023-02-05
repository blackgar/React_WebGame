# 섹션 1. 끝말잇기

## 1. React Hooks 사용하기

- setState나 ref를 사용할 필요 없는 경우에 많이 사용했다. class형보다 훨씬 간결한 방식으로 사용할 수 있다는 장점이 있다.
- 함수를 좋아하는데 setState와 ref를 사용할 수 있게 해달라는 요청때문에 생겨난 것이 Hook이다.
  - useState, useRef, useEffect 등
- 해당 컴포넌트에서 state를 관리하고 싶다면 그 함수안에 useState를 선언해야 한다.
- 이벤트리스너 부분의 로직도 함수로 선언하고 함수 내부에 각 state에 맞는 setState를 사용해서 로직을 작성한다.
- ref의 경우 useRef를 사용해서 DOM에 접근하는데, ref.current가 해당 태그를 가리키므로 ref.current.focus()를 해야 해당 태그에 focus가 적용된다.

## 2. Class와 Hooks 비교하기

- Gugudan-class/Gugudan-function, WordRelay/WordRelayClass로 차이 이해하기.
- class => className, for => htmlFor 변경되어 사용되는 부분 확인하기
- state를 객체형태로 하나로 관리하지 않는 이유는 setState를 할 때 바꿀 필요 없는 부분도 다 작성해주어야 되기 때문이다.
- setState(prev => prev + 1) 이전 값에 + 1 해주는 동작을 수행한다.
- React는 useState가 동시다발적으로 일어나면 각 setState마다 렌더링을 수행하는것이 아니라 모아서 비동기로 한번에 처리한다.(Batch라고도 하며, 16ms마다 한번씩 수행하는 것으로 알려져 있다.)

## 3. 웹팩 설치하기

- 웹팩을 사용하는 이유
  - 실무에서는 컴포넌트가 하나가 아니라 여러 컴포넌트로 구성이 된다. html파일 하나로 관리한다면 script가 수십개 쌓이게 될 것이고 이는 곧 수천줄 이상의 코드가 될 것이고 유지 보수가 거의 불가능에 가까워지게 된다. 이를 해결하기 위해 외부 파일을 script에 불러와서 사용하는 방법이 있지만, 이는 또 중복을 발생시키기 때문에 문제가 된다.
  - 이러한 문제를 해결하기 위해 webpack이 탄생하게 된다.
- 웹팩의 기능
  - 수십 수백개의 자바스크립트 파일을 하나로 합쳐주는 역할을 수행한다.
- 웹팩 사용하는 방법
  - npm과 node를 설치하고 npm init
  - author이름과 license를 지정해주면 package.json 파일이 생긴다.
  - 여기에 npm i react react-dom를 통해 react를 설치해준다.
  - 이후 npm i -D webpack webpack-cli를 설치한다. (개발에만 사용되면 npm i -D로 devDependencies에 설치한다.)
  - 이후 webpack.config.js에 이 코드를 작성해준다.(Node의 모듈 시스템 활용)
  ```
  module.exports = {}
  ```
  - 다음 client.jsx 파일을 만들고 아래 코드를 작성해줘서 react를 적용할 수 있게 한다.
  ```
  const React = require("react");
  const ReactDom = require("react-dom/client");
  ```
  - 그다음 index.html에 gugudan에서 적용했던 react를 불러오는 script를 없애고 body태그에 아래처럼 app.js를 script로 넣어줘서 기본 react 세팅을 진행한다.
  ```
    <body>
    <div id="root"></div>
    <script src="/dist/app.js"></script>
    </body>
  ```
  - 이 모든 과정을 대신 해주는 것이 바로 CRA(Create-React-App)의 기능이다. 이게 어떻게 동작하는지 이해하고 CRA를 사용하는 것이 좋다.
- js와 jsx를 구분지어서 React 전용 파일임을 명시하는 것이 좋다. 그리고 JSX문법을 사용한다는 것을 알려줄 수 있다.

## 4. 모듈 시스템과 웹팩 설정

- module.exports는 Node의 모듈시스템인데, 외부에서도 현재 작성한 컴포넌트를 활용할 수 있게 해주는 역할을 한다.

```
// 이렇게 모듈을 내보내고
module.exports = WordRelay

// 내보낸 모듈을 가져와서 사용한다. 이렇게 하면 많은 파일들 중 필요한 것들만 불러와서 사용할 수 있다.
const WordRelay = require("./WordRelay");
```

- 이미 WordRelay, client.jsx 처럼 파일이 여러개 생겨나는데 이를 하나로 합쳐야만 index.html의 script의 src에 적용할 수 있다. 즉 script에는 하나의 파일만 삽입할 수 있는데 이를 위해 여러개의 파일을 하나로 합쳐주는게 웹팩이다.

> webpack.config.js 파일에 작성된 내용 추가로 참고하기.

## 5. 웹팩으로 빌드하기.

- webpack이라는 명령어는 등록해주거나 package.json에 scripts에 추가해서 npm run dev로 webpack이 실행되게 하거나 npx webpack으로 실행이 가능하다.
- 늘 에러를 잘읽어보고 해결하자! 영어공부!!
- 웹팩에도 babel 설정을 해줘야 jsx를 처리할 수 있다.
  - npm i -D @babel/core(기본적인 babel, 최신문법을 바꿔주는 역할 수행) @babel/preset-env(환경(브라우저)에 맞게 알아서 문법을 바꿔주는 역할 수행) @babel/preset-react(react에 맞게 jsx를 바꿔주는 역할 수행) babel-loader(babel과 webpack을 연결해주는 역할 수행)을 설치해줘야 한다.
- @babel/plugin-proposal-class-properties => class안에 state를 지정하는 문법을 사용하기 위해서 필요한 babel

## 6. 구구단 웹팩으로 빌드하기

- 끝말잇기 webpack.config.js를 참고해서 작업하기.

## 7. @bael/preset-env와 plugins

- 상세한 내용은 공식문서를 확인해보는 것이 좋다.
- webpack.config.js

## 8. 끝말잇기 Class 만들기

- WordRelayClass.jsx 참고

## 9. 웹팩 데브 서버와 핫 리로딩

- 파일에 변경사항이 생길때마다 매번 다시 webpack을 빌드해야하는 문제가 있다.
- 이를 자동화해주는 방법이 바로 핫 리로딩.
- npm i -D @pmmmwh/react-refresh-webpack-plugin react-refresh webpack-dev-server를 해줘야한다. (과거와 다름)
- package.json의 script 변경해주기
- webpack.config.js 의 plugins, devServer 변경
- 설정을 다해주고 npm run dev하면 8080포트에 연결되고 수정사항이 실시간으로 반영되게 된다.
- 과거와 미래 그리고 더 먼 미래의 제로초님이 오셨다. 여전히 잘생기셨다.

## 10. 끝말잇기 Hooks로 전환하기

- state는 각각의 useState hook으로 관리한다.
- 메서드는 각각 변수로 만들어서 선언해준다.
- this는 사라지고 각 state 값을 담은 변수를 사용한다.
- HMR => Hot Module Reload, WDS => Webpack Dev Server
- class => className, for => htmlFor 변경하기

## 11. 컨트롤드 인풋 vs 언컨트롤드 인풋

- 컨트롤드 인풋
  - state, onChange, value가 존재하는 input
  - 비밀번호 입력같은 기능에서 조건을 만족하지 않을 때 input에 변화가 나타나는 것을 예로 들 수 있다. submit 버튼을 비활성화 하는 등의 기능을 구현하면 컨트롤드 인풋이 된다.
- 언컨트롤드 인풋
  - 그냥 html로 존재하는 input
  - 더 간단하다. onSubmit에서만 특정한 동작을 하는 경우에 사용한다.
  - e.target을 객체형태로 보고 싶다면 console.dir(e.target) 하기
