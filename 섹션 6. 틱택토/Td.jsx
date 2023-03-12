import React, { useCallback, memo } from "react";
import { CHANGE_TURN, CLICK_CELL } from "./TicTacToe";

const Td = memo(({ rowIndex, cellIndex, dispatch, cellData }) => {
  console.log("td rendered");

  const onClickTd = useCallback(() => {
    console.log(rowIndex, cellIndex);
    if (cellData) {
      return;
    }
    dispatch({ type: CLICK_CELL, row: rowIndex, cell: cellIndex });
    // 비동기로 인해 값이 이상하게 들어가게 되어 제거하고 위치를 조정해야 함.
    // dispatch({ type: CHANGE_TURN });
  }, [cellData]);

  return <td onClick={onClickTd}>{cellData}</td>;
});
Td.displayName = "Td";

export default Td;
