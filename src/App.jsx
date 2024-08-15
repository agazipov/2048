import { Stage } from '@pixi/react'
import './App.css'
import BottonsArrow from './components/BottonsArrow/BottonsArrow';
import { useGameState } from './hooks/useGameState';
import GameField from './components/GameFIeld/GameFIeld';

function App() {
    const { handleDirection, init } = useGameState();

    return (
        <div className='app'>
            <Stage
                width={400}
                height={400}
                options={{ background: 0xd0c0b0 }}
            >
                <GameField init={init} />
            </Stage>
            <BottonsArrow init={init} onClick={handleDirection} />
        </div>
    )
}

export default App
