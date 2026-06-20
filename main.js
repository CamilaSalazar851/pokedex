const POKEAPI_URL = "https://pokeapi.co/api/v2";
const pokemonList = document.getElementById("pokemons");
let types = []
const divtypes= document.querySelector("#types")
const loadPokemons = async () => {
    try {
        const response = await fetch(`${POKEAPI_URL}/pokemon`).then(response => response.json());
        response.results.forEach(pokemon => {
            const option = document.createElement("option");
            option.textContent = pokemon.name;
            option.value = pokemon.url;
            pokemonList.appendChild(option);
        });
    } catch (error) {
        console.error("Error fetching pokemons:", error);
    }
}

loadPokemons();
const pokemonImage = document.getElementById("pokemon-image");
pokemonImage.addEventListener("mouseenter",()=>{
    console.log(types)
    let HTML = ""
    for(let i=0;i<types.length;i++){
        HTML += `${types[i].type.name} <br>`
    }
    divtypes.innerHTML = HTML;
})
const pokemonSelected = async (pokemonUrl) => {
    divtypes.textContent=""
    try {

        const response = await fetch(pokemonUrl).then(response => response.json());

        const pokemonImage = document.getElementById("pokemon-image");
        const pokemonName = document.getElementById("pokemon-name");
        const pokemonStats = document.getElementById("pokemon-stats");
        const pokemonAbilities = document.getElementById("pokemon-abilities");
        pokemonAbilities.innerHTML = "";
        response.abilities.forEach(ability => {
            const li = document.createElement("li");
            li.textContent = ability.ability.name;
            pokemonAbilities.appendChild(li);
        });
        
        pokemonImage.src = response.sprites.front_default;
        pokemonName.textContent = response.name;

        pokemonStats.innerHTML = "";

        response.stats.forEach(stat => {
            const li = document.createElement("li");
            li.textContent = `${stat.stat.name}: ${stat.base_stat}`;
            pokemonStats.appendChild(li);

        })
        console.log(response.types)
        types = response.types
        console.log(types)

    } catch (error) {
        console.error("Error fetching pokemon details:", error);
    }
}
// fetch(`${POKEAPI_URL}/pokemon`)
// .then(response => response.json())
// .then(data => {
//     console.log(data);
// });