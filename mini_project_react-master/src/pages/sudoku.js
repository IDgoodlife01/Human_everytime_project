import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";

// --- 스타일 컴포넌트 ---
const GameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 450px;
  margin: 0 auto;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  border: 3px solid #000;
  margin-bottom: 20px;
  width: 100%;
  aspect-ratio: 1 / 1;
  background-color: #fff;
`;

const Cell = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: clamp(16px, 4vw, 22px);
  cursor: pointer;
  box-sizing: border-box;
  aspect-ratio: 1 / 1;

  border-right: ${(props) =>
    props.c === 2 || props.c === 5 ? "3px solid #000" : "1px solid #ccc"};
  border-bottom: ${(props) =>
    props.r === 2 || props.r === 5 ? "3px solid #000" : "1px solid #ccc"};

  ${(props) => props.c === 8 && "border-right: none;"}
  ${(props) => props.r === 8 && "border-bottom: none;"}

  background-color: ${(props) =>
    props.isError
      ? "#ffebee"
      : props.isSelected
        ? "#e3f2fd"
        : props.isHinted
          ? "#fff3e0"  /* 힌트 배경: 연한 주황 */
          : props.isFixed
            ? "#f0f0f0"
            : "#fff"};

  color: ${(props) =>
    props.isError
      ? "#ff0000"
      : props.isHinted
        ? "#ef6c00" /* 힌트 글자: 진한 주황 */
        : props.isFixed
          ? "#333333"
          : "#007bff"};

  font-weight: bold;
  outline: ${(props) => (props.isSelected ? "2px solid #007bff" : "none")};
  z-index: ${(props) => (props.isSelected ? 1 : 0)};
`;

const BtnGroup = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-bottom: 15px;
  width: 100%;
`;

const Btn = styled.button`
  padding: 10px 5px;
  border: 1px solid #ddd;
  background: ${(props) => (props.active ? "#333" : "#eee")};
  color: ${(props) => (props.active ? "white" : "#333")};
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  flex: 1;
  &:hover {
    background: #ddd;
  }
`;

const Numpad = styled.div`
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  gap: 5px;
  width: 100%;
`;

// --- 유효성 및 생성 로직 ---
const isValidFinal = (board, r, c, n) => {
  if (n === 0) return false;
  for (let i = 0; i < 9; i++) {
    if (i !== c && board[r][i] === n) return false;
    if (i !== r && board[i][c] === n) return false;
  }
  let rr = Math.floor(r / 3) * 3,
    cc = Math.floor(c / 3) * 3;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if ((rr + i !== r || cc + j !== c) && board[rr + i][cc + j] === n)
        return false;
    }
  }
  return true;
};

const checkValid = (board, r, c, n) => {
  for (let i = 0; i < 9; i++) {
    if (board[r][i] === n || board[i][c] === n) return false;
  }
  let rr = Math.floor(r / 3) * 3,
    cc = Math.floor(c / 3) * 3;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[rr + i][cc + j] === n) return false;
    }
  }
  return true;
};

const solve = (board) => {
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (board[r][c] === 0) {
        let nums = [1, 2, 3, 4, 5, 6, 7, 8, 9].sort(() => Math.random() - 0.5);
        for (let n of nums) {
          if (checkValid(board, r, c, n)) {
            board[r][c] = n;
            if (solve(board)) return true;
            board[r][c] = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
};

const generateSudokuBoard = () => {
  let board = Array.from({ length: 9 }, () => Array(9).fill(0));
  solve(board);
  return board;
};

const pokeHoles = (board, count) => {
  let holes = 81 - count;
  while (holes > 0) {
    let r = Math.floor(Math.random() * 9),
      c = Math.floor(Math.random() * 9);
    if (board[r][c] !== 0) {
      board[r][c] = 0;
      holes--;
    }
  }
};

const SudokuGame = () => {
  const [hintedCells, setHintedCells] = useState([]); // 힌트 좌표 저장
  const [difficulty, setDifficulty] = useState("보통");
  const [solution, setSolution] = useState([]);
  const [initialBoard, setInitialBoard] = useState([]);
  const [displayBoard, setDisplayBoard] = useState([]);
  const [selectedCell, setSelectedCell] = useState({ r: -1, c: -1 });
  const [hintsLeft, setHintsLeft] = useState(3);
  const [errors, setErrors] = useState(
    Array(9).fill().map(() => Array(9).fill(false))
  );

  // --- 새 게임 생성 ---
  const newGame = useCallback((diff) => {
    setDifficulty(diff);
    let clueCount = diff === "쉬움" ? 40 : diff === "보통" ? 30 : 20;

    const fullBoard = generateSudokuBoard();
    setSolution(fullBoard.map((row) => [...row]));

    const gameBoard = fullBoard.map((row) => [...row]);
    pokeHoles(gameBoard, clueCount);

    setInitialBoard(gameBoard.map((row) => [...row]));
    setDisplayBoard(gameBoard.map((row) => [...row]));
    setHintsLeft(3);
    setHintedCells([]); // 힌트 초기화
    setSelectedCell({ r: -1, c: -1 });
    setErrors(Array(9).fill().map(() => Array(9).fill(false)));
  }, []);

  useEffect(() => {
    newGame("보통");
  }, [newGame]);

  // --- 입력 처리 ---
  const handleInput = useCallback((n) => {
    if (selectedCell.r === -1 || initialBoard[selectedCell.r][selectedCell.c] !== 0) return;

    const newBoard = displayBoard.map((row) => [...row]);
    newBoard[selectedCell.r][selectedCell.c] = n;
    setDisplayBoard(newBoard);

    // 수동 입력 시 해당 칸이 힌트였다면 힌트 목록에서 제거 (선택 사항)
    setHintedCells(prev => prev.filter(cell => !(cell.r === selectedCell.r && cell.c === selectedCell.c)));

    setErrors(Array(9).fill().map(() => Array(9).fill(false)));
  }, [selectedCell, initialBoard, displayBoard]);

  const handleDelete = useCallback(() => handleInput(0), [handleInput]);

  // --- 힌트 로직 ---
  const giveHint = () => {
    const { r, c } = selectedCell;
    if (r === -1 || c === -1) {
      alert("힌트를 받을 칸을 먼저 선택해주세요!");
      return;
    }
    if (displayBoard[r][c] !== 0) {
      alert("비어있는 칸을 선택해야 힌트를 드릴 수 있습니다.");
      return;
    }
    if (hintsLeft <= 0) {
      alert("남은 힌트가 없습니다!");
      return;
    }

    const answer = solution[r][c];
    const newBoard = displayBoard.map((row) => [...row]);
    newBoard[r][c] = answer;

    setDisplayBoard(newBoard);
    setHintedCells((prev) => [...prev, { r, c }]); // 힌트 위치 추가
    setHintsLeft((prev) => prev - 1);
  };

  const checkErrors = () => {
    let errorFound = false;
    let newErrors = Array(9).fill().map(() => Array(9).fill(false));
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        let val = displayBoard[r][c];
        if (val === 0) continue;
        if (!isValidFinal(displayBoard, r, c, val) && initialBoard[r][c] === 0) {
          newErrors[r][c] = true;
          errorFound = true;
        }
      }
    }
    setErrors(newErrors);
    if (!errorFound) alert("중복된 숫자가 없습니다!");
  };

  const submitAnswer = () => {
    let isComplete = displayBoard.every(row => row.every(val => val !== 0));
    if (!isComplete) {
      alert("아직 채워지지 않은 칸이 있습니다!");
      return;
    }

    let hasError = false;
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (!isValidFinal(displayBoard, r, c, displayBoard[r][c])) {
          hasError = true;
          break;
        }
      }
      if (hasError) break;
    }

    if (hasError) {
      alert("땡~ 다시도전! (중복된 숫자가 있거나 규칙에 맞지 않습니다.)");
    } else {
      alert("성공~ 다음 난이도 도전!");
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Backspace" || e.key === "Delete") handleDelete();
      else if (e.key >= "1" && e.key <= "9") handleInput(parseInt(e.key));
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleDelete, handleInput]);

  if (displayBoard.length === 0) return <div>로딩 중...</div>;

  return (
    <GameWrapper>
      <BtnGroup>
        {["쉬움", "보통", "어려움"].map((d) => (
          <Btn key={d} active={difficulty === d} onClick={() => newGame(d)}>
            {d}
          </Btn>
        ))}
      </BtnGroup>

      <Grid>
        {displayBoard.map((row, r) =>
          row.map((val, c) => (
            <Cell
              key={`${r}-${c}`}
              r={r}
              c={c}
              isFixed={initialBoard[r][c] !== 0}
              isSelected={selectedCell.r === r && selectedCell.c === c}
              isError={errors[r][c]}
              isHinted={hintedCells.some(h => h.r === r && h.c === c)}
              onClick={() => {
                if (initialBoard[r][c] === 0) setSelectedCell({ r, c });
              }}
            >
              {val !== 0 ? val : ""}
            </Cell>
          )),
        )}
      </Grid>

      <BtnGroup>
        <Btn onClick={giveHint}>힌트 ({hintsLeft})</Btn>
        <Btn onClick={checkErrors}>중복확인</Btn>
        <Btn onClick={submitAnswer}>정답제출</Btn>
      </BtnGroup>

      <Numpad>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
          <Btn key={n} onClick={() => handleInput(n)}>
            {n}
          </Btn>
        ))}
        <Btn style={{ gridColumn: "span 9", marginTop: "5px" }} onClick={handleDelete}>
          지우기
        </Btn>
      </Numpad>
    </GameWrapper>
  );
};

export default SudokuGame;