import {
    GET_ALL_POKEMONS,
    GET_BY_ID,
    GET_BY_NAME,
    CREATE_POKEMONS,
    GET_TYPES,
    FILTER_POKEMONS_BY_TYPES,
    FILTER_POKEMONS_BY_FROM,
    SORT_AZ,
    SORT_ATTACK,
    DELETE_POKEMONS
} from "../actions/actions";

const initialState = {
    // Estado inicial de la aplicación
    pokemons: [], // Almacena datos de Pokémon
    pokemon: [], // Almacena un Pokémon individual (caso GET_BY_ID)
    types: [],   // Almacena tipos de Pokémon
    loading: false, // Indicador de carga
    filter: false   // Indicador de filtro aplicado
};

const reducer = (state = initialState, action) => {
    // Función reductora que actualiza el estado en función de las acciones
    switch (action.type) {
    case GET_ALL_POKEMONS:
        // Actualiza el estado con la lista completa de Pokémon
        return {
        ...state,
        pokemons: action.payload,
        filter: true,
        loading: true
        };

    case GET_BY_ID:
        // Actualiza el estado con un Pokémon específico (GET_BY_ID)
        return {
        ...state,
        pokemons: {
            ...state.pokemons,
            pokemon: action.payload,
        },
        filter: true,
        loading: false,
        };

    case DELETE_POKEMONS:
        // Elimina un Pokémon del estado basado en su ID
        const pokemonsActualizados = state.pokemons.filter(
        (pokemon) => pokemon.id !== action.payload
        );
        return {
        ...state,
        pokemons: pokemonsActualizados,
        };

    case GET_BY_NAME:
        // Actualiza el estado con una lista de Pokémon que coinciden con un nombre específico
        return {
        ...state,
        pokemons: action.payload,
        filter: true,
        loading: true,
        };

    case CREATE_POKEMONS:
        // No hace cambios en el estado
        return {
        ...state,
        };

    case GET_TYPES:
        // Actualiza el estado con la lista de tipos de Pokémon
        return {
        ...state,
        types: action.payload,
        filter: true,
        loading: true
        };

    case FILTER_POKEMONS_BY_TYPES:
        // Actualiza el estado con una lista de Pokémon filtrados por tipo
        return {
        ...state,
        pokemons: action.payload,
        filter: true,
        loading: true
        };

    case FILTER_POKEMONS_BY_FROM:
        // Actualiza el estado con una lista de Pokémon filtrados por origen
        return {
        ...state,
        pokemons: action.payload,
        filter: true,
        loading: true,
        };

    case SORT_AZ:
        // Ordena la lista de Pokémon alfabéticamente y actualiza el estado
        return {
        ...state,
        pokemons: action.payload,
        filter: true,
        loading: true,
        };

    case SORT_ATTACK:
        // Ordena la lista de Pokémon por estadística de ataque y actualiza el estado
        return {
        ...state,
        pokemons: action.payload,
        filter: true,
        loading: true,
        };

    default:
        // Si la acción no coincide con ninguno de los casos anteriores, devuelve el estado sin cambios
        return { ...state };
    }
};

export default reducer;
