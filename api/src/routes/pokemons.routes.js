const { Router } = require('express');

// Importamos las funciones de los controladores necesarias
const { getAllPokemons, getTypes, getAllPokemonsByName, getPokemonsByID, postPokemons, deletePokemons, putPokemons } = require('../controllers/controller.js');

// Importamos el modelo Types de la base de datos
const { Types } = require('../db.js')

// Creamos una instancia del objeto Router
const router = Router();

// Definimos la ruta GET a la URL principal
router.get('/', async (req, res) => {
    // obtenemos el parámetro name de la petición
    const { name } = req.query;
    try {
        // obtenemos los tipos existentes para poder asociarlos a los pokemons
        await getTypes();
        // si hay un parámetro name, buscamos los pokemons que coincidan con ese nombre
        if (name) {
            const pokemonsName = await getAllPokemonsByName(name);
            res.status(200).send(pokemonsName);
        // si no hay parámetro name, buscamos todos los pokemons en la base de datos
        } else if (!name) {
            const allPokemons = await getAllPokemons();
            res.status(200).send(allPokemons);
        };
    }
    catch (error) {
        // si ocurre un error, respondemos con un código 400 y un objeto JSON que incluye un mensaje de error
        res.status(400).json({ message: "Hubo un error al obtener información de los pokemons."  });
    };
});

// Definimos la ruta GET a la URL /id
router.get('/:id', async (req, res) => {
    // obtenemos el parámetro id de la petición
    const { id } = req.params;
    try {
        // buscamos el pokemons con el id correspondiente
        const pokemonsFind = await getPokemonsByID(id);
        res.status(200).send(pokemonsFind);
    } catch (error) {
        // si ocurre un error, respondemos con un código 400 y un objeto JSON que incluye un mensaje de error
        res.status(400).json({ error: error.message });
    }
})

// Definimos la ruta POST a la URL principal
router.post('/', async (req, res) => {
    try {
        const { name, image, height, weight, speed, defense, hp, attack, types } = req.body;

        if (!name || !image || !height || !weight || !speed || !defense || !hp || !attack) {
            throw new Error("Necesitas rellenar toda la información");
        }

        // Crear un nuevo Pokémon en la base de datos
        const newPokemons = await postPokemons(
            name,
            image,
            parseInt(attack),
            parseInt(weight),
            parseInt(height),
            parseInt(hp),
            parseInt(speed),
            parseInt(defense)
        );

        // Asociar los tipos con el Pokémon
        const typeInstances = await Types.findAll({
            where: {
                name: types
            }
        });

        await newPokemons.setTypes(typeInstances);

        res.status(200).json({ message: `El pokemon ${newPokemons.name} fue creado con la id = ${newPokemons.id}` });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
// Definimos la ruta DELETE a la URL /id
router.delete('/:id', async (req, res) => {
    try {

        const { id } = req.params;
        const delPokemons = await deletePokemons(id);
        // respondemos con un código 200 y un objeto JSON que incluye un mensaje de éxito
        res.status(200).json({ message: `El pokemon con la id ${id} fue eliminado con éxito` });

    } catch (error) {
        // si ocurre un error, respondemos con un código 400 y un objeto JSON que incluye un mensaje de error
        res.status(400).json({ error: error.message });
    }
});

// Definimos la ruta PUT a la URL /id
router.put('/:id', async (req, res) => {
    try {

        // obtenemos los parámetros de la petición PUT
        const { id } = req.params;
        const { name, image, height, weight,attack, hp, speed,defense, types, typesLast } = req.body;

        // validamos que el pokemon tenga al menos un tipo asociado
        if (types.length === 0) {
            throw new Error("El pokemon tiene que tener al menos un tipo");
        }

        // actualizamos la entrada de la tabla de pokemons correspondient
        const updatepokemons = await putPokemons(id, name, image, parseInt(attack), parseInt(attack), hp , speed , defense , height , weight)


        // buscamos los objetos de tipo correspondentes a agregar y quitar y los asociamos a la entrada actualizada del pokemon
        const tyLast = await types.findAll({
            where: {
                name: typesLast
            }
        })
        const ty = await Types.findAll({
            where: {
                name: types
            }
        })
        await updatepokemons.removeTypes(tyLast);
        await updatepokemons.addTypes(ty);

        // respondemos con un código 200 y un objeto JSON que incluye un mensaje de éxito
        res.status(200).json({ message: `El pokemon ${updatepokemons.name} fue actualizado con éxito` },);


    } catch (error) {
        // si ocurre un error, respondemos con un código 400 y un objeto JSON que incluye un mensaje de error
        res.status(400).json({ error: error.message });
    }
})


// Exportamos el objeto router para que pueda ser utilizado en otros archivos
module.exports = router;
