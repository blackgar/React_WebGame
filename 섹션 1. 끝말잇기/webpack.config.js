const path = require("path"); // node에서 경로를 쉽게 조작할 수 있게 도와주는 것
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

module.exports = {
  name: "word-relay-dev", // wordrelay-setting
  mode: "development", // 실서비스에서는 production으로
  devtool: "inline-source-map", // eval
  resolve: {
    extensions: [".js", ".jsx"],
  },
  entry: {
    app: "./client", // client.jsx에서 이미 WordRelay를 불러오기 때문에 client 하나만 작성해줘도 된다. 확장자도 작성하지 않고 resolve의 extensions에 js, jsx를 넣어줘서 알아서 webpack이 파일을 찾아준다.
  }, // 입력
  module: {
    rules: [
      {
        test: /\.jsx?$/, // js와 jsx파일에 규칙을 적용한다.
        loader: "babel-loader", // 바벨 로더를 적용한다.
        options: {
          // 바벨 옵션을 적용한다.
          presets: [
            [
              "@babel/preset-env", // 첫번째 preset 이름
              {
                targets: { browsers: ["last 2 chrome versions"] }, // 두번째는 구체적으로 어떤 브라우저를 타겟으로 해서 지원할지 적어준다. 크롬만 지원하고 IE는 하지 않을 때 사용. 특히, 옛날 브라우저는 문법을 지원하지 않는 것도 많고 babel이 처리해야 할 양이 많아지므로 이런 옵션들을 사용해서 효율성을 추구한다.
                // "> 5% in KR" 이 옵션은 한국에서 5퍼센트 이상 점유하는 브라우저는 다 지원하겠다는 의미
                debug: true, // 개발용일때는 debug true로 둬서 디버깅할 수 있게 적용
              },
            ],
            "@babel/preset-react",
          ], // plugin들의 모음이 preset이다. 그래서 babel-loader의 옵션 속 preset의 옵션도 있을 수 있다.
          plugins: [
            "@babel/plugin-proposal-class-properties",
            "react-refresh/babel", // 핫 리로딩 기능 추가
          ],
        },
        exclude: path.join(__dirname, "node_modules"),
      },
    ], // 여러개의 규칙을 적용하기 위한 배열
  },
  plugins: [new ReactRefreshWebpackPlugin()], // loader의 plugin과 어떻게 다른가?
  // 확장프로그램의 개념으로 알고 있으면 된다.
  // 빌드할때 실행된다.
  output: {
    path: path.join(__dirname, "dist"), // 원래 경로는 ~/Desktop/React_WebGame/섹션 1. 끝말잇기 이렇게 되어 있을텐데 이를 간단하게 처리해주는 역할을 한다.
    filename: "[name].js",
    publicPath: "/dist",
  }, // 출력
  devServer: {
    devMiddleware: { publicPath: "/dist" },
    static: { directory: path.resolve(__dirname) },
    hot: true,
  },
};
