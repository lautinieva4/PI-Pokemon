const { Router } = require('express');
// Importamos la función del controlador necesaria
const { getTypes } = require('../controllers/controller.js');
// Importamos el modelo Types de la base de datos
const { Types } = require('../db.js');

// Creamos una instancia del objeto Router
const router = Router();

// Definimos la ruta GET a la URL principal
router.get('/', async (req, res) => {
    try {

        // ejecutamos la función del controlador que obtiene los tipos existentes
        await getTypes();

        // buscamos todos los tipos en la tabla de tipos
        const allTypes = await Types.findAll()

        // respondemos con un código 200 y un objeto JSON que incluye todos los tipos existentes
        res.status(200).json(allTypes);
        
    } catch (error) {
        // si ocurre un error, respondemos con un código 400 y un objeto JSON que incluye un mensaje de error
        res.status(400).json({ error: error.message });
    }
})

// Exportamos el objeto router para que pueda ser utilizado en otros archivos
module.exports = router;