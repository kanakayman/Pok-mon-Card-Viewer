import colors from "./color.js";

const apiURL = `https://pokeapi.co/api/v2/pokemon/`;
const btn = document.getElementById("submit");


btn.addEventListener('click', async () => {
  const pokemonName = document.getElementById("pokemonName").value.toLowerCase();

  if(!pokemonName){
    window.alert("Pokemon Name Empty")
  }
  else{
    const pokemonData = await getPokemonData(pokemonName);
    console.log(pokemonData);
    displayPokemon(extractPokemon(pokemonData));
  }

});

async function getPokemonData(name){
  try{
    const response = await fetch(apiURL+name);
    
    if(!response.ok){
      throw new Error("Could not fetch data"); 
    }

    const data = await response.json();
    return data;
  }
  catch(error){
    console.log("error");
  }
}

function extractPokemon(data){
  const{name: pokemon,
    stats: [{base_stat: hp}], 
    sprites: {other: {dream_world: {front_default: pokemonImg}}},
    types: [{type: {name: firstType}}, {type: {name: secondType}} = { type: {name: ''}}],  //second type check for default value
    height: pokemonHeight,
    weight: pokemonWeight,
    moves: [{move:{name: pokemonMove}}]
  } = data;

  return [pokemon, hp, pokemonImg, firstType, secondType, pokemonHeight, pokemonWeight, pokemonMove];  
}

function displayPokemon(pokemonData){
  document.getElementById("name").textContent = pokemonData[0].charAt(0).toUpperCase() + pokemonData[0].slice(1);
  document.getElementById("hp").textContent = `HP ${pokemonData[1]}`;
  document.getElementsByTagName("img")[0].src = pokemonData[2];
  document.getElementsByTagName("img")[0].style.background = imgBgColor(pokemonData[3]);  
  document.getElementById("type").textContent = `${pokemonData[3].charAt(0).toUpperCase()+pokemonData[3].slice(1)} / ${pokemonData[4].charAt(0).toUpperCase()+pokemonData[4].slice(1)}`;
  document.getElementById("height").textContent = `HT: ${pokemonData[5]}`;
  document.getElementById("weight").textContent = `WT: ${pokemonData[6]} lbs`;
  document.getElementById("moveName").textContent = pokemonData[7].charAt(0).toUpperCase()+pokemonData[7].slice(1);

}

//set bg color based on pokemon type
function imgBgColor(pokemonType){
  if(colors.hasOwnProperty(pokemonType)){
    return (colors[pokemonType]);
  }
}