import { Stage } from '@pixi/react'
import './App.css'
import BottonsArrow from './components/BottonsArrow/BottonsArrow';
import { useGameState } from './hooks/useGameState';
import GameField from './components/GameFIeld/GameFIeld';
import { useEffect } from 'react';
import { debounce } from 'lodash'

function App() {
    const { handleDirection, init } = useGameState();

    useEffect(() => {
        let startCursorX = 0;
        let startCursorY = 0;

        const handleMouseDown = (event) => {
            startCursorX = event.clientX;
            startCursorY = event.clientY;
        };

        const handleMouseUp =(event) => {           
            const deltaX = event.clientX - startCursorX;
            const deltaY = event.clientY - startCursorY;

            if (Math.abs(deltaX) > Math.abs(deltaY)) {
                // Большее движение по оси X
                if (deltaX > 0) {
                    handleDirection('right');
                } else {
                    handleDirection('left');
                }
            } else {
                // Большее движение по оси Y
                if (deltaY > 0) {
                    handleDirection('down');
                } else {
                    handleDirection('up');
                }
            }
        };

        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [handleDirection]);

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
