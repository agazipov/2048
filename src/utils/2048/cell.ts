export class Cell {
    id: string;
    value: number;
    x: number;
    y: number;

    constructor(
        count: string,
        x: number,
        y: number,
    ) {
        this.id = count;
        this.value = 0;
        this.x = x;
        this.y = y;
    }
}