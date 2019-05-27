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
    return shapeNames[idx]
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
    create: (type = "Random", x = 0, y = 0, rotations = 0) => {
        if(type == "Random")
            blockType = getRandShape()
        else {
            blockType = type
        }
         let pieceData = {
            position: {x, y},
            rotation: rotations,
            shape: Shapes[blockType],
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


            if(ManagePieces.checkAnyCollide(pieceData)) {
                console.log("GAME OVER")
                clearInterval(gameLoop)
            }         

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

            if(proposedPositionY >= board.size.height) {
                moveable = false
            }

            board.placedPieces.forEach(placed => {
                placed.blocks.forEach(placedBlock => {

                    block1X = parseInt(block.dataset.x) + piece.position.x
                    block1Y = proposedPositionY

                    block2X = parseInt(placedBlock.dataset.x) + placed.position.x
                    block2Y = parseInt(placedBlock.dataset.y) + placed.position.y



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
        board.activePiece = ManagePieces.create()
    },




    redrawPiece: (piece) => {
        piece.elem.style.left = (`calc(${piece.position.x} * var(--b))`)
        piece.elem.style.top = (`calc(${piece.position.y} * var(--b))`)
    },




    checkPiecesCollide: (piece1, piece2, offset = {x: 0, y: 0}) => {
        let collision = false


        const p1 = {x: piece1.position.x + offset.x, y: piece1.position.y + offset.y}
        const p2 = {x: piece2.position.x, y: piece2.position.y}

        piece1.blocks.forEach(block => {

            block1 = {x: p1.x + parseInt(block.dataset.x), y: p1.y + parseInt(block.dataset.y)}

            piece2.blocks.forEach(p2Block => {
                block2 = {x: p2.x + parseInt(p2Block.dataset.x), y: p2.y + parseInt(p2Block.dataset.y)}
                if(block1.x == block2.x && block1.y == block2.y) {
                    collision = true
                }
            })

        })
        return collision
    },

    checkAnyCollide: (piece, offset = {x: 0, y: 0}) => {
        let collision = false

        // Check outside board
        piece.blocks.forEach(block => {
            block1 = {x: piece.position.x + offset.x + parseInt(block.dataset.x), y: piece.position.y + offset.y + parseInt(block.dataset.y)}
            if(block1.x < 0 || block1.x >= board.size.width)
                collision = true
            if(block1.y < 0 || block1.y >= board.size.height)
                collision = true
        })

        board.placedPieces.forEach(placed => {
            if(ManagePieces.checkPiecesCollide(piece, placed, offset))
            collision = true
        })

        return collision
    }



}
board.activePiece = ManagePieces.create()

let gameLoop = setInterval(() => {
    ManagePieces.movePiece(board.activePiece)
}, 300)


document.onkeydown = (keyEvent) => {
    console.log(keyEvent.keyCode)
    switch(keyEvent.keyCode) {
        case 39:
            // RIGHT
            if(ManagePieces.checkAnyCollide(board.activePiece, {x: 1, y: 0}))
            return false
            board.activePiece.position.x++
            ManagePieces.redrawPiece(board.activePiece)
            break
        case 37:
            // LEFT
            if(ManagePieces.checkAnyCollide(board.activePiece, {x: -1, y: 0}))
            return false
            board.activePiece.position.x--
            ManagePieces.redrawPiece(board.activePiece)
            break
        case 40:
            // DOWN
            if(ManagePieces.checkAnyCollide(board.activePiece, {x: 0, y: 1}))
            return false
            board.activePiece.position.y++
            ManagePieces.redrawPiece(board.activePiece)
            break
    }
}