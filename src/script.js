/*--------------TELA INICIAL-----------------*/

const charSelect = document.createElement('div')
charSelect.id = 'selecaoPersonagem'
document.body.appendChild(charSelect)

const startScreen = document.createElement('div')
startScreen.id = 'tela-inicial'
document.body.appendChild(startScreen)

/*-------------PERSONAGENS-------------------*/

const mario_img = document.createElement('img')
mario_img.id = 'mario'
mario_img.classList.add('icones')
mario_img.src = './img/mario.png'
charSelect.appendChild(mario_img)

const luigi_img = document.createElement('img')
luigi_img.id = 'luigi'
luigi_img.classList.add('icones')
luigi_img.src = './img/luigi.png'
charSelect.appendChild(luigi_img)

const peach_img = document.createElement('img')
peach_img.id = 'peach'
peach_img.classList.add('icones')
peach_img.src = './img/peach.png'
charSelect.appendChild(peach_img)

const bowser_img = document.createElement('img')
bowser_img.id = 'bowser'
bowser_img.classList.add('icones')
bowser_img.src = './img/bowser.png'
charSelect.appendChild(bowser_img)

/*--------------SELECIONANDO-CHARACTER--------------*/

mario_img.addEventListener('click', select)
luigi_img.addEventListener('click', select)
peach_img.addEventListener('click', select)
bowser_img.addEventListener('click', select)


let selecionado = 0
let firstPlayer
let secondPlayer

function select(evt) {

    if (selecionado === 0) {
        if (evt.currentTarget.id === 'mario') {
            console.log('mario')
            selecionado++
            firstPlayer = mario_img.src

        } else if (evt.currentTarget.id === 'luigi') {
            console.log('luigi')
            selecionado++
            firstPlayer = luigi_img.src

        } else if (evt.currentTarget.id === 'peach') {
            console.log('peach')
            selecionado++
            firstPlayer = peach_img.src

        } else if (evt.currentTarget.id === 'bowser') {
            console.log('bowser')
            selecionado++
            firstPlayer = bowser_img.src
        }
        console.log(`Player: ${firstPlayer}`)

    } else if (selecionado === 1) {

        if (evt.currentTarget.id === 'mario' && evt.currentTarget.src !== firstPlayer) {
            console.log('mario')
            selecionado++
            secondPlayer = mario_img.src
            console.log(evt.currentTarget.src)

        } else if (evt.currentTarget.id === 'luigi' && evt.currentTarget.src !== firstPlayer) {
            console.log('luigi')
            selecionado++
            secondPlayer = luigi_img.src

        } else if (evt.currentTarget.id === 'peach' && evt.currentTarget.src !== firstPlayer) {
            console.log('peach')
            selecionado++
            secondPlayer = peach_img.src

        } else if (evt.currentTarget.id === 'bowser' && evt.currentTarget.src !== firstPlayer) {
            console.log('bowser')
            selecionado++
            secondPlayer = bowser_img.src

        }
        console.log(`Player: ${secondPlayer}`)

    } if (selecionado === 2) {
        charSelect.style.display = 'none'

        const playButton = document.createElement('button')
        playButton.id = 'btn-start'
        playButton.innerText = 'START'
        startScreen.appendChild(playButton)

        /*-----------------START-CLICK------------------*/

        playButton.addEventListener('click', function () {
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
                            let firstPlayerImage = document.createElement('img')
                            firstPlayerImage.src = `${firstPlayer}`
                            firstPlayerImage.classList.add('bolaPreta')
                            celula.appendChild(firstPlayerImage)

                            victory(celula.id)

                            break;
                        }else {


                        if (celula.childElementCount === 0) {
                            let secondPlayerImage = document.createElement('img')
                            secondPlayerImage.src = `${secondPlayer}`
                            secondPlayerImage.classList.add('bolaAzul')
                            celula.appendChild(secondPlayerImage)

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
        function checkVictory(id) {
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

        function victory(id) {
            const show = document.getElementById('dialog')

            if (checkVictory(id) === true) {
                const vitoria = document.createElement('p')
                let winner = document.getElementById(id).firstElementChild.className

                vitoria.innerText = `O vencedor é ${winner}`

                show.appendChild(vitoria)

                // encerrar o game
            } else {
                count += 1
                // console.log(count)

                if (count >= 42) {
                    const empate = document.createElement('p')
                    empate.innerText = 'Empatou'
                    show.appendChild(empate)
                }
            }
        }
    }
}

