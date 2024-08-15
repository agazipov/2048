import { Cell } from "./cell";

export type TDirection = 'right' | 'left' | 'up' | 'down' | null;

export class Field {
    field: Cell[];
    rows: Cell[][];
    columns: Cell[][];
    animationActivated: boolean;
    direction: TDirection;

    constructor() {
        // this.field = mock;
        this.field = this.generateField();
        this.rows = this.splitIntoRows();
        this.columns = this.splitIntoColumns();
        this.animationActivated = false;
        this.direction = null;
    }

    private generateField(): Cell[] {
        const arr: Cell[] = [];
        let id = 0;
        for (let y = 0; y < 4; y++) {
            for (let x = 0; x < 4; x++) {
                id += 1;
                arr.push(new Cell(id.toString(), x, y));
            }
        }
        return this.addStartValues(arr);
    }

    private addStartValues(arr: Cell[]): Cell[] {
        let num1: number, num2: number;
        num1 = Math.floor(Math.random() * arr.length);
        do {
            num2 = Math.floor(Math.random() * arr.length);
        } while (num1 === num2);

        arr[num1].value = 2;
        arr[num2].value = 2;

        return arr;
    }

    private splitIntoRows(): Cell[][] {
        const rows: Cell[][] = [[], [], [], []];
        this.field.forEach(cell => rows[cell.y].push(cell));
        return rows;
    }

    private splitIntoColumns(): Cell[][] {
        const columns: Cell[][] = [[], [], [], []];
        this.field.forEach(cell => columns[cell.x].push(cell));
        return columns;
    }

    private shiftCells(arr: Cell[], direction: 'plus' | 'minus') {
        const isPlus = direction === 'plus';
        const start = isPlus ? 0 : arr.length - 1;
        const end = isPlus ? arr.length : -1;
        const step = isPlus ? 1 : -1;
    
        // Первый проход для объединения клеток
        for (let i = start; i !== end; i += step) {
            let next = i + step;
          
            if (!arr[next]) continue;
            
            if (arr[next].value === 0) {
                arr[next].value = arr[i].value;
                arr[i].value = 0;
            } else if (arr[i].value === arr[next].value) {
                arr[next].value *= 2;
                arr[i].value = 0;
            }
        }
        
        // Второй проход для сдвига клеток
        for (let i = start; i !== end; i += step) {
            let next = i + step;
            if (!arr[next]) continue;
    
            if (arr[next].value === 0) {
                arr[next].value = arr[i].value;
                arr[i].value = 0;
            }
        }

        // Третий проход для сдвига клеток (в случае когда 0 в начале строки)
        for (let i = start; i !== end; i += step) {
            let next = i + step;
            if (!arr[next]) continue;
    
            if (arr[next].value === 0) {
                arr[next].value = arr[i].value;
                arr[i].value = 0;
            }
        }
    }

    private addRandomValues() {
        const emptyCells = this.field.filter(cell => cell.value === 0);
        this.field.forEach(cell => cell.isActiv = false);
        if (emptyCells.length > 0) {
            const randomIndex = Math.floor(Math.random() * emptyCells.length);
            const randomValue = Math.random() < 0.9 ? 2 : 4; // 90% вероятность 2, 10% вероятность 4
            emptyCells[randomIndex].value = randomValue;
            emptyCells[randomIndex].isActiv = true;
        }
    }

    handleDirection(): Cell[] {
        switch (this.direction) {
            case 'right':
                this.rows.forEach(row => this.shiftCells(row, 'plus'));
                break;
            case 'left':
                this.rows.forEach(row => this.shiftCells(row, 'minus'));
                break;
            case 'down':
                this.columns.forEach(column => this.shiftCells(column, 'plus'));
                break;
            case 'up':
                this.columns.forEach(column => this.shiftCells(column, 'minus'));
                break;
            default:
                break;
        }
        this.addRandomValues();
        return this.field;
    }

    trigger(direction: TDirection) {
        // нужен для запуска рендера usetick. работает как свич. при первом запуске активирует у клеток поле анимации
        this.direction = direction;     
        this.handleDirection();  
        // !this.animationActivated && this.field.forEach(cell => cell.value !== 0 && cell.startAnimation());
        // this.animationActivated = !this.animationActivated;
    }

    animation(delta: number) {
        console.log('animation tick');
        // вызываем анимацию для клеток
        this.field.forEach(cell => cell.isAnimating && cell.cellAnimation(delta, this.direction));
        // проверяем когда все клетки завершат анимацию
        this.field.every(cell => !cell.isAnimating) && this.trigger(this.direction);
        // после завершения анимации вызываем логику
        if (!this.animationActivated) {
            this.handleDirection();
        }
    }
}