export class appResponseSchema {
    message?: string;
    board?: number[][];
}

export class appRequestSchema {
        rowIndex: number;
        columnIndex: number;
        value: number;
        boardSize: number;
    };