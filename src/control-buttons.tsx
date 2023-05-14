type ControlButtonProps = {
    onArrowButton: (diff: number) => void,
    boardDimension: number
}


export default function ControlButtons({ onArrowButton, boardDimension }: ControlButtonProps) {
    return (
        <div className="arrow-buttons">
            <button onClick={() => onArrowButton(-boardDimension)}> ⬆ UP</button>

            <div className="middle-buttons">
                <button onClick={() => onArrowButton(-1)}>⬅ LEFT</button>
                <button onClick={() => onArrowButton(1)}>RIGHT ➡</button>
            </div>

            <button onClick={() => onArrowButton(boardDimension)}>⬇ DOWN</button>
        </div>
    );
}
