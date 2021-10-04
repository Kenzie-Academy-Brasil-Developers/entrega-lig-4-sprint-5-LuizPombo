const board = []

const createBoard = () =>
{
    const body = document.querySelector('body')
    const boardSection = document.createElement('section')
    boardSection.id = 'board'
    boardSection.style.width  = '350px'
    boardSection.style.height = '300px'
    body.appendChild(boardSection)

    for (i = 0; i < 7; i++)
    {
        const column = document.createElement('div')
        column.style.width  = '50px'
        column.style.height = '300px'
        column.class = 'columns'
        column.id = `column${i}`
        boardSection.appendChild(column)

        for (j = 5; j >= 0; j--)
        {
            const div = document.createElement('div')
            div.style.width  = '50px'
            div.style.height = '50px'
            div.id = `index${j}`
            column.appendChild(div)
        }
    }

    const modal = document.createElement('section')
    modal.id = 'modal'
    body.appendChild(modal)
}

createBoard()
