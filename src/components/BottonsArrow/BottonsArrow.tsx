import React from 'react';
import { Field, TDirection } from '../../utils/2048/field';

interface ButtonProps {
    init: Field;
    onClick: (direction: TDirection) => void;
}

const BottonsArrow: React.FC<ButtonProps> = ({init, onClick}) => {

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <button
                onClick={() => onClick('right')}
                style={{ width: '80px', height: '20px' }}
            >Right</button>
            <button
                onClick={() => onClick('left')}
                style={{ width: '80px', height: '20px' }}
            >left</button>
            <button
                onClick={() => onClick('down')}
                style={{ width: '80px', height: '20px' }}
            >down</button>
            <button
                onClick={() => onClick('up')}
                style={{ width: '80px', height: '20px' }}
            >up</button>
        </div>
    );
};

export default BottonsArrow;