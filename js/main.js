const lableX = document.getElementById("lable-x")
const lableO = document.getElementById("lable-o")
const cells = document.querySelectorAll(".cell")
const box = document.getElementById("box")

const X_CLASS = "fill-x"
const CIRCLE_CLASS = "fill-o"
const WINING_COMBINATION = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
let circleTurn

cells.forEach(cell => {
    cell.addEventListener("click", hadelClick, { once: true })
})

function hadelClick(e) {
    const cell = e.target
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
    placeMark(cell, currentClass)
    if (checkWin(currentClass)) {
        endGame(false)
    } else if (isDraw()) {
        endGame(true)
    } else {
        swapTurns()
        handelLables(currentClass)
    }
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}

function swapTurns() {
    circleTurn = !circleTurn
}

function checkWin(currentClass) {
    return WINING_COMBINATION.some(combination => {
        return combination.every(index => {
            return cells[index].classList.contains(currentClass)
        })
    })
}

function endGame(draw) {
    if (draw) {
        box.textContent = "is draw"
    } else {
        box.innerHTML = `${circleTurn ? "o" : "x"} is'win`
    }
    box.classList.add("is-win")
    lableO.classList.remove("active")
    lableX.classList.remove("active")
}

function isDraw() {
    return [...cells].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    })
}

function handelLables(currentClass) {
    if (currentClass === X_CLASS) {
        lableX.classList.remove("active")
        lableO.classList.add("active") 
    } else {
        lableO.classList.remove("active")
        lableX.classList.add("active")
    }
}