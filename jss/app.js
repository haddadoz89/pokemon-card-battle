import { pokemon } from "./pokemonList.js";
// Constant 
const missingBase = pokemon.filter(p => !p.base || typeof p.base.HP !== "number")
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
console.log("Pokémon with/without HP:",pokemon)
console.log("Total:", pokemon.length);
console.log("Pokémon without base or HP:", missingBase);
console.log("Total:", missingBase.length);
console.log("Pokémon with HP:",simplePokemonList)
console.log("Total:", simplePokemonList.length);
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