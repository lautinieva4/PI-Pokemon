import axios from 'axios';
export const GET_ALL_POKEMONS = "GET_ALL_POKEMONS"
export const GET_BY_ID = "GET_BY_ID"
export const GET_BY_NAME = "GET_BY_NAME"
export const CREATE_POKEMONS = "CREATE_POKEMONS"
export const GET_TYPES = "GET_TYPES"
export const FILTER_POKEMONS_BY_TYPES = "FILTER_POKEMONS_BY_TYPES"
export const FILTER_POKEMONS_BY_FROM = "FILTER_POKEMONS_BY_FROM"
export const SORT_AZ = "SORT_AZ"
export const SORT_ATTACK = "SORT_ATTACK"
export const DELETE_POKEMONS = "DELETE_POKEMONS"
export const UPDATE_POKEMONS = "UPDATE_POKEMONS"


//generales
export const fetchPokemons = (name) => {
    return async (dispatch) => {
    if (name) {
        // Si se proporciona un nombre, buscar por nombre
        const pokemonsName = await axios.get(`http://localhost:3001/pokemons?name=${name}`);
        dispatch({ type: GET_BY_NAME, payload: pokemonsName.data });
    } else {
        // Si no se proporciona un nombre, obtener todos los Pokémon
        const pokemons = await axios.get('http://localhost:3001/pokemons');
        dispatch({ type: GET_ALL_POKEMONS, payload: pokemons.data });
    }
    };
};
//Hace una solicitud a la API para obtener el Pokémon con el ID proporcionado y luego envía los datos al almacenamiento a través de una acción con el tipo GET_BY_ID.
export const getPokemonsById = (id) => {
    return async function (dispatch) {
    try {
        const respuesta = await axios.get(`http://localhost:3001/pokemons/${id}`);
        dispatch({ type: GET_BY_ID, payload: respuesta.data });
    } catch (error) {
        console.error("Error al obtener el Pokémon por ID:", error);
    }
    };
};
// Esta función se utiliza para crear un nuevo Pokémon. Realiza una solicitud POST a la API con los datos proporcionados en payload y luego envía una acción con el tipo CREATE_POKEMONS.
export const createPokemons = (payload) => {
    return async function (dispatch) {
        await axios.post("http://localhost:3001/pokemons/", payload);
    return dispatch({ type: CREATE_POKEMONS})
    
    }
}
// Esta función se utiliza para obtener los tipos de Pokémon disponibles. Realiza una solicitud a la API para obtener los tipos y luego envía los datos al almacenamiento a través de una acción con el tipo GET_TYPES.
export const getTypes = () => {
    return async function (dispatch) {
        const pokemons = await axios.get('http://localhost:3001/types');
        return dispatch({ type: GET_TYPES, payload: pokemons.data })
    }
}
// Esta función se utiliza para eliminar un Pokémon por su ID. Realiza una solicitud DELETE a la API con el ID proporcionado y luego envía una acción con el tipo DELETE_POKEMONS
export const deletePokemons = (id) => {
    return async function (dispatch) {
    try {
        await axios.delete(`http://localhost:3001/pokemons/${id}`);
        dispatch({ type: DELETE_POKEMONS, payload: id });
    } catch (error) {
        console.error("Error al eliminar el Pokémon:", error);
    }
    };
};
//Esta función se utiliza para actualizar un Pokémon existente. Realiza una solicitud PUT a la API con los datos proporcionados en payload y luego envía una acción con el tipo UPDATE_POKEMONS.
export const updatePokemons = (payload) => {
    return async function (dispatch) {
        await axios.put(`http://localhost:3001/pokemons/${payload.id}`, payload);
        return dispatch({ type: UPDATE_POKEMONS, payload: payload })
    }
}

//filtros
//Esta función se utiliza para filtrar los Pokémon por tipo. Recibe un tipo y una lista de Pokémon, luego filtra los Pokémon que tienen el tipo especificado y envía una acción con el tipo FILTER_POKEMONS_BY_TYPES.
export const filterPokemonsByTypes = (type, pokemons) => {
    return function (dispatch) {
        let pokemonFilter = [];
        pokemons.forEach(pokemon => {
            const pokemonTy = Array.isArray(pokemon.types) ? pokemon.types : pokemon.types.split(", ");
            if (pokemonTy.includes(type)) {
                pokemonFilter.push(pokemon);
            }
        });
        return dispatch({
            type: FILTER_POKEMONS_BY_TYPES,
            payload: pokemonFilter,
        });
    };
};
//Esta función se utiliza para filtrar los Pokémon según su origen (API o Base de Datos). Realiza una solicitud a la API si el valor es "API" o llama a fetchPokemons si el valor es "DataBase". Luego, envía una acción con el tipo FILTER_POKEMONS_BY_FROM que contiene los Pokémon filtrados.
export const fromFilter = (value) => {
    return async function (dispatch) {
        try {
            let pokemons = [];

            if (value === "API") {
                const response = await axios.get('http://localhost:3001/pokemons');
                pokemons = response.data;
            } else if (value === "DataBase") {
                pokemons = await fetchPokemons(); 
            }

            dispatch({
                type: FILTER_POKEMONS_BY_FROM,
                payload: pokemons,
            });
        } catch (error) {
            console.error("Error al obtener datos de los Pokémon:", error);
        }
    };
};
//Esta función se utiliza para ordenar los Pokémon alfabéticamente en orden ascendente o descendente. Devuelve una acción con el tipo SORT_AZ y los Pokémon ordenados.
export const sortAz = (pokemons, value) => {
    let pokemonsSorted = [];
    if (value === "ASC") {
    pokemonsSorted = [...pokemons].sort((a, b) => a.name.localeCompare(b.name));
    }
    if (value === "DESC") {
    pokemonsSorted = [...pokemons].sort((a, b) => b.name.localeCompare(a.name));
    }
    return { type: SORT_AZ, payload: pokemonsSorted };
};
//Esta función se utiliza para ordenar los Pokémon por su estadística de ataque en orden ascendente o descendente. Devuelve una acción con el tipo SORT_ATTACK y los Pokémon ordenados según la estadística de ataque.
export const sortAttack = (pokemons, order) => {
    const pokemonsSorted = [...pokemons].sort((a, b) => {
        const attackA = parseInt(a.attack);
        const attackB = parseInt(b.attack);

        if (order === "low-high") {
            return attackA - attackB; // Orden ascendente: de menor a mayor ataque
        }
        if (order === "high-low") {
            return attackB - attackA; // Orden descendente: de mayor a menor ataque
        }
        return 0;
    });
    return (dispatch) => {
        dispatch({ type: SORT_ATTACK, payload: pokemonsSorted });
    };
};


