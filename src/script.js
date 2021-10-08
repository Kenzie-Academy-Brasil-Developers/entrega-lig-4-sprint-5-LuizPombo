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
mario_img.src = './assets/img/mario.png'
charSelect.appendChild(mario_img)

const luigi_img = document.createElement('img')
luigi_img.id = 'luigi'
luigi_img.classList.add('icones')
luigi_img.src = './assets/img/luigi.png'
charSelect.appendChild(luigi_img)

const peach_img = document.createElement('img')
peach_img.id = 'peach'
peach_img.classList.add('icones')
peach_img.src = './assets/img/peach.png'
charSelect.appendChild(peach_img)

const bowser_img = document.createElement('img')
bowser_img.id = 'bowser'
bowser_img.classList.add('icones')
bowser_img.src = './assets/img/bowser.png'
charSelect.appendChild(bowser_img)

/*---------------GIFS-PERSONAGENS-----------------*/

const mario_gif = document.createElement('img')
mario_gif.id = 'gif_Mario'
mario_gif.classList.add('gifs')
mario_gif.src = './assets/gifs/mario.gif'

const luigi_gif = document.createElement('img')
luigi_gif.id = 'gif_luigi'
luigi_gif.classList.add('gifs')
luigi_gif.src = './assets/gifs/luigi.gif'

const peach_gif = document.createElement('img')
peach_gif.id = 'gif_peach'
peach_gif.classList.add('gifs')
peach_gif.src = './assets/gifs/peach.gif'

const bowser_gif = document.createElement('img')
bowser_gif.id = 'gif_bowser'
bowser_gif.classList.add('gifs')
bowser_gif.src = './assets/gifs/bowser.gif'

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
            console.log(mario_img)

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
            const createBoard = () => {
                document.getElementById("music").play()
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

                    for (j = 5; j >= 0; j--) {
                        const div = document.createElement('div')
                        div.className = 'cells'
                        div.id = `${i}-${j}`
                        div.style.height = `${100 / 6}%`
                        column.appendChild(div)
                    }
                    column.addEventListener('click', selecionar)
                }


                const dialog = document.createElement('section')
                dialog.id = 'dialog'
                dialog.innerText = 'Cada jogador deve colocar quatro de suas peças em fila, seja na horizontal, vertical ou diagonal, bloqueando seu adversário para que ele não consiga fazer o mesmo.'
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
                            
                            alteraCor = !alteraCor
                            
                            break;
                        }
                    }   else {


                        if (celula.childElementCount === 0) {
                            let secondPlayerImage = document.createElement('img')
                            secondPlayerImage.src = `${secondPlayer}`
                            secondPlayerImage.classList.add('bolaAzul')
                            celula.appendChild(secondPlayerImage)

                            victory(celula.id)
                            
                            alteraCor = !alteraCor
                            
                            break;
                        }
                    }
                }
                
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
            
            const endGame = document.createElement('div')
            endGame.id = 'endBox'

            if (checkVictory(id) === true) {
                const vitoria = document.createElement('p')
                vitoria.id = 'vitoria_txt'
                
                const vicShow = document.createElement('div')
                vicShow.id = 'vicBox'

                let winClass = document.getElementById(id).firstElementChild.className
                
                let winner = document.createElement('img')
                winner.id = 'winner_img'

                if (winClass === 'bolaPreta'){
                    const dialog = document.getElementById('dialog')
                    dialog.innerHTML = ''
                    
                    winner.src = firstPlayer

                    if (firstPlayer === mario_img.src){
                        endGame.appendChild(mario_gif)

                    } else if (firstPlayer === luigi_img.src){
                        endGame.appendChild(luigi_gif)


                    } else if (firstPlayer === bowser_img.src){
                        endGame.appendChild(bowser_gif)

                    } else {
                        endGame.appendChild(peach_gif)

                    }
                
                } else {
                    dialog.innerHTML = ''
                    winner.src = secondPlayer
            
                
                    if (secondPlayer === mario_img.src){
                        endGame.appendChild(mario_gif)

                    } else if (secondPlayer === luigi_img.src){
                        endGame.appendChild(luigi_gif)


                    } else if (secondPlayer === bowser_img.src){
                        endGame.appendChild(bowser_gif)

                    } else {
                        endGame.appendChild(peach_gif)

                    }
                }

                vitoria.innerText = `O vencedor é:`
                show.appendChild(vitoria)
                show.appendChild(vicShow)
                vicShow.appendChild(winner)
                document.getElementById("music").pause()
                document.getElementById("win").play()

                const board = document.getElementById('board')
                board.style.display = 'none'

                document.body.appendChild(endGame)

                
            } else {
                count += 1

                if (count >= 42) {
                    show.innerText = "Empatou"
                    document.getElementById("music").pause()
                    document.getElementById("draw").play()
                    show.appendChild(empate)
                }
            }
        }
    }
}

