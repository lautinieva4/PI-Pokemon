const { Router } = require('express');
const pokemonsRoutes = require('./pokemons.routes.js');
const typesRoutes = require('./types.routes.js');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/pokemons", pokemonsRoutes);
router.use("/types", typesRoutes);


module.exports = router;
