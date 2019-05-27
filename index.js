let board = {
    size: {
        width: 10,
        height: 10
    },
    placedPieces:[],
    activePiece: {},
    nextPiece: {},
    baseSize: "30px"
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
    

const shapeNames = Object.keys(Shapes)
const getRandShape = () => {
    const idx = Math.ceil(Math.random() * shapeNames.length) - 1
    return Shapes[shapeNames[idx]]
}


const updateVars = () => {
    document.documentElement.style.setProperty('--b', board.baseSize);
    document.documentElement.style.setProperty('--boardW', board.size.width);
    document.documentElement.style.setProperty('--boardH', board.size.height);
}

updateVars();


const Elems = {
    App: document.querySelector("#app"),
    Board: document.querySelector("#board"),
    Pieces: document.querySelector("#pieces")
}




const ManagePieces = {
    create: (type = "Z", x = 0, y = 0, rotations = 0) => {
         let pieceData = {
            position: {x, y},
            rotation: rotations,
            shape: Shapes[type],
            elem: document.createElement("DIV"),
            blocks: []
         }
         pieceData.elem.classList.add("piece")

         pieceData.shape.blocks.forEach(block => {
             let el = ManagePieces._createBlock(block.x, block.y)
             pieceData.blocks.push(el)
             pieceData.elem.appendChild(el)
         });

         ManagePieces.redrawPiece(pieceData)

         Elems.Board.appendChild(pieceData.elem)
         return pieceData
    },
    _createBlock: (x = 0, y = 0) => {
        let el = document.createElement("DIV")
        el.classList.add("block")
        el.style.left = (`calc(${x} * var(--b))`)
        el.style.top = (`calc(${y} * var(--b))`)
        el.dataset.x = x
        el.dataset.y = y
        return el
    },



    movePiece: (piece, direction = "down") => {
        console.log(piece)
        let moveable = true
        piece.blocks.forEach(block => {
            let proposedPositionY = piece.position.y + parseInt(block.dataset.y) + 1
            console.log(proposedPositionY)
            console.log("bH:" + board.size.height)

            if(proposedPositionY >= board.size.height) {
                moveable = false
            }

            board.placedPieces.forEach(placed => {
                placed.blocks.forEach(placedBlock => {

                    block1X = parseInt(block.dataset.x) + piece.position.x
                    block1Y = proposedPositionY

                    block2X = parseInt(placedBlock.dataset.x) + placed.position.x
                    block2Y = parseInt(placedBlock.dataset.y) + placed.position.y

                    console.log(`B1: ${block1X},${block1Y} | ${block2X},${block2Y}`)


                    if(block1X == block2X && block1Y == block2Y) {
                        moveable = false
                    }
                })
            })

        })

        if(moveable) {
            piece.position.y++
            ManagePieces.redrawPiece(piece)
        } else if(direction == "down") {
            ManagePieces.placePiece(piece)
        }
    },




    placePiece: (piece) => {
        board.placedPieces.push(piece)
        board.activePiece = ManagePieces.create("Z", c)
        c++
    },




    redrawPiece: (piece) => {
        piece.elem.style.left = (`calc(${piece.position.x} * var(--b))`)
        piece.elem.style.top = (`calc(${piece.position.y} * var(--b))`)
    }



}
var c = 0
board.activePiece = ManagePieces.create()

setInterval(() => {
    ManagePieces.movePiece(board.activePiece)
}, 100)