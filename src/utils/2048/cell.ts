import * as PIXI from 'pixi.js'
import { TDirection } from './field';

export class Cell {
    id: string;
    value: number;
    x: number;
    y: number;

    isActiv: boolean;
    isAnimating: boolean;

    offsetX: number;
    offsetY: number;
    speed: number = 7;

    constructor(
        count: string,
        x: number,
        y: number,
    ) {
        this.id = count;
        this.value = 0;
        this.x = x;
        this.y = y;
        this.isActiv = false;
        this.isAnimating = false;
        this.offsetX = 0;
        this.offsetY = 0;
    }

    draw(g: PIXI.Graphics) {
        g.clear();
        if (this.value !== 0 || this.isAnimating) {
            switch (this.value) {
                case 2:
                    g.beginFill(this.isActiv ? 'red' : 0xeee4da, 1);
                    break;
                case 4:
                    g.beginFill(this.isActiv ? 'red' : 0xeee0c6, 1);
                    break;
                case 8:
                    g.beginFill(this.isActiv ? 'red' : 0xf9b377, 1);
                    break;
                case 16:
                    g.beginFill(this.isActiv ? 'red' : 0xff9b60, 1);
                    break;
                case 32:
                    g.beginFill(this.isActiv ? 'red' : 0xcb6a49, 1);
                    break;
                case 64:
                    g.beginFill(this.isActiv ? 'red' : 0xec6233, 1);
                    break;
                case 128:
                    g.beginFill(this.isActiv ? 'red' : 0xe8c463, 1);
                    break;
                case 256:
                    g.beginFill(this.isActiv ? 'red' : 0xd6bb6b, 1);
                    break;
                case 512:
                    g.beginFill(this.isActiv ? 'red' : 0xf2c147, 1);
                    break;
                case 1024:
                    g.beginFill(this.isActiv ? 'red' : 0xf2c138, 1);
                    break;
                case 2048:
                    g.beginFill(this.isActiv ? 'red' : 0xf3bd29, 1);
                    break;
            
                default:
                    break;
            }
            g.drawRoundedRect(this.x * 100 + 5 + this.offsetX, this.y * 100 + 5 + this.offsetY, 90, 90, 10);
            g.endFill();
        }
    }

    drawText() {
        return [
            this.x * 100 + 50 + this.offsetX,
            this.y * 100 + 50 + this.offsetY,
        ]
    }

    startAnimation() {
        this.isAnimating = true;
    }

    cellAnimation(delta: number, direction: TDirection) {
        switch (direction) {
            case 'right':
                this.offsetX +=  this.speed * delta;
        
                if (this.offsetX > 400 - (this.x * 100 + 100)) {
                    this.offsetX = 0;
                    this.isAnimating = false;
                }
                break;
            case 'left':
                this.offsetX -=  this.speed * delta;               
        
                if (this.offsetX < -this.x * 100) {
                    this.offsetX = 0;
                    this.isAnimating = false;
                }
                break;
            case 'down':
                this.offsetY += this.speed * delta;
        
                if (this.offsetY > 400 - (this.y * 100 + 100) ) {
                    this.offsetY = 0;
                    this.isAnimating = false;
                }
                break;
            case 'up':
                this.offsetY -= this.speed * delta;
        
                if (this.offsetY < -this.y * 100) {
                    this.offsetY = 0;
                    this.isAnimating = false;
                }
                break;
            default:
                break;
        }
    }
}