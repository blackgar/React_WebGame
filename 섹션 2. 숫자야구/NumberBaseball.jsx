import React, { useRef, useState, useCallback } from "react";
import Try from "./Try";

const getNumbers = () => {
  const candidates = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const array = [];
  for (let i = 0; i < 4; i += 1) {
    const chosen = candidates.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
    array.push(chosen);
  }
  return array;
};

const NumberBaseball = () => {
  // this.state를 각 변수로 분해
  const [answer, setAnswer] = useState(getNumbers); // lazy init, 변수를 함수로 만들어서 return된 값을 넣게 되므로 초기화 및 할당이 늦다. getNumbers()로 넣게 되면 계속 숫자를 생성하게 되는 문제가 된다. 그래서 그냥 함수명만 넣게 되면 초기값 할당할때만 동작한다.
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");
  const [tries, setTries] = useState([]);
  const inputEl = useRef(null);

  const onSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      if (value === answer.join("")) {
        setTries((t) => [
          ...t,
          {
            try: value,
            result: "홈런!",
          },
        ]);
        setResult("홈런!");
        alert("게임을 다시 실행합니다.");
        setValue("");
        // 이부분에서는 ()를 붙여서 바로 return된 Array를 받아서 setter 함수로 할당해야 한다.
        setAnswer(getNumbers());
        setTries([]);
        inputEl.current.focus();
      } else {
        const answerArray = value.split("").map((v) => parseInt(v));
        let strike = 0;
        let ball = 0;
        if (tries.length >= 9) {
          setResult(`10번 넘게 틀려서 실패! 답은 ${answer.join(",")}였습니다!`); // state set은 비동기
          alert("게임을 다시 시작합니다.");
          setValue("");
          setAnswer(getNumbers());
          setTries([]);
          inputEl.current.focus();
        } else {
          console.log("답은", answer.join(""));
          for (let i = 0; i < 4; i += 1) {
            if (answerArray[i] === answer[i]) {
              console.log("strike", answerArray[i], answer[i]);
              strike += 1;
            } else if (answer.includes(answerArray[i])) {
              console.log(
                "ball",
                answerArray[i],
                answer.indexOf(answerArray[i])
              );
              ball += 1;
            }
          }
          setTries((t) => [
            ...t,
            {
              try: value,
              result: `${strike} 스트라이크, ${ball} 볼입니다.`,
            },
          ]);
          setValue("");
          inputEl.current.focus();
        }
      }
    },
    [value, answer]
  );

  const onChangeInput = useCallback((e) => setValue(e.target.value), []);

  return (
    <>
      <h1>{result}</h1>
      <form onSubmit={onSubmitForm}>
        <input
          ref={inputEl}
          maxLength={4}
          value={value}
          onChange={onChangeInput}
        />
        <button>입력!</button>
      </form>
      <div>시도: {tries.length}</div>
      <ul>
        {tries.map((v, i) => (
          <Try key={`${i + 1}차 시도 : ${v.try}`} tryInfo={v} />
        ))}
      </ul>
    </>
  );
};

export default NumberBaseball;
