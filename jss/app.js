import { pokemon } from "./pokemonList.js";
// Constant 
// const missingBase = pokemon.filter(p => {!p.base || typeof p.base.HP !== "number"}) 
const simplePokemonList = pokemon
.filter(p => p.base && typeof p.base.HP === "number")
.map((p,index)=>{
  return {
    id: index,
    name: p.name.english,
    type: p.type[0],
    HP: p.base.HP,
    /* this is (HP) not working, after search
    found that there has some pokemon without base
    the solution is to use filter to filter before make new array */
    image: p.image.hires
    }
})
// console.log("Pokémon with/without HP:",pokemon)
// console.log("Total:", pokemon.length)
// console.log("Pokémon without base or HP:", missingBase)
// console.log("Total:", missingBase.length)
// console.log("Pokémon with HP:",simplePokemonList)
// console.log("Total:", simplePokemonList.length)
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

// Variable
let playerCards =[]
let computerCards =[]
let isDeckFull = false
// Function
const randomCards =()=>{
  const tempPokemonCards = simplePokemonList.slice()
  tempPokemonCards.sort(()=>{
    0.5 - Math.random()
  })
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

const playCard = (index) => {
  const playerCard = playerCards[index]
  const computerCard = computerCards
  
}