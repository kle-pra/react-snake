import { useState } from "react";

export type PositionProps = {
    snake: number[],
    foodIndex: number,
    index: number
}

export default function Position({ snake, foodIndex, index }: PositionProps) {


    const foods = ['🍒', '🍎', '🍇'];
    const [food, setFood] = useState(foods[Math.floor(Math.random() * foods.length)]);
    return (
        <div className={`position 
        ${snake.includes(index) ? 'snake' : ''}
        ${foodIndex === index ? 'food' : ''}
        `} >
            {index == foodIndex ? food : ''}

        </div>
    );
}
