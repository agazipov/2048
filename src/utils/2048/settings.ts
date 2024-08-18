import * as PIXI from 'pixi.js'

export class Settings {
    gameWidth: number;
    gameHeight: number;
    background: string;
    padding: number;
    fieldWidth: number;
    fieldHeight: number;

    constructor() {
        this.gameWidth = 460;
        this.gameHeight = 540;
        this.background = '0xffffff';
        this.padding = 10;
        this.fieldWidth = 420;
        this.fieldHeight = 420;
    }

    drawScore(g: PIXI.Graphics) {
        g.clear();
        g.beginFill(0xd7d7d7, 1);
        g.lineStyle(4, 0x898989, 1);
        g.drawRoundedRect(this.gameWidth / 2 - 100, 20, 200, 60, 40);
        g.endFill();
    }

    drawField(g: PIXI.Graphics) {
        g.clear();
        g.beginFill(0xd0c0b0, 1);
        g.lineStyle(4, 0x898989, 1);
        g.drawRoundedRect(this.padding * 2, 100, this.fieldWidth, this.fieldHeight, 10);
        g.endFill();
    }
}