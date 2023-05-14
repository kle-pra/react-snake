
export type PositionProps = {
    snake: number[],
    food?: string,
    index: number
}

export default function Position({ snake, food, index }: PositionProps) {


    return (
        <div className={`position 
        ${snake.includes(index) ? 'snake' : ''}
        ${food ? 'food' : ''}
        `} >
            {food ? food : ''}

        </div>
    );
}
