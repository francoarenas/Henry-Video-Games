const axios = require('axios')
const express = require('express')
const router = express.Router()
const { allVideoGames } = require('../controller/allVideogames')
const {API_KEY} = process.env

router.get('/:idVideogame', async (req, res) => {
    try {
        const {idVideogame} = req.params
        
        const allGames = await allVideoGames()

        if(idVideogame.includes('-')){

            const detailGame = allGames.filter(e => idVideogame == e.id)
            
            res.status(200).json(detailGame)
        }
        
        else{

            const infoAPi = await axios.get(`https://api.rawg.io/api/games/${idVideogame}?key=${API_KEY}`)

            const {id,name,background_image,description,released,rating,genres,platforms} = infoAPi.data
            
            const genresMap = genres.map(e => e.name + ' ')
            
            const platformsMap = platforms.map(e => e.platform.name + ' ')
            
            infoAPi ?
            
            res.status(200).json({
                id,
                name,
                background_image,
                description,
                released,
                rating,
                genresMap,
                platformsMap
            }) :
            
            res.status(404).send('Algo salio mal')
        }
        }

     catch (error) {
        console.log(error)
    }
  })

  module.exports = router