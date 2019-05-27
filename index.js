let board = {
    size: {
        width: 10,
        height: 30
    },
    pieces:[],
    activePiece: {},
    nextPiece: {}
}



const Shapes = {
    Square: {
        blocks: [
            { x: 0, y: 0},
            { x: 1, y: 0},
            { x: 0, y: 1},
            { x: 1, y: 1}
        ],
        center: { x: 1, y: 1}
    },
    Z: {
        blocks: [
            { x: 0, y: 0},
            { x: 1, y: 0},
            { x: 1, y: 1},
            { x: 2, y: 1}
        ],
        center: { x: 1, y: 1}
    },
    BackZ: {
        blocks: [
            { x: 1, y: 0},
            { x: 2, y: 0},
            { x: 0, y: 1},
            { x: 1, y: 1}
        ],
        center: { x: 1, y: 1}
    },
    L: {
        blocks: [
            { x: 0, y: 0},
            { x: 0, y: 1},
            { x: 0, y: 2},
            { x: 0, y: 3},
            { x: 1, y: 3}
        ],
        center: { x: 1, y: 2}
    },
    BackL: {
        blocks: [
            { x: 1, y: 0},
            { x: 1, y: 1},
            { x: 1, y: 2},
            { x: 1, y: 3},
            { x: 0, y: 3}
        ],
        center: { x: 1, y: 2}
    },
    /*
    Line: {

    }, 
    T: {

    }
    */
}
    



