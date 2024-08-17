import { Cell } from "./cell";

export type TDirection = 'right' | 'left' | 'up' | 'down' | null;

export class Field {
    field: Cell[];
    rows: Cell[][];
    columns: Cell[][];
    animationActivated: boolean;
    direction: TDirection;
    speed: number = 3;

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

        arr[0].value = 2;
        arr[1].value = 2;

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

    private addRandomValues() {
        const emptyCells = this.field.filter(cell => cell.value === 0);
        this.field.forEach(cell => cell.isNewCell = false);
        if (emptyCells.length > 0) {
            const randomIndex = Math.floor(Math.random() * emptyCells.length);
            const randomValue = Math.random() < 0.9 ? 2 : 4; // 90% вероятность 2, 10% вероятность 4
            emptyCells[randomIndex].value = randomValue;
            emptyCells[randomIndex].isNewCell = true;
        }
    }

    handleDirection(direction: TDirection) {
        this.direction = direction;
        switch (this.direction) {
            case 'right':
                this.rows.forEach(row => this.shiftLogic(row, this.direction));
                break;
            case 'left':
                this.rows.forEach(row => this.shiftLogic(row, this.direction));
                break;
            case 'down':
                this.columns.forEach(column => this.shiftLogic(column, this.direction));
                break;
            case 'up':
                this.columns.forEach(column => this.shiftLogic(column, this.direction));
                break;
            default:
                break;
        }
        this.startAnimationField();
        // this.addRandomValues();
    }


    private shiftLogic(arr: Cell[], direction: TDirection) {       
        const isPlus = direction === 'right' || direction === 'down';
        const start = isPlus ? 0 : arr.length - 1;
        const end = isPlus ? arr.length : -1;
        const step = isPlus ? 1 : -1;

        // Три цикла для обхода значений для поля из 4х клеток
        // Первый проход для объединения клеток
        // Объеденям клетки только на перввой итерации согласно логики игры
        for (let i = start; i !== end; i += step) {
            let next = i + step;

            if (!arr[next] || arr[i].value === 0) continue;

            if (arr[next].value === 0) {
                arr[next].value = arr[i].value;
                arr[i].value = 0;
                arr[i].amplitudeX = arr[next].x;
                arr[i].amplitudeY = arr[next].y;
                arr[i].isAnimating = true;
                console.log(`клетка ${arr[i].id} сместилась ${direction} с позиции ${arr[i].x} ${arr[i].y} на позицию ${arr[next].x} ${arr[next].y}`);
            } else if (arr[i].value === arr[next].value) {
                arr[next].value *= 2;
                arr[i].value = 0;
                arr[i].amplitudeX = arr[next].x;
                arr[i].amplitudeY = arr[next].y;
                arr[i].isAnimating = true;
                console.log(`клетка ${arr[i].id} слилась`);
            }
        }

        // Второй проход для сдвига клеток
        for (let i = start; i !== end; i += step) {
            let next = i + step;
            if (!arr[next] || arr[i].value === 0) continue;

            if (arr[next].value === 0) {
                arr[next].value = arr[i].value;
                arr[i].value = 0;
                arr[i].amplitudeX = arr[next].x;
                arr[i].amplitudeY = arr[next].y;
                arr[i].isAnimating = true;
                console.log(`клетка ${arr[i].id} сместилась  ${direction}`);
            }
        }

        // Третий проход для сдвига клеток (когда в ряду 3 разных значения)
        for (let i = start; i !== end; i += step) {
            let next = i + step;
            if (!arr[next] || arr[i].value === 0) continue;

            if (arr[next].value === 0) {
                arr[next].value = arr[i].value;
                arr[i].value = 0;
                arr[i].amplitudeX = arr[next].x;
                arr[i].amplitudeY = arr[next].y;
                arr[i].isAnimating = true;
                console.log(`клетка ${arr[i].id} сместилась  ${direction}`);
            }
        }
    }


    startAnimationField() {
        // нужен для запуска рендера usetick. при запуске активирует у клеток анимацию
        if (this.animationActivated) return;
        // this.direction = direction;
        // !this.animationActivated && this.field.forEach(cell => cell.value !== 0 && cell.startAnimationCell());
        this.animationActivated = true;
    }

    animation(delta: number) {
        console.log('tick');
        
        // вызываем анимацию для клеток
        // !здесь массив с клетками для анимации (в котором должны содераться данные о предстоящем изменении)
        this.field.forEach(cell => cell.isAnimating && cell.cellAnimation(delta, this.direction, this.speed));
        // проверяем когда все клетки завершат анимацию
        if (this.field.every(cell => !cell.isAnimating)) {
            this.animationActivated = false;
            // возвращает клетки в дефолтное значение
            this.field.forEach(cell => { cell.offsetX = 0; cell.offsetY = 0 });
        }
    }
}