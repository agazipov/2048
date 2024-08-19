import { useEffect } from "react";
import { Field } from "../utils/2048/field";
import { Settings } from "../utils/2048/settings";
import { debounce } from 'lodash';

const INITIALL_FIELD = new Field();
const SETTINGS = new Settings();

export const useGameState = () => {
    useEffect(() => {
        let startX = 0;
        let startY = 0;

        const handleStart = (clientX: number, clientY: number) => {
            startX = clientX;
            startY = clientY;
        };

        const handleEnd = debounce((clientX: number, clientY: number) => {            
            const deltaX = clientX - startX;
            const deltaY = clientY - startY;

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
        }, 900, { leading: true, trailing: false });

        const isMobile = /Mobi|Android/i.test(navigator.userAgent);

        const handleMouseDown = (event: { clientX: number; clientY: number; }) => {
            handleStart(event.clientX, event.clientY);
        };

        const handleMouseUp = (event: { clientX: any; clientY: any; }) => {
            handleEnd(event.clientX, event.clientY);
        };

        const handleTouchStart = (event) => {
            handleStart(event.touches[0].clientX, event.touches[0].clientY);
        };

        const handleTouchEnd = (event) => {
            handleEnd(event.changedTouches[0].clientX, event.changedTouches[0].clientY);
        };

        if (isMobile) {
            window.addEventListener('touchstart', handleTouchStart);
            window.addEventListener('touchend', handleTouchEnd);
        } else {
            window.addEventListener('mousedown', handleMouseDown);
            window.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            if (isMobile) {
                window.removeEventListener('touchstart', handleTouchStart);
                window.removeEventListener('touchend', handleTouchEnd);
            } else {
                window.removeEventListener('mousedown', handleMouseDown);
                window.removeEventListener('mouseup', handleMouseUp);
            }
        };
    }, []);

    return { settings: SETTINGS, init: INITIALL_FIELD };
};