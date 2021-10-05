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
        column.addEventListener('click', selecionar)
    }

    
    const modal = document.createElement('section')
    modal.id = 'modal'
    body.appendChild(modal)

    
}



function selecionar (evt){

    
    if (evt.currentTarget === column0 || evt.currentTarget === column1 ||
        evt.currentTarget === column2 || evt.currentTarget === column3 ||
        evt.currentTarget === column4 || evt.currentTarget === column5 ||
        evt.currentTarget === column6){

        let columnId = evt.currentTarget.id
        let split = columnId.split('')
        let columnNumber = split[split.length-1]

        for(let i = 5; i>=0; i--){
            let celula = document.getElementById(`${columnNumber}-${i}`)
            if (celula.childElementCount === 0){
                let bolinha = document.createElement('div')
                bolinha.classList.add('bola')
                celula.appendChild(bolinha)
                break;
            }
        }
    }
}


createBoard()
