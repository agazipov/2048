import { TextStyle } from 'pixi.js';
import { Stage, Container, Text, Graphics } from '@pixi/react';
import { useCallback, useMemo, useState } from 'react';
import React from 'react';
import { Field } from '../../utils/2048/field';
import { Cell } from '../../utils/2048/cell';

const INITIALL_FIELD = new Field();

const GameField = () => {
    const [field, setField] = useState(INITIALL_FIELD.field);

    const draw = useCallback((g, x, y) => {
        g.clear();
        g.lineStyle(2, 0x0000ff, 1);
        g.beginFill(0xff700b, 1);
        g.drawRect(x * 100 + 5, y * 100 + 5, 90, 90);
        g.endFill();
    }, []);

    return (
        <>
            <Stage width={400} height={400} options={{ background: 0x1099bb }}>
                {field.map(cell => {
                    return (
                        <React.Fragment key={cell.id}>
                            <Graphics draw={(g) => draw(g, cell.x, cell.y)} />
                            <Text
                                text={cell.value.toString()}
                                anchor={0.5}
                                x={cell.x * 100 + 50}
                                y={cell.y * 100 + 50}
                                style={
                                    new TextStyle({
                                        align: 'center',
                                        fill: '0xffffff',
                                        fontSize: 20,
                                        letterSpacing: 20,
                                        dropShadowColor: '#E72264',
                                    })
                                }
                            />
                        </React.Fragment>
                    )
                })}
            </Stage>
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <button
                    onClick={() => setField([...INITIALL_FIELD.handleDirection('right')])}
                    style={{ width: '80px', height: '20px' }}
                >Right</button>
                <button
                    onClick={() => setField([...INITIALL_FIELD.handleDirection('left')])}
                    style={{ width: '80px', height: '20px' }}
                >left</button>
                <button
                    onClick={() => setField([...INITIALL_FIELD.handleDirection('down')])}
                    style={{ width: '80px', height: '20px' }}
                >down</button>
                <button
                    onClick={() => setField([...INITIALL_FIELD.handleDirection('up')])}
                    style={{ width: '80px', height: '20px' }}
                >up</button>
            </div>
        </>
    );
};

export default GameField;