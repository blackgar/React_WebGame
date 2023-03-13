# 섹션 8. react-router (v5 & v6)

## 1. React Router 도입하기

- 웹 개발에 필요한 라우터 기능
- 한페이지에서 각 게임으로 들어갈 수 있는 페이지 구성
- react-router-dom도 설치를 해야 웹에서 사용이 가능하다.

## 2. Link와 브라우저라우터(BrowserRouter)

- BrowserRouter
  - 라우터 최상단에 감싸줘야하는 태그
  - 이 안에 Route태그로 가야할 경로로 이동할 수 있는 경로 설정
  - Route 태그 안의 속성인 component에 보여줄 component를 넣어준다.
- React-router은 페이지가 여러개 있는 척 하는 것이다.
- 그래서 Link라는 태그를 이용해서 router 주소를 불러줘서 해당 페이지를 보여주는 것이다.
- Link
  - to라는 곳에 보내줄 경로를 입력한다.
- 클래스 컴포넌트의 경우 React를 서로 다른 곳에서 import 하더라도 사용할 수 있다.
- 주소창에 쓰는 주소는 서버로 보내는 것이므로 새로고침 했을 때 react-router만 알고 있는 주소에 대해서는 가져올 수 없는 문제가 발생한다.
- 공통인 부분과 바뀌는 부분의 구분을 이해해야 한다.

## 3. 해시라우터, params, withRouter

- HashRouter
  - /#/경로 이렇게 된다.
  - /# 이 해쉬 뒤에 부분을 브라우저도 알고 react-router도 알기 때문에 새로고침해도 정상적으로 페이지가 나타난다.
  - 관리자 페이지, 검색엔진이 중요하지 않는 페이지는 HashRouter을 사용
- Dynamic Routing
  - /경로/:name, id 등등 구분할 수 있는 값을 경로에 parameter로 넣어서 동적으로 바뀌는 값에 맞춰서 경로가 나타날 수 있도록 해주는 기능.
  - 공통된 dynamic route 하나만 작성해주고 해당 컴포넌트에서 서로 다른 화면을 보여줄 수 있는 로직을 구성하는 것이 핵심이다.
- withRouter
  - router에 연결되어 있지 않은 상태에서 history, match, location과 같은 값을 사용하고 싶을때 사용.

## 4. location, match, history

- history에는 앞으로 가기, 뒤로 가기 등 기록을 들고 있으면서 react-router가 제공하는 기능을 통해 경로에 대한 처리를 한다.
- match params에 공통된 경로 뒤의 가변인자가 나타난다. :name, :id에 들어간 값
- location은 지금 주소창에 있는 주소를 나타낸다.
- 이러한 기능을 통해 현재 경로를 인식하고 그 경로에 따른 다른 component를 렌더링해서 보여줄 수 있도록 구현하는게 웹개발의 핵심.
- 해당 내용은 hooks에서는 props에 들어있다.

## 5. 쿼리스트링과 URLSearchParams

- 쿼리스트링
  - ?query=10&hello=zero 등 key=value 이런식으로 표현되는 것들을 쿼리스트링이라고 한다.
  - 경로를 통해서 전달하고픈 내용들을 적어서 보여주는 것이라고 생각하면 된다.
  - 일반적으로 게시판 페이지나 공통된 부분에서 변화된 특정 값들의 변화만 경로에 보여주면될 때 사용한다.
- URLSearchParams
  - .get(key)를 사용하면 그에 해당하는 값들을 가져올 수 있다.
  - 이를 제외하고도 쿼리스트링으로 넣어놓은 값들을 활용하고 가져오고 할 수 있도록 도와주는 메서드이다.
- 변경이 되지 않는 부분이 Layout(공통된 부분), 바뀌는 부분이 Route(컴포넌트)가 된다.

## 6. render props, switch, exact

- Route 프로퍼티에 render을 쓰게 되면 props를 통해서 해당 컴포넌트에 전달하고 싶은 값들을 지정해줄 수 있다.
- 첫번째로 일치하는 값들만 사용하고 싶을 때는 Switch를 사용해서 첫번째로 일치하는 값만 보여줄 수 있도록 한다. 여러 페이지가 한페이지에 다 렌더링 될 수 있는 현상을 막아준다.
- Switch는 path에 해당하는 경로와 일치하면 모두 보여주는데 "/"의 경우 "/game"이런것도 일치한다고 판단하고 여러 페이지를 동시에 렌더링 할 수 있어서 "/"이 경로에서는 하나의 컴포넌트만 보여주고 싶다면 exact를 사용해야 한다.

## 7. 리액트라우터6(feat.REMIX) + 라이브러리 버전 업그레이드 꿀팁

- React Router와 React Router가 합쳐졌다.
- remix사에서 본인들의 프레임워크와 잘 호환되는 React Router 기능을 위해서 업그레이드 했다?
- 변경사항

  - 변경사항을 확인할때는 해당 라이브러리의 github으로 가서 확인하는 것이 가장 정확하고 명확하게 확인할 수 있다. ChangeLog와 같이 변경사항을 기록해둔 Docs를 읽어보거나 릴리즈 버전에 맞게 문서와 코들를 확인하면 좋다.
  - Switch가 들어가던 부분이 Routes가 된다.
  - Nested routing 가능

    ```
    // App.jsx
    <Route path="/game/:name" element={<Main />} />

    // Main.jsx
    <Route path="number-baseball" element={<NumberBaseball />} />
    <Route path="lotto-generator" element={<LottoGenerator />} />
    <Route path="rock-scissors-paper" element={<RSP />} />
    ```

    - 위 경로에서는 name 부분에 Main.jsx 각 Route의 path가 들어가게된다.
    - 기존에 하던 조건 분기가 필요가 없다.

  - useHistory => useNavigate
    - navigate(-2) 2pages back, navigate(1) go forward
  - Typescript를 쓰면 에러 및 변경사항에 대한 확인이 더 명확해진다.

- codemod를 쓰면 특정 내용에 대해서 전 파일에서의 수정이 가능해진다.
- npm outdated
  - 최신 버전의 패키지가 나온게 있는지 주기적으로 확인해보는 것이 좋다.
