const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const videogames = require('../routes/videogames');
const Videogame = require('../routes/videogame')
const genres = require('../routes/genres')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/videogame', Videogame); // Ruta para el id
router.use('/videogames', videogames);
router.use('/genres', genres);

module.exports = router;