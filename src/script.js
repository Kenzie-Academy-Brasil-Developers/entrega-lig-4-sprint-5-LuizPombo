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
    document.getElementById('music').play()
    
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


        const dialog = document.createElement('section')
        dialog.id = 'dialog'
        body.appendChild(dialog)
    }

    /*------------------JOGABILIDADE-------------------*/

    let alteraCor = true

    function selecionar(evt) {

        let columnId = evt.currentTarget.id
        let posit = columnId.split('')
        let columnNumber = posit[posit.length - 1]

        
        for (let i = 0; i <= 5; i++) {
            let celula = document.getElementById(`${columnNumber}-${i}`)


            if (alteraCor === true) {

                if (celula.childElementCount === 0) {
                    let bolinha = document.createElement('div')
                    bolinha.classList.add('bolaPreta')
                    celula.appendChild(bolinha)
                    victory(celula.id)

                    break;
                }

            } else {

                if (celula.childElementCount === 0) {
                    let blueBall = document.createElement('div')
                    blueBall.classList.add('bolaAzul')
                    celula.appendChild(blueBall)
                    victory(celula.id)

                    break;
                } 
            } 
        }
        alteraCor = !alteraCor 
    }

    createBoard()
})


/*------------------------WIN-CONDITION--------------------*/


// const checkVictory = (id) =>
function checkVictory(id)
{
    const check = document.getElementById(id).firstElementChild.className
    const coord = id.split('-')

    // vertical
    let count = 0
    let xy = [...coord]
    let cell = String
    while (xy[1] >= 0) {
        cell = document.getElementById(`${xy[0]}-${xy[1]}`)
        if (cell.childElementCount > 0 && cell.firstElementChild.className === check) { count++ }
        else { break }
        xy[1]--
    }
    if (count >= 4) return true

    // horizontal
    count = 0
    xy = [...coord]
    while (xy[0] >= 0) {
        cell = document.getElementById(`${xy[0]}-${xy[1]}`)
        if (cell.childElementCount > 0 && cell.firstElementChild.className === check) { count++ }
        else { break }
        xy[0]--
    }
    xy = [...coord]
    while (xy[0] < 7) {
        cell = document.getElementById(`${xy[0]}-${xy[1]}`)
        if (cell.childElementCount > 0 && cell.firstElementChild.className === check) { count++ }
        else { break }
        xy[0]++
    }
    if (count >= 5) return true

    // diagonal direita
    count = 0
    xy = [...coord]
    while (xy[0] >= 0 && xy[1] >= 0) {
        cell = document.getElementById(`${xy[0]}-${xy[1]}`)
        if (cell.childElementCount > 0 && cell.firstElementChild.className === check) { count++ }
        else { break }
        xy[0]--
        xy[1]--
    }
    xy = [...coord]
    while (xy[0] < 7 && xy[1] < 6) {
        cell = document.getElementById(`${xy[0]}-${xy[1]}`)
        if (cell.childElementCount > 0 && cell.firstElementChild.className === check) { count++ }
        else { break }
        xy[0]++
        xy[1]++
    }
    if (count >= 5) return true

    // diagonal esquerda
    count = 0
    xy = [...coord]
    while (xy[0] >= 0 && xy[1] < 6) {
        cell = document.getElementById(`${xy[0]}-${xy[1]}`)
        if (cell.childElementCount > 0 && cell.firstElementChild.className === check) { count++ }
        else { break }
        xy[0]--
        xy[1]++
    }
    xy = [...coord]
    while (xy[0] < 7 && xy[1] >= 0) {
        cell = document.getElementById(`${xy[0]}-${xy[1]}`)
        if (cell.childElementCount > 0 && cell.firstElementChild.className === check) { count++ }
        else { break }
        xy[0]++
        xy[1]--
    }
    if (count >= 5) return true

    return false
}

/*------------DEMONSTRANDO-VITORIA-EMPATE-------------------*/

let count = 0

function victory (id){
    const show = document.getElementById('dialog')

    if  (checkVictory(id) === true) {
        document.getElementById('music').pause()
        document.getElementById('win').play()

        const vitoria = document.createElement('p')
        let winner = document.getElementById(id).firstElementChild.className
        
        vitoria.innerText = `O vencedor é ${winner}`
        
        show.appendChild(vitoria)

        // encerrar o game
    } else { 
        count += 1
        
        if ( count >= 42){
            document.getElementById('music').pause()
            document.getElementById('draw').play()

            const empate = document.createElement('p')
            empate.innerText = 'Empatou'
            show.appendChild(empate)
        }
    }

}

