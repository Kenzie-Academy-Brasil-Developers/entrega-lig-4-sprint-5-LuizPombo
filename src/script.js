const boardArray = []

const createBoard = () => {
    const body = document.querySelector('body')
    const board = document.createElement('section')
    board.id = 'board'
    body.appendChild(board)

    for (i = 0; i < 7; i++) {
        const column = document.createElement('div')
        column.className = 'columns'
        column.id = `column${i}`
        column.style.width = `${100 / 7}%`
        board.appendChild(column)
        boardArray[i] = []

        for (j = 5; j >= 0; j--) {
            const div = document.createElement('div')
            div.className = 'cells'
            div.id = `${i}-${j}`
            div.style.height = `${100 / 6}%`
            column.appendChild(div)
            boardArray[i][j] = ''
        }
    }

    const modal = document.createElement('section')
    modal.id = 'modal'
    body.appendChild(modal)
}

createBoard()
