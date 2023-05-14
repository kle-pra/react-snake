
export default function NoGame({ onPlayGame }: { onPlayGame: () => void }) {
    return (
        <>
            <button className="play" onClick={onPlayGame}>PLAY</button>
            <p>Use arrow functions to move the snake.</p>
        </>
    );
}
