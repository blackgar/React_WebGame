const React = require("react");
const { Component } = React;

class WordRelay extends Component {
  // 바뀌는 부분은 state
  state = {
    word: "제로초",
    value: "",
    result: "",
  };

  onSubmitForm = (e) => {
    e.preventDefault();
    // 글자 비교
    if (this.state.word[this.state.word.length - 1] === this.state.value[0]) {
      // state 변경
      this.setState({
        result: "딩동댕",
        word: this.state.value,
        value: "",
      });
      // focus적용
      this.input.focus();
    } else {
      this.setState({
        result: "땡",
        value: "",
      });
      this.input.focus();
    }
  };

  onChangeInput = (e) => {
    // input값 받아오기
    this.setState({ value: e.target.value });
  };

  input; // this.input을 생성

  onRefInput = (c) => {
    this.input = c;
  };

  render() {
    return (
      // fragment로 감싸기.
      <>
        <div>{this.state.word}</div>
        <form onSubmit={this.onSubmitForm}>
          {/* input에 value를 넣을거면 onChange를 넣어야한다. 만약 그냥 onChange없이 value를 쓰려면 defaultValue를 써야한다. */}
          <input
            ref={this.onRefInput}
            value={this.state.value}
            onChange={this.onChangeInput}
          />
          <button>클릭!!!</button>
        </form>
        <div>{this.state.result}</div>
      </>
    );
  }
}

module.exports = WordRelay;
