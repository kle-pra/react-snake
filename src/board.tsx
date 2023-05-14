import Position from "./position";

export type BoardProps = {
    snake: number[],
    food: number,
    boardDimension: number
}

export default function Board({ snake, food, boardDimension }: BoardProps) {
    const positions = Array<void>(boardDimension ** 2).fill();
    return (
        <div className="board" >
            {positions.map(
                (_p, i) => <Position key={i} snake={snake} foodIndex={food} index={i} />
            )}
        </div>
    );
}
