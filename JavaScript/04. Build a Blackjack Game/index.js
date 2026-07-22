
let player = {
    name: "Israa"
    , chips: 500
}

let cards = []
let sum = 0
let hasBlackJack = false
let isAlive = false
let message = ""
let messageEl = document.getElementById('message-el')
let sumEl = document.querySelector("#sum-el")
let cardsEl = document.getElementById("cards-el")
let playerEl = document.getElementById("player-el")

playerEl.textContent = player.name + ": $" + player.chips

function renderGame() {
    cardsEl.textContent = `Cards: `
    for (let card of cards) {
        cardsEl.textContent += card + " "
        sum += card
    }
    sumEl.textContent = "Sum: " + sum
    if (sum <= 20) {
        message = "Do you want to draw a new card?"
    } else if (sum === 21) {
        message = "You've got Blackjack!"
        hasBlackJack = true
    } else {
        message = "You're out of the game!"
        isAlive = false
    }

    messageEl.textContent = message;

}
function startGame() {
    cards.length = 0
    sum = 0
    messageEl.textContent = "Want to play a round?"
    cards.push(getRandomCard())
    cards.push(getRandomCard())
    isAlive = true
    renderGame()
}
function newCard() {
    if (!isAlive || hasBlackJack) return;
    console.log("Drawing a new card from the deck!")
    let card = getRandomCard()
    cards.push(card)
    sum += card
    renderGame()

}
function getRandomCard() {
    let random = Math.floor(Math.random() * (13) + 1)
    if (random === 1) {
        return 11
    } else if (random > 10) {
        return 10
    } else {
        return random
    }
}