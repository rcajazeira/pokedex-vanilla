/* import "./style.css"

let pokemonData = []

loadPokemonData()

async function loadPokemonData() {
    // consultar a api de pokemons da primeira geração.
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151&offset=0")
    const data = await response.json()
    pokemonData = data.results
    console.log(pokemonData)
    renderPokemonList()
}

function renderPokemonList() {
    const pokemonList = document.querySelector(".pokemon-list")
    const loader = document.querySelector(".loader")

    loader.remove()

    pokemonList.innerHTML = `
        ${pokemonData.map(pokemon => {
            return `
                <li class="pokemon-list__pokemon">
                    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split("/")[6]}.png" alt="${pokemon.name}">
                    <div>
                        <h2>${pokemon.name}</h2>
                        <h6>#${pokemon.url.split("/")[6]}</h6>
                    </div>
                </li>
            ` 
        }).join("")}
    `
} */

/* adicionando  */

/* import "./style.css";

let allPokemon = [];

// Carrega os dados iniciais
async function loadPokemonData() {
    try {
        // Mostra o loader enquanto carrega
        document.querySelector(".pokemon-list").innerHTML = '<div class="loader"></div>';
        
        // Busca a lista básica de Pokémon
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151&offset=0");
        const data = await response.json();
        
        // Busca detalhes completos para cada Pokémon
        const pokemonDetails = await Promise.all(
            data.results.map(pokemon => 
                fetch(pokemon.url).then(res => res.json())
        ));
        
        allPokemon = pokemonDetails;
        renderPokemonList(allPokemon);
    } catch (error) {
        console.error("Erro ao carregar dados:", error);
        document.querySelector(".pokemon-list").innerHTML = `<p class="error">Erro ao carregar os Pokémon</p>`;
    }
}

// Renderiza a lista de Pokémon
function renderPokemonList(pokemons) {
    const pokemonList = document.querySelector(".pokemon-list");
    
    // Remove o loader se existir
    const loader = document.querySelector(".loader");
    if (loader) loader.remove();
    
    if (pokemons.length === 0) {
        pokemonList.innerHTML = `<p class="no-results">Nenhum Pokémon encontrado</p>`;
        return;
    }
    
    pokemonList.innerHTML = pokemons.map(pokemon => `
        <li class="pokemon-list__pokemon">
            <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
            <div>
                <h2>${pokemon.name}</h2>
                <h6>#${String(pokemon.id).padStart(3, '0')}</h6>
            </div>
        </li>
    `).join("");
}

// Configura o sistema de busca
function setupSearch() {
    const searchForm = document.querySelector(".form-container");
    const searchInput = searchForm.querySelector("input");
    const searchButton = searchForm.querySelector("button");
    
    // Função de busca
    const performSearch = () => {
        const searchTerm = searchInput.value.trim().toLowerCase();
        
        if (!searchTerm) {
            // Se vazio, mostra todos
            renderPokemonList(allPokemon);
            return;
        }
        
        // Filtra os Pokémon que correspondem à busca
        const filteredPokemons = allPokemon.filter(pokemon => 
            pokemon.name.toLowerCase().includes(searchTerm)
        );
        
        renderPokemonList(filteredPokemons);
    };
    
    // Eventos
    searchButton.addEventListener("click", (e) => {
        e.preventDefault();
        performSearch();
    });
    
    searchInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            performSearch();
        }
    });
}

// Inicializa a aplicação
function initApp() {
    loadPokemonData();
    setupSearch();
}

// Inicia quando o documento estiver carregado
document.addEventListener("DOMContentLoaded", initApp);
 */

/* outro modelo */

/* import "./style.css"

let pokemonData = [] // Armazena todos os dados originais
let displayedPokemon = [] // Armazena os dados a serem exibidos (pode ser filtrado)

const searchInput = document.querySelector('.input-container input') // Campo de busca
const form = document.querySelector('.form-container') // Formulário

loadPokemonData()

async function loadPokemonData() {
    try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151&offset=0")
        const data = await response.json()
        pokemonData = data.results
        displayedPokemon = [...pokemonData] // Inicialmente, mostra todos
        renderPokemonList()
    } catch (error) {
        console.error("Erro ao carregar dados:", error)
    }
}

function renderPokemonList() {
    const pokemonList = document.querySelector(".pokemon-list")
    const loader = document.querySelector(".loader")

    if (loader) loader.remove() // Remove o loader após carregar

    // Gera o HTML para cada Pokémon
    pokemonList.innerHTML = `
        ${displayedPokemon.map(pokemon => {
            const id = pokemon.url.split("/")[6] // Extrai o ID do URL
            return `
                <li class="pokemon-list__pokemon">
                    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png" alt="${pokemon.name}">
                    <div>
                        <h2>${pokemon.name}</h2>
                        <h6>#${id}</h6>   
                    </div>
                </li>
            ` 
        }).join("")}
    `
}

// Adiciona evento de busca
form.addEventListener('submit', (e) => {
    e.preventDefault() // Impede o recarregamento da página
    
    const searchTerm = searchInput.value.toLowerCase() // Termo de busca
    
    // Filtra os Pokémon cujo nome contém o termo de busca
    displayedPokemon = pokemonData.filter(pokemon => 
        pokemon.name.toLowerCase().includes(searchTerm)
    )
    
    renderPokemonList() // Atualiza a lista
}) */

/* Outra melhoria */

import ".style.css"

let pokemonData = [] // Todos os Pokémon carregados da API
let displayedPokemon = [] // Pokémon filtrados para exibição

// Seleciona elementos do DOM
const searchInput = document.querySelector('.input-container input') // Campo de busca
const loader = document.querySelector(".loader") // Loader de carregamento
const pokemonList = document.querySelector(".pokemon-list") // Lista de Pokémon

loadPokemonData()

async function loadPokemonData() {
    try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151&offset=0")
        const data = await response.json()
        pokemonData = data.results
        displayedPokemon = [...pokemonData] // Inicialmente mostra todos
        renderPokemonList()
    } catch (error) {
        console.error("Erro ao carregar dados:", error)
    }
}

function renderPokemonList() {
    if (loader) loader.remove() // Remove o loader após carregar

    // Gera o HTML para cada Pokémon
    pokemonList.innerHTML = `
        ${displayedPokemon.map(pokemon => {
            const id = pokemon.url.split("/")[6] // Extrai o ID do URL
            return `
                <li class="pokemon-list__pokemon">
                    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png" alt="${pokemon.name}">
                    <div>
                        <h2>${pokemon.name}</h2>
                        <h6>#${id}</h6>   
                    </div>
                </li>
            ` 
        }).join("")}
    `
}

// ✨ Nova funcionalidade: busca em tempo real
searchInput.addEventListener("input", (event) => {
    const searchTerm = event.target.value.toLowerCase() // Termo digitado

    // Se o campo estiver vazio, mostra todos os Pokémon
    if (searchTerm.trim() === '') {
        displayedPokemon = [...pokemonData]
    } else {
        // Filtra os Pokémon cujo nome contém o termo de busca
        displayedPokemon = pokemonData.filter(pokemon => 
            pokemon.name.toLowerCase().includes(searchTerm)
        )
    }

    renderPokemonList() // Atualiza a lista
})
