import { useEffect, useState } from "react";
import Board from "./board";
import ControlButtons from "./control-buttons";
import NoGame from "./no-game";

export default function App() {
  const boardDimension = 20;

  const [snake, setSnake] = useState<Array<number>>([1, 2, 3]);
  const [speed, setSpeed] = useState<number>(300);
  const [directionDiff, setDirectionDiff] = useState<number>(1);
  const [food, setFood] = useState<number>(generateFood());
  const [score, setScore] = useState<number>(0);
  const [isGame, setIsGame] = useState<boolean>(false);

  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      keyDownHandler(e);
    });
  }, []); // only 1 time when components load


  useEffect(() => {
    console.log("game loo");
    if (isGame) {
      const t = setTimeout(gameStep, speed);
      return () => clearTimeout(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [snake]); // when snake changes run effect


  function gameStep(): void {
    const nextPos = snake[snake.length - 1] + directionDiff;
    const newSnake = [...snake];

    if (isGameOver(nextPos)) {
      setIsGame(false);
      alert("Game over");
      return;
    }

    if (isFood(nextPos)) {
      speedUp();
      scoreUp();
      setFood(generateFood());
    } else {
      newSnake.shift(); // remove tail piece if not eaten
    }

    newSnake.push(nextPos); // move head of the snake 
    setSnake(newSnake);
  }

  function keyDownHandler(event: KeyboardEvent): void {
    if (event.code === "ArrowUp") {
      setDirectionDiff(-boardDimension);
    }
    if (event.code === "ArrowDown") {
      setDirectionDiff(boardDimension);
    }
    if (event.code === "ArrowLeft") {
      setDirectionDiff(-1);
    }
    if (event.code === "ArrowRight") {
      setDirectionDiff(1);
    }
  }

  function generateFood(): number {
    return Math.floor(Math.random() * (boardDimension ** 2));
  }

  function isFood(nextPos: number): boolean {
    return food === nextPos;
  }

  function isGameOver(nextPos: number): boolean {
    return snake.includes(nextPos)
      || nextPos < 0
      || nextPos >= boardDimension ** 2
      || nextPos % boardDimension === 0 && (snake[snake.length - 1] + 1) % boardDimension === 0
      || (nextPos + 1) % boardDimension === 0 && (snake[snake.length - 1]) % boardDimension === 0;
  }

  function speedUp(): void {
    setSpeed(speed - 20);
  }

  function scoreUp(): void {
    setScore(score + 10);
  }

  function onPlayGame(): void {
    setIsGame(true);
    setSnake([0, 1, 2]);
    setDirectionDiff(1);
    setFood(generateFood());
    setSpeed(300);
    setScore(0);
  }

  function onArrowButton(diff: number): void {
    setDirectionDiff(diff);
  }

  return (
    <>
      <div className="container">
        {!isGame && <NoGame onPlayGame={onPlayGame} />}
        {isGame && (<>
          <h2>Score: {score}</h2>
          <Board
            snake={snake}
            foodIndex={food}
            boardDimension={boardDimension}></Board>

          <ControlButtons
            onArrowButton={onArrowButton}
            boardDimension={boardDimension}
          ></ControlButtons>
        </>)
        }
      </div>
    </>
  );
}



