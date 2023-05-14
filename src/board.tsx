import { useEffect, useState } from "react";
import Position from "./position";

export type BoardProps = {
    snake: number[],
    foodIndex: number,
    boardDimension: number
}

export default function Board({ snake, foodIndex, boardDimension }: BoardProps) {
    const positions = Array<void>(boardDimension ** 2).fill();
    const [food, setFood] = useState<string>();

    useEffect(() => {
        const foods = ['🍒', '🍎', '🍇'];
        setFood(foods[Math.floor(Math.random() * foods.length)]);
    }, [foodIndex]);

    return (
        <div className="board" >
            {positions.map(
                (_p, i) => <Position key={i} snake={snake} food={foodIndex == i ? food : undefined} index={i} />
            )}
        </div>
    );
}
