import { useEffect, useState } from "react";
import Board from "./board";

export default function App() {
  const boardDimension = 20;
  const [snake, setSnake] = useState([0, 1, 2]);
  const [speed, setSpeed] = useState(300);
  const [direction, setDirection] = useState(1);
  const [food, setFood] = useState(generateFood());

  useEffect(() => {
    console.log("game loop");
    const t = setTimeout(gameStep, speed);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [snake]);

  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      keyDownHandler(e);
    });
  }, []);

  function gameStep(): void {
    const nextPos = snake[snake.length - 1] + direction;
    const newSnake = [...snake];

    if (isGameOver(nextPos)) {
      alert("Game over");
      return;
    }

    if (isFood(nextPos)) {
      speedUp();
      setFood(generateFood());
    } else {
      newSnake.shift(); // remove tail piece if not eaten
    }
    newSnake.push(nextPos); // move head of the snake 
    setSnake(newSnake);
  }

  function keyDownHandler(event: KeyboardEvent) {
    if (event.code === "ArrowUp") {
      setDirection(-boardDimension);
    }
    if (event.code === "ArrowDown") {
      setDirection(boardDimension);
    }
    if (event.code === "ArrowLeft") {
      setDirection(-1);
    }
    if (event.code === "ArrowRight") {
      setDirection(1);
    }
  }

  function generateFood() {
    return Math.floor(Math.random() * (boardDimension ** 2));
  }

  function isFood(nextPos: number) {
    return food === nextPos;
  }

  function isGameOver(nextPos: number) {
    return snake.includes(nextPos)
      || nextPos < 0
      || nextPos >= boardDimension ** 2
      || nextPos % boardDimension === 0 && (snake[snake.length - 1] + 1) % boardDimension === 0
      || (nextPos + 1) % boardDimension === 0 && (snake[snake.length - 1]) % boardDimension === 0;
  }

  function speedUp() {
    setSpeed(speed - 20);
  }

  return (
    <>
      <div className="container">
        <Board
          snake={snake}
          food={food}
          boardDimension={boardDimension}></Board>
      </div>
    </>
  );
}



