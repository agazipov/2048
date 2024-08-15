import { Cell } from "./cell";

interface IMock {
    id: string,
    value: number,
    x: number,
    y: number,

    isActiv: boolean,
    isAnimating: boolean,

    offsetX: number,
    offsetY: number,
    speed: number,
}

const mock: IMock[] = [
    {
        speed: 7,
        id: "1",
        value: 4,
        x: 0,
        y: 0,
        isActiv: false,
        isAnimating: false,
        offsetX: 0,
        offsetY: 0
    },
    {
        speed: 7,
        id: "2",
        value: 2,
        x: 1,
        y: 0,
        isActiv: false,
        isAnimating: false,
        offsetX: 0,
        offsetY: 0
    },
    {
        speed: 7,
        id: "3",
        value:4,
        x: 2,
        y: 0,
        isActiv: false,
        isAnimating: false,
        offsetX: 0,
        offsetY: 0
    },
    {
        speed: 7,
        id: "4",
        value: 0,
        x: 3,
        y: 0,
        isActiv: false,
        isAnimating: false,
        offsetX: 0,
        offsetY: 0
    },
    {
        speed: 7,
        id: "5",
        value: 0,
        x: 0,
        y: 1,
        isActiv: false,
        isAnimating: false,
        offsetX: 0,
        offsetY: 0
    },
    {
        speed: 7,
        id: "6",
        value: 0,
        x: 1,
        y: 1,
        isActiv: false,
        isAnimating: false,
        offsetX: 0,
        offsetY: 0
    },
    {
        speed: 7,
        id: "7",
        value: 0,
        x: 2,
        y: 1,
        isActiv: false,
        isAnimating: false,
        offsetX: 0,
        offsetY: 0
    },
    {
        speed: 7,
        id: "8",
        value: 0,
        x: 3,
        y: 1,
        isActiv: false,
        isAnimating: false,
        offsetX: 0,
        offsetY: 0
    },
    {
        speed: 7,
        id: "9",
        value: 0,
        x: 0,
        y: 2,
        isActiv: false,
        isAnimating: false,
        offsetX: 0,
        offsetY: 0
    },
    {
        speed: 7,
        id: "10",
        value: 0,
        x: 1,
        y: 2,
        isActiv: false,
        isAnimating: false,
        offsetX: 0,
        offsetY: 0
    },
    {
        speed: 7,
        id: "11",
        value: 0,
        x: 2,
        y: 2,
        isActiv: false,
        isAnimating: false,
        offsetX: 0,
        offsetY: 0
    },
    {
        speed: 7,
        id: "12",
        value: 0,
        x: 3,
        y: 2,
        isActiv: false,
        isAnimating: false,
        offsetX: 0,
        offsetY: 0
    },
    {
        speed: 7,
        id: "13",
        value: 0,
        x: 0,
        y: 3,
        isActiv: false,
        isAnimating: false,
        offsetX: 0,
        offsetY: 0
    },
    {
        speed: 7,
        id: "14",
        value: 0,
        x: 1,
        y: 3,
        isActiv: false,
        isAnimating: false,
        offsetX: 0,
        offsetY: 0
    },
    {
        speed: 7,
        id: "15",
        value: 0,
        x: 2,
        y: 3,
        isActiv: false,
        isAnimating: false,
        offsetX: 0,
        offsetY: 0
    },
    {
        speed: 7,
        id: "16",
        value: 0,
        x: 3,
        y: 3,
        isActiv: false,
        isAnimating: false,
        offsetX: 0,
        offsetY: 0
    }
]

export const arrMock = mock.map(mock => {
    const cellInstance = new Cell(mock.id, mock.x, mock.y);
    Object.assign(cellInstance, mock);
    return cellInstance;
});