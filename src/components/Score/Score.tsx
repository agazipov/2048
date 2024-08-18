import React from "react";
import { Container, Graphics, Text } from "@pixi/react";
import { TextStyle } from "pixi.js";
import { Field } from "../../utils/2048/field";
import { Settings } from "../../utils/2048/settings";

interface ScoreProps {
    init: Field;
    settings: Settings
}

const Score: React.FC<ScoreProps> = ({ init, settings }) => {
    return (
        <Container>
            <Graphics
                draw={(g) => settings.drawScore(g)}
            />
            <Text
                text={`СЧЕТ: ${init.score}`}
                anchor={0.5}
                x={settings.gameWidth / 2}
                y={50}
                style={
                    new TextStyle({
                        align: 'center',
                        fill: 'black',
                        fontSize: 28,
                    })
                }
            />
            <Graphics
                draw={(g) => settings.drawField(g)}
            />
        </Container>
    )
}

export default Score;