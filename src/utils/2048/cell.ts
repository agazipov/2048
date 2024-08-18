import * as PIXI from 'pixi.js'
import { TDirection } from './field';

export class Cell {
    id: string;
    value: number; // цифровое значение клетки
    animationValue: number; // маска значения необходимая для анимации. при работе логики не изменяется в отличии от текущего. после анимации принимает текущее значение
    x: number;
    y: number;

    isAnimating: boolean; // для анимации только изменивших значение клеток
    isMerging: boolean; // препятствует двойному слиянию за ход

    offsetX: number; // смещение клетки при анимации по оси Х
    offsetY: number; // смещение клетки при анимации по оси Y
    amplitude: number; // показатель на солько долна смещаться клетка при анимации

    constructor(
        count: string,
        x: number,
        y: number,
    ) {
        this.id = count;
        this.value = 0;
        this.animationValue = this.value;
        this.x = x;
        this.y = y;
        this.isAnimating = false;
        this.isMerging = true;
        this.offsetX = 0;
        this.offsetY = 0;
        this.amplitude = 0;
    }

    draw(g: PIXI.Graphics) {
        g.clear();
        if (this.animationValue !== 0 || this.isAnimating) {
            switch (this.animationValue) {
                case 2: g.beginFill(0xeee4da, 1); break;
                case 4: g.beginFill(0xeee0c6, 1); break;
                case 8: g.beginFill(0xf9b377, 1); break;
                case 16: g.beginFill(0xff9b60, 1); break;
                case 32: g.beginFill(0xcb6a49, 1); break;
                case 64: g.beginFill(0xec6233, 1); break;
                case 128: g.beginFill(0xe8c463, 1); break;
                case 256: g.beginFill(0xd6bb6b, 1); break;
                case 512: g.beginFill(0xf2c147, 1); break;
                case 1024: g.beginFill(0xf2c138, 1); break;
                case 2048: g.beginFill(0xf3bd29, 1); break;
                default: break;
            }
            g.drawRoundedRect(this.x * 100 + 35 + this.offsetX, this.y * 100 + 115 + this.offsetY, 90, 90, 10);
            g.endFill();
        }
    }

    drawText() {
        return [this.x * 100 + 80 + this.offsetX, this.y * 100 + 160 + this.offsetY,]
    }

    startAnimationCell() {
        this.isAnimating = true;
    }

    cellAnimation(delta: number, direction: TDirection, speed: number) {
        switch (direction) {
            case 'right':
                this.offsetX += speed * delta;
                if (this.offsetX > this.amplitude * 100) this.isAnimating = false;
                break;
            case 'left':
                this.offsetX -= speed * delta;
                if (this.offsetX < this.amplitude * -100) this.isAnimating = false;
                break;
            case 'down':
                this.offsetY += speed * delta;
                if (this.offsetY > this.amplitude * 100) this.isAnimating = false;
                break;
            case 'up':
                this.offsetY -= speed * delta;
                if (this.offsetY < this.amplitude * -100) this.isAnimating = false;
                break;
            default:
                break;
        }
    }
}