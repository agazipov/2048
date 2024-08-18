import { Stage } from '@pixi/react'
import './App.css'
import { useGameState } from './hooks/useGameState';
import GameField from './components/GameFIeld/GameFIeld';
import { debounce } from 'lodash';

function App() {
    const { settings, init } = useGameState();

    return (
        <div className='app'>
            <Stage
                width={settings.gameWidth}
                height={settings.gameHeight}
                options={{ background: settings.background }}
            >
                <GameField init={init} settings={settings} />
            </Stage>
        </div>
    )
}

export default App
