/*--------------TELA INICIAL-----------------*/

const startScreen = document.createElement('div')
startScreen.id = 'tela-inicial'
document.body.appendChild(startScreen)

const playButton = document.getElementById('btn-start')
startScreen.appendChild(playButton)

/*-----------------START-CLICK------------------*/

playButton.addEventListener('click', function(){
    playButton.style.display = 'none'

    /*------------------CRIANDO-QUADRO------------------*/

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

    /*------------------JOGABILIDADE-------------------*/

    let alteraCor = true

    function selecionar(evt) {

        let columnId = evt.currentTarget.id
        let posit = columnId.split('')
        let columnNumber = posit[posit.length - 1]

        
        for (let i = 5; i >= 0; i--) {
            let celula = document.getElementById(`${columnNumber}-${i}`)


            if (alteraCor === true) {

                if (celula.childElementCount === 0) {
                    let bolinha = document.createElement('div')
                    bolinha.classList.add('bola')
                    celula.appendChild(bolinha)
                    break;
                }

            } else {

                if (celula.childElementCount === 0) {
                    let blueBall = document.createElement('div')
                    blueBall.classList.add('bolaAzul')
                    celula.appendChild(blueBall)
                    break;
                } 
            } 
        }
        alteraCor = !alteraCor
        
    }

    createBoard()
})


/*------------------------WIN-CONDITION--------------------*/


createBoard()

const checkVictory = (id) =>
{
    const cell = document.getElementById(id)
    const check = cell.firstElementChild.className
    const coord = id.split('-')

    // vertical
    let count = 0
    let xy = [...coord]
    while (xy[1] >= 0) {
        if (document.getElementById(`${xy[0]}-${xy[1]}`).firstElemendChild.className === check) { count++ }
        else { break }
        xy[1]--
    }
    if (count >= 4) return true

    // horizontal
    count = 0
    xy = [...coord]
    while (xy[0] >= 0) {
        if (document.getElementById(`${xy[0]}-${xy[1]}`).firstElemendChild.className === check) { count++ }
        else { break }
        xy[0]--
    }
    xy = [...coord]
    while (xy[0] < 8) {
        if (document.getElementById(`${xy[0]}-${xy[1]}`).firstElemendChild.className === check) { count++ }
        else { break }
        xy[0]++
    }
    if (count >= 4) return true

    // diagonal direita
    count = 0
    xy = [...coord]
    while (xy[0] >= 0 && xy[1] >= 0) {
        if (document.getElementById(`${xy[0]}-${xy[1]}`).firstElemendChild.className === check) { count++ }
        else { break }
        xy[0]--
        xy[1]--
    }
    xy = [...coord]
    while (xy[0] < 7 && xy[1] < 6) {
        if (document.getElementById(`${xy[0]}-${xy[1]}`).firstElemendChild.className === check) { count++ }
        else { break }
        xy[0]++
        xy[1]++
    }
    if (count >= 4) return true

    // diagonal esquerda
    count = 0
    xy = [...coord]
    while (xy[0] >= 0 && xy[1] < 6) {
        if (document.getElementById(`${xy[0]}-${xy[1]}`).firstElemendChild.className === check) { count++ }
        else { break }
        xy[0]--
        xy[1]++
    }
    xy = [...coord]
    while (xy[0] < 7 && xy[1] >= 0) {
        if (document.getElementById(`${xy[0]}-${xy[1]}`).firstElemendChild.className === check) { count++ }
        else { break }
        xy[0]++
        xy[1]--
    }
    if (count >= 4) return true

    return false
}