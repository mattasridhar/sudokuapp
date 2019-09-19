export class appResponseSchema {
    message?: string;
    board?: number[][];
}

export class appRequestSchema {
    selectedCellInfo?: {
        row: number,
        column: number,
        value: number,
        boardSize: number
    };
}