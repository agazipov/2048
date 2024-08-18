import { useCallback, useEffect, useMemo, useState } from "react";
import { Field, TDirection } from "../utils/2048/field";
import { Settings } from "../utils/2048/settings";

const INITIALL_FIELD = new Field();
const SETTINGS = new Settings();

export const useGameState = () => {
    const [field, setField] = useState(INITIALL_FIELD.field);

    const handleDirection = useCallback((direction: TDirection) => {
        INITIALL_FIELD.handleDirection(direction);
        setField([...INITIALL_FIELD.field]);
    }, []);
    
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
                    INITIALL_FIELD.handleDirection('right');
                } else {
                    INITIALL_FIELD.handleDirection('left');
                }
            } else {
                // Большее движение по оси Y
                if (deltaY > 0) {
                    INITIALL_FIELD.handleDirection('down');
                } else {
                    INITIALL_FIELD.handleDirection('up');
                }
            }
        };

        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, []);

    return { settings: SETTINGS, init: INITIALL_FIELD };
};