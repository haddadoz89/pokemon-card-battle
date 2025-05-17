import { pokemon } from "./pokemonList.js"

// Constant 

const simplePokemonList = pokemon
.filter(p => p.base && typeof p.base.HP === "number")
.map((p,index)=>{
  return {
    id: index,
    name: p.name.english,
    type: p.type[0],
    HP: p.base.HP,
    image: p.image.hires
    }
})

const typeRule = {
  Normal: [],
  Fire: ["Grass", "Ice", "Bug", "Steel"],
  Water: ["Fire", "Ground", "Rock"],
  Electric: ["Water", "Flying"],
  Grass: ["Water", "Ground", "Rock"],
  Ice: ["Grass", "Ground", "Flying", "Dragon"],
  Fighting: ["Normal", "Ice", "Rock", "Dark", "Steel"],
  Poison: ["Grass", "Fairy"],
  Ground: ["Fire", "Electric", "Poison", "Rock", "Steel"],
  Flying: ["Grass", "Fighting", "Bug"],
  Psychic: ["Fighting", "Poison"],
  Bug: ["Grass", "Psychic", "Dark"],
  Rock: ["Fire", "Ice", "Flying", "Bug"],
  Ghost: ["Psychic", "Ghost"],
  Dragon: ["Dragon"],
  Dark: ["Psychic", "Ghost"],
  Steel: ["Ice", "Rock", "Fairy"],
  Fairy: ["Fighting", "Dragon", "Dark"]
}

const PlayerBenchSlotElement = document.querySelectorAll('#player-bench .card-slot')
const computerBenchSlotElement =document.querySelectorAll('#computer-bench .card-slot')
const deckElement = document.querySelector('#deck-image')
const playerActiveSlotElement = document.getElementById("player-active")
const computerActiveSlotElement = document.getElementById("computer-active")
const restartButtonElement = document.getElementById('restart-button')

// Variable

let playerCards =[]
let computerCards =[]
let isDeckFull = false
let playerWins = 0
let computerWins = 0

// Function

const randomCards =()=>{
  const tempPokemonCards = simplePokemonList.slice()
  tempPokemonCards.sort(()=>0.5 - Math.random())
  const tempPlayerCard = tempPokemonCards.slice(0,5)
  const tempComputerCard = tempPokemonCards.slice(10,15)
  return{
    player: tempPlayerCard,
    computer: tempComputerCard
  }
}

const showPlayerCards =(cards)=>{
  PlayerBenchSlotElement.forEach((slot,idx)=>{
    slot.innerHTML = ""
    const card = cards[idx]
    const img = document.createElement('img')
    const infoDiv = document.createElement('div')
    const name = document.createElement('strong')
    const type = document.createElement('div')
    const hp = document.createElement('div')
    const lineBreak = document.createElement('br')
    img.src = card.image
    infoDiv.style.textAlign ="center"
    infoDiv.style.fontSize = "12px"
    infoDiv.style.borderRadius = "4px"
    name.textContent = card.name
    type.textContent = "Type: " + card.type
    hp.textContent = "HP: " + card.HP
    infoDiv.append(name,lineBreak,type,lineBreak,hp,lineBreak)
    slot.append(img,infoDiv)
  })
}

const showComputerCards =()=>{
  computerBenchSlotElement.forEach((slot)=>{
    slot.innerHTML = ""
    const img = document.createElement('img')
    img.src = "./images/back.png"
    slot.appendChild(img)
  })
}

const handleDeckClick =()=>{
  if (isDeckFull){
    return
  }
  const draw = randomCards()
  playerCards = draw.player
  computerCards =draw.computer
  showPlayerCards(playerCards)
  showComputerCards()
  isDeckFull = true
}

const showActiveCard = (card ,side) =>{
  let target;

  if (side === "player") {
    target = playerActiveSlotElement;
  } else {
    target = computerActiveSlotElement;
  }

  target.innerHTML = "";

  const img = document.createElement("img");
  img.src = card.image;

  target.appendChild(img);
}

const showPopup = (message) => {
  const popupBox = document.createElement("div")
  const popupContent = document.createElement("div")
  const messageElement = document.createElement("p")
  popupBox.style.position = "fixed"
  popupBox.style.top = "0"
  popupBox.style.left = "0"
  popupBox.style.width = "100%"
  popupBox.style.height = "100%"
  popupBox.style.backgroundColor = "rgba(0, 0, 0, 0.6)"
  popupBox.style.display = "flex"
  popupBox.style.alignItems = "center"
  popupBox.style.justifyContent = "center"
  popupBox.style.zIndex = "9999"
  popupContent.style.backgroundColor = "white"
  popupContent.style.padding = "20px 30px"
  popupContent.style.borderRadius = "10px"
  popupContent.style.textAlign = "center"
  popupContent.style.fontSize = "18px"
  popupContent.style.boxShadow = "0 0 10px black"
  messageElement.textContent = message
  popupContent.appendChild(messageElement)
  popupBox.appendChild(popupContent)
  document.body.appendChild(popupBox)
}

const compareCards =(playerCard,computerCard)=>{
  const playerType = playerCard.type
  const computerType = computerCard.type

  if (playerType === computerType) {
    if (playerCard.HP > computerCard.HP) return "player"
    else if (playerCard.HP < computerCard.HP) return "computer"
    else return "draw"
  }
  if (typeRule[playerType] && typeRule[playerType].includes(computerType)) {
    return "player"
  }
  if (typeRule[computerType] && typeRule[computerType].includes(playerType)) {
    return "computer"
  }
  if (playerCard.HP > computerCard.HP) {return "player"
  }else if (playerCard.HP < computerCard.HP) {
  return "computer"
  }else{ 
  return "draw"
  }
}

const playCard = (index) => {
  const playerCard = playerCards[index]
  const randomIndex = Math.floor(Math.random() * computerCards.length)
  const computerCard = computerCards[randomIndex]
  showActiveCard(playerCard, "player")
  showActiveCard(computerCard, "computer")
  PlayerBenchSlotElement[index].innerHTML = ""
  playerCards[index] = null
  computerBenchSlotElement[randomIndex].innerHTML = ""
  computerCards.splice(randomIndex, 1)
  const winner = compareCards(playerCard, computerCard)
    if (winner === "player") {
    playerWins++
    showPopup("🎉 Player wins this round!")
  } else if (winner === "computer") {
    computerWins++;
    showPopup("🤖 Computer wins this round!")
  } else {
    showPopup("🤝 It's a draw!")
  }
    if (playerWins === 3) {
    showPopup("🏆 Player wins the game!")
    isDeckFull = false
  } else if (computerWins === 3) {
    showPopup("💻 Computer wins the game!")
    isDeckFull = false
  }

  if (playerCards.every(card => card === null) && computerCards.length === 0) {
  isDeckFull = false
  }
}
const restartGame = ()=>{
  playerWins = 0
  computerWins = 0
  isDeckFull = false
  playerCards = []
  computerCards = []
  PlayerBenchSlotElement.forEach(slot => slot.innerHTML = "")
  computerBenchSlotElement.forEach(slot => slot.innerHTML = "")
  playerActiveSlotElement.innerHTML = ""
  computerActiveSlotElement.innerHTML = ""
}

// eventListner

restartButtonElement.addEventListener('click',restartGame)
deckElement.addEventListener("click", handleDeckClick)
PlayerBenchSlotElement.forEach((slot, index) => {
  slot.addEventListener("click", () => {
    if (playerCards[index]) {
      playCard(index)
    }
  })
})