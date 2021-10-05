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

const checkVictory = (id) =>
{
    const cell = document.getElementById(id)
    const check = cell.firstElementChild.id
    const coord = id.split('-')

    // vertical
    let count = 0
    let xy = [...coord]
    while (xy[1] > 0) {
        if (document.getElementById(`${xy[0]}-${xy[1]}`) === check) { count++ }
        else { break }
        xy[1]--
    }
    if (count >= 4) return true

    // horizontal
    count = 0
    xy = [...coord]
    while (xy[0] > 0) {
        if (document.getElementById(`${xy[0]}-${xy[1]}`) === check) { count++ }
        else { break }
        xy[0]--
    }
    xy = [...coord]
    while (xy[0] < 8) {
        if (document.getElementById(`${xy[0]}-${xy[1]}`) === check) { count++ }
        else { break }
        xy[0]++
    }
    if (count >= 4) return true

    // diagonal direita
    count = 0
    xy = [...coord]
    while (xy[0] > 0 || xy[1] > 0) {
        if (document.getElementById(`${xy[0]}-${xy[1]}`) === check) { count++ }
        else { break }
        xy[0]--
        xy[1]--
    }
    xy = [...coord]
    while (xy[0] < 7 || xy[1] < 6) {
        if (document.getElementById(`${xy[0]}-${xy[1]}`) === check) { count++ }
        else { break }
        xy[0]++
        xy[1]++
    }
    if (count >= 4) return true

    // diagonal esquerda
    count = 0
    xy = [...coord]
    while (xy[0] > 0 || xy[1] < 6) {
        if (document.getElementById(`${xy[0]}-${xy[1]}`) === check) { count++ }
        else { break }
        xy[0]--
        xy[1]++
    }
    xy = [...coord]
    while (xy[0] < 7 || xy[1] > 0) {
        if (document.getElementById(`${xy[0]}-${xy[1]}`) === check) { count++ }
        else { break }
        xy[0]++
        xy[1]--
    }
    if (count >= 4) return true

    return false
}