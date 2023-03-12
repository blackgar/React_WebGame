import React, { Component } from "react";
import Ball from "./Ball";

function getWinNumbers() {
  console.log("getWinNumbers");
  const candidate = Array(45)
    .fill()
    .map((v, i) => i + 1);
  const shuffle = [];
  while (candidate.length > 0) {
    shuffle.push(
      candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]
    );
  }
  const bonusNumber = shuffle[shuffle.length - 1];
  const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);
  return [...winNumbers, bonusNumber];
}

class Lotto extends Component {
  state = {
    winNumbers: getWinNumbers(), // 당첨 숫자들
    winBalls: [],
    bonus: null, // 보너스 공
    redo: false,
  };

  timeouts = [];

  runTimeouts = () => {
    console.log("runTimeouts");
    const { winNumbers } = this.state;
    // 6개 당첨 공
    for (let i = 0; i < winNumbers.length - 1; i++) {
      this.timeouts[i] = setTimeout(() => {
        this.setState((prevState) => {
          return {
            winBalls: [...prevState.winBalls, winNumbers[i]],
          };
        });
      }, (i + 1) * 1000);
    }
    // 보너스 공
    this.timeouts[6] = setTimeout(() => {
      this.setState({
        bonus: winNumbers[6],
        redo: true,
      });
    }, 7000);
  };
  // 시작하자마자 숫자가 나와야 하므로 didmount.
  // 내부에서 구현해야할 로직을 따로 위 runTimeouts 함수로 빼서 가독성 향상
  // 부모컴포넌트가 제거할때 setTimeout을 제거하지 않으면 메모리 문제가 생길 수 있다.
  // return 문을 통해 정의된 UI가 먼저 렌더가 되고나서 Didmount가 실행되면서 숫자가 하나씩 등장하게 된다.
  componentDidMount() {
    console.log("didMount");
    this.runTimeouts();
    console.log("로또 숫자를 생성합니다.");
  }

  // Redo 버튼을 눌렀을 때 새롭게 정의해줄 내용을 넣는 부분
  // setState로 변경될때마다 실행이 된다.
  componentDidUpdate(prevProps, prevState) {
    console.log("didUpdate");
    // 조건문으로 감싸지 않으면 계속 숫자가 생성되는 문제 발생.
    if (this.state.winBalls.length === 0) {
      this.runTimeouts();
    }
    // useEffect에서는 이 부분을 따로 다른 useEffect로 또다른 로직을 작성하게 된다.
    // class에서는 한번에, hooks에서는 따로따로 작성
    if (prevState.winNumbers !== this.state.winNumbers) {
      console.log("로또 숫자를 생성합니다.");
    }
  }
  // setTimeout을 클리어해주기.
  componentWillUnmount() {
    this.timeouts.forEach((v) => {
      clearTimeout(v);
    });
  }
  // 한번 더(초기화)
  onClickRedo = () => {
    console.log("onClickRedo");
    this.setState({
      winNumbers: getWinNumbers(), // 당첨 숫자들
      winBalls: [],
      bonus: null, // 보너스 공
      redo: false,
    });
    this.timeouts = [];
  };

  render() {
    const { winBalls, bonus, redo } = this.state;
    return (
      <>
        <div>당첨 숫자</div>
        <div id="결과창">
          {winBalls.map((v) => (
            <Ball key={v} number={v} />
          ))}
        </div>
        <div>보너스!</div>
        {bonus && <Ball number={bonus} />}
        {redo && <button onClick={this.onClickRedo}>한 번 더!</button>}
      </>
    );
  }
}

export default Lotto;
