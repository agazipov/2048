import { Cell } from "./cell";

export type TDirection = 'right' | 'left' | 'up' | 'down' | null;

// Выбранная мной система хранения данных, в которой при смещении меняется не порядок в массиве, а значение клетки
// оказлась не так проста при реализации анимации. Кажется, что испольование многомерного массива для хранения 
// клеток поля и сортировка при сдвиге были-бы более просты в реализации анимации.
export class Field {
    field: Cell[];
    rows: Cell[][];
    columns: Cell[][];
    animationActivated: boolean; // триггер для запуска requestAnimationFrame или аналога 
    direction: TDirection; // указатель направления сдвига
    speed: number = 7; // скорость смещения клеток
    isMove: number; // флаг, указывающий на невозможность сделать ход в указаном напрвлении. проверка осуществляется для 4-х колонок или столбцов и если равна 4, то отменяет анмацию и генерацию нового поля.
    score: number;

    constructor() {
        this.field = this.generateField();
        this.rows = this.splitIntoRows();
        this.columns = this.splitIntoColumns();
        this.animationActivated = false;
        this.direction = null;
        this.isMove = 0;
        this.score = 0;
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

        // arr[num1].value = 2;
        // arr[num1].animationValue = 2;
        // arr[num2].value = 8;
        // arr[num2].animationValue = 8;
        arr[0].value = 2;
        arr[0].animationValue = 2;
        arr[1].value = 8;
        arr[1].animationValue = 8;
        arr[2].value = 4;
        arr[2].animationValue = 4;
        arr[3].value = 4;
        arr[3].animationValue = 4;

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
        if (emptyCells.length > 0) {
            const randomIndex = Math.floor(Math.random() * emptyCells.length);
            const randomValue = Math.random() < 0.9 ? 2 : 4; // 90% вероятность 2, 10% вероятность 4
            emptyCells[randomIndex].value = randomValue;
        }
    }

    handleDirection(direction: TDirection) {
        if (this.field.every(cell => cell.value !== 0)) console.log('все пол заполнены');
        this.isMove = 0;
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

        if (this.score === 2048) {
            this.startAnimationField();
            this.isWinner();
            return;
        }
        if (this.isMove !== 4) {
            this.startAnimationField();
            this.addRandomValues();
        }
    }


    private shiftLogic(arr: Cell[], direction: TDirection) {
        const isPlus = direction === 'right' || direction === 'down';
        const start = isPlus ? 0 : arr.length - 1;
        const end = isPlus ? arr.length : -1;
        const step = isPlus ? 1 : -1;

        // Три цикла для обхода значений для поля из 4х клеток
        let isChangeCell = true; // указатель на существование клетки для изменения
        const arrayOfСhangingСells: Cell[] = []; // массив ссылок на клетки, которые изменяются при сдвиге
        let indexOfCellCanged = 0; // индекс клетки к которой применяется изменение
        let amplitudeOfChange = 0; // амплитуда изменения координаты клетки
        // Первый проход для сдвига и объединения клеток
        for (let i = start; i !== end; i += step) {
            let next = i + step;

            if (!arr[next] || arr[i].value === 0) continue;

            if (arr[next].value === 0) {
                arr[next].value = arr[i].value;
                arr[i].value = 0;
                if (isChangeCell) {
                    isChangeCell = false;
                    indexOfCellCanged = arrayOfСhangingСells.push(arr[i]) - 1;
                }
                if (arrayOfСhangingСells[indexOfCellCanged]) {
                    arrayOfСhangingСells[indexOfCellCanged].amplitude = ++amplitudeOfChange;
                }
            } else if (arr[i].value === arr[next].value && arr[i].isMerging) {
                arr[next].value *= 2;
                arr[next].animationValue = 0; // !удалем отображение клетки при объединении
                this.score += arr[next].value;
                arr[i].value = 0;
                if (isChangeCell) {
                    isChangeCell = false;
                    indexOfCellCanged = arrayOfСhangingСells.push(arr[i]) - 1;
                }
                if (arrayOfСhangingСells[indexOfCellCanged]) {
                    arrayOfСhangingСells[indexOfCellCanged].amplitude = ++amplitudeOfChange;
                }
                arr[next].isMerging = false; // объеденяем только раз за ход
            } else {
                // вышедший из итрецаии перемещения объект из-за различных значений с соседним
                isChangeCell = true;
                amplitudeOfChange = 0;
            }
        }
        if (indexOfCellCanged < 2) { // при добавлении в первой итерации менее двух изменяемых клеток
            isChangeCell = true;
            amplitudeOfChange = 0;
        }
        indexOfCellCanged = 0;

        // Второй проход для сдвига клеток
        for (let i = start; i !== end; i += step) {
            let next = i + step;
            if (!arr[next] || arr[i].value === 0) continue;

            if (arr[next].value === 0) {
                arr[next].value = arr[i].value;
                arr[i].value = 0;
                if (isChangeCell) {
                    isChangeCell = false;
                    indexOfCellCanged = arrayOfСhangingСells.push(arr[i]) - 1;
                }
                if (arrayOfСhangingСells[indexOfCellCanged]) {
                    arrayOfСhangingСells[indexOfCellCanged].amplitude = ++amplitudeOfChange;
                }
            } else {
                isChangeCell = true;
                ++indexOfCellCanged;
                amplitudeOfChange = 0;
            }
        }
        indexOfCellCanged = 0;

        // Третий проход для сдвига клеток
        for (let i = start; i !== end; i += step) {
            let next = i + step;
            if (!arr[next] || arr[i].value === 0) continue;

            if (arr[next].value === 0) {
                arr[next].value = arr[i].value;
                arr[i].value = 0;
                if (isChangeCell) {
                    isChangeCell = false;
                    indexOfCellCanged = arrayOfСhangingСells.push(arr[i]) - 1;
                }
                if (arrayOfСhangingСells[indexOfCellCanged]) {
                    arrayOfСhangingСells[indexOfCellCanged].amplitude = ++amplitudeOfChange;
                }
            } else {
                isChangeCell = true;
                ++indexOfCellCanged;
                amplitudeOfChange = 0;
            }
        }
        arrayOfСhangingСells.forEach(cell => cell.isAnimating = true); // анимируются только измененные клетки     
        arrayOfСhangingСells.length === 0 && ++this.isMove; // добавляем 1 к счетку возможности хода
    }

    private startAnimationField() {
        // нужен для запуска рендера usetick. при запуске активирует у клеток анимацию
        if (this.animationActivated) return;
        this.animationActivated = true;
    }

    animation(delta: number) {
        // вызываем анимацию для клеток
        // !здесь массив с клетками для анимации (в котором должны содержаться данные о предстоящем изменении)
        this.field.forEach(cell => cell.isAnimating && cell.cellAnimation(delta, this.direction, this.speed));
        // проверяем когда все клетки завершат анимацию
        if (this.field.every(cell => !cell.isAnimating)) {
            // возвращает клетки в дефолтное значение
            this.animationActivated = false;
            this.field.forEach(cell => {
                cell.offsetX = 0;
                cell.offsetY = 0;
                cell.animationValue = cell.value
                cell.isMerging = true;
            });
        }
    }

    private async isWinner() {
        let promise = new Promise((resolve) => {
            setTimeout(() => resolve("Уровень пройден"), 1000)
        });
        let result = await promise;

        alert(result);
        this.refreshGame();
    }

    private refreshGame() {
        this.field = this.generateField();
        this.rows = this.splitIntoRows();
        this.columns = this.splitIntoColumns();
        this.animationActivated = false;
        this.direction = null;
        this.isMove = 0;
        this.score = 0;
        this.startAnimationField(); // тик для отрисовки нового поля
    }
}