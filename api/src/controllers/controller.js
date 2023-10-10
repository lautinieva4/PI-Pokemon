// Importamos las librerías necesarias:
const axios = require('axios');
const { Pokemons , Types } = require('../db.js');
const URL = "https://pokeapi.co/api/v2/pokemon/?limit=200"


// Función que devuelve una lista con los pokemons de la API:
const getPokemonsApi = async () => {
    try {
        const response = await axios.get(URL);
        const apiData = response.data.results;

        const pokemonDetails = await Promise.all(apiData.map(async (pokemon) => {
            const detailResponse = await axios.get(pokemon.url);
            const detailData = detailResponse.data;
            
            return {
                id: detailData.id,
                name: detailData.name,
                image: detailData.sprites.other['official-artwork'].front_default,
                types: detailData.types.map((type) => type.type.name),
                attack: detailData.stats[1].base_stat,
                speed: detailData.stats[5].base_stat,
                defense: detailData.stats[2].base_stat,
                hp: detailData.stats[0].base_stat,
                height: detailData.height,
                weight: detailData.weight,
            };
        }));

        return pokemonDetails;
        
        } catch (error) {
            console.error("Error from axios:", error.response);
            throw new Error("Hubo un error al obtener información de los pokemons.");
        }
        
};


// Función que devuelve una lista con todos los pokemons en al base de datos y en la API:
const getAllPokemons = async () => {
    try {

        // Obtenemos la lista completa de pokemons de la API y la base de datos:
        const allPokemonsApi = await getPokemonsApi();
        const allPokemonsDb = await Pokemons.findAll({
            include: {
                model: Types,
                attributes: ["name"],
                through: {
                attributes: []
                }
            }
        });

    
        const allPokemonsDbWithTy = allPokemonsDb.map(pokemons => {
            return {
                id: pokemons.id,
                name: pokemons.name,
                image: pokemons.image,
                attack: pokemons.attack,
                weight: pokemons.weight,
                height: pokemons.height,
                speed:pokemons.speed,
                defense:pokemons.defense,
                hp: pokemons.hp,
                types: pokemons.types.map(ty => { return ty.name }).join(', '),
                from: pokemons.from
            }
        })
        return [...allPokemonsApi, ...allPokemonsDbWithTy];
    } catch (error) {
        throw new Error(error);
    };
};

// Función que devuelve una lista con los pokemons que incluyen el `name` en su nombre:
const getAllPokemonsByName = async (name) => {
    try {

        // Obtenemos la lista completa de pokemons:
        const allPokemons = await getAllPokemons();

        // Filtramos los pokemons que contienen el `name` en su nombre:
        const filterName = allPokemons.filter((pokemons) => pokemons.name.toLowerCase().includes(name.toLowerCase()));

        if (filterName.length > 0) {
            return filterName;
        } else {
            throw new Error(`Pokemon no encontrado: ${name}`);
        }
    } catch (error) {
        throw new Error(error); 
    }
}

// Función que devuelve el pokemon con el `id` especificado:
const getPokemonsByID = async (id) => {
    try {

        // Obtenemos la lista completa de pokemons:
        const allPokemons = await getAllPokemons();

        // Filtramos el pokemon con el `id` especificado:
        const filterName = allPokemons.filter(pokemons => pokemons.id == id)
        if (filterName.length > 0) {
            return filterName[0];
        } else {
            throw new Error(`ID del pokemon no encontrada, ID = ${id}`)
        }
    } catch (error) {
        throw new Error(error);
    }
};


const getTypes = async () => {
    try {
        // Obtenemos la lista completa de pokemons de la API:
        const pokemonsApi = await getPokemonsApi();

        // Inicializamos un set para evitar duplicados de tipos:
        const typesSet = new Set();
        
        // Agregamos los tipos a nuestro set:
        pokemonsApi.forEach(pokemon => {
            pokemon.types.forEach(type => {
                typesSet.add(type);
            });
        });

        // Convertimos el set a un array para almacenar en la base de datos:
        const typesArray = Array.from(typesSet);

        // Iteramos por cada tipo y lo almacenamos en la base de datos si no existe previamente:
        await Promise.all(typesArray.map(async typesName => {
            await Types.findOrCreate({
                where: {
                    name: typesName,
                },
            });
        }));
    } catch (error) {
        throw new Error(error);
    }
}


// Función que agrega un nuevo pokemon a la base de datos:
const postPokemons = async (name, image, attack, weight, height, hp, speed,defense) => {
    try {
        // Obtenemos la lista completa de pokemons:
        const pokemonsApiDB = await getAllPokemons();
        // Convertimos el nombre a minúsculas:
        const nameLowerCase = name.toLowerCase();
        // Buscamos si ya existe un pokemon con el mismo nombre:
        const pokemonsName = pokemonsApiDB.find(pokemons => pokemons.name.toLowerCase() === nameLowerCase.trim());
        if (pokemonsName) {
            throw new Error(`El pokemon ${name} ya existe`);
        }
        // Verificamos que se hayan completado todos los campos:
        else if (!name || !attack || !weight || !height || !hp || !speed || !defense) {
            throw new Error("Necesitas rellenar toda la información");
        }
        
        
        // Si todo está bien, creamos el nuevo pokemon en la base de datos:
        const newPokemons = await Pokemons.create({
            name,
            image,
            height,
            weight,
            speed,
            defense,
            hp,
            attack,
            from: "DataBase"
        });
        return newPokemons;
    } catch (error) {
        throw new Error(error);
    }
}
// Esta función permite agregar un nuevo pokémon a la base de datos, siempre y cuando no exista un Pokémon con el mismo nombre. Realiza varias verificaciones antes de agregar el Pokémon a la base de datos.
const deletePokemons = async (id) => {
    try {
        const delPokemons = await Pokemons.destroy({
            where: {
                id,
            }
        })
        return delPokemons;
    } catch (error) {
        throw new Error(error);
    }
}
//Esta función permite eliminar un Pokémon de la base de datos por su ID.
const putPokemons = async (id, name, image, height, weight, speed, hp, defense, attack) => {
    try {
        const updatePokemons = await Pokemons.findByPk(id);
        updatePokemons.name = name;
        updatePokemons.image = image;
        updatePokemons.attack = attack;
        updatePokemons.weight = weight;
        updatePokemons.height = height;
        updatePokemons.hp = hp;
        updatePokemons.speed = speed;
        updatePokemons.defense = defense;
        await updatePokemons.save();
        return updatePokemons;
    } catch (error) {
        throw new Error(error);
    }
}

// Exportamos todas las funciones:
module.exports = {
    getAllPokemonsByName,
    getPokemonsByID,
    getTypes,
    getAllPokemons,
    postPokemons,
    deletePokemons,
    putPokemons
}