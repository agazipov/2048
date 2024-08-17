import React, { useEffect, useRef, useState } from 'react';
import { TextStyle } from 'pixi.js';
import { Text, Graphics, useTick, Container } from '@pixi/react';
import { Field } from '../../utils/2048/field';

interface FieldProps {
    init: Field;
}

const GameField: React.FC<FieldProps> = ({ init }) => {
    const [cells, setCells] = useState(init.field);      
    
    useTick((delta) => {
        if (init.animationActivated) {
            init.animation(delta);
            setCells([...init.field]);
        }
    });

    return (
        <Container>
            {cells.map(cell => {
                return (
                    <React.Fragment key={cell.id}>
                        <Graphics draw={(g) => cell.draw(g)} />
                        <Text
                            text={cell.value !== 0 ? cell.value.toString() : ''}
                            anchor={0.5}
                            x={cell.drawText()[0]}
                            y={cell.drawText()[1]}
                            style={
                                new TextStyle({
                                    align: 'center',
                                    fill: 'black',
                                    fontSize: 20,
                                })
                            }
                        />
                    </React.Fragment>
                )
            })}
        </Container>
    );
};

export default GameField;