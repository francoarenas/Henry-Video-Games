const { default: axios } = require('axios');
const express = require('express')
const router = express.Router()
const { allVideoGames } = require('../controller/allVideogames')
const {Videogame,Genders} = require('../db')
const {API_KEY} = process.env

router.get('/', async (req, res) => {
    try {

        const {name} = req.query

        if(name){
           const searchGames = await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}&page_size=15`)
           const searchGamesApi = searchGames.data.results.map(e => {
            return {
                id: e.id,
                name: e.name,
                rating: e.rating,
                image: e.background_image,
                genres: e.genres.map(e => e.name)
            }
        })

        searchGamesApi.length ?
        res.status(200).json(searchGamesApi) :
        res.status(404).send('Game no encontrado')
        }

        else{

            const videogames = await allVideoGames()
            
            videogames ?
            res.status(200).json(videogames) :
            res.status(404).send('No cargaron los videogames')
        }
        
    } catch (error) {
        console.log(error)
    }
  });

  router.post('/gamecreate', async (req,res) => {
    const game = req.body
    console.log(game)
    
    const {name,description,releaseDate,rating,platforms,image,genres} = game
    try {
        const gameCreate = await Videogame.findOrCreate({
            where: {
                name: name,
                image: image,
                description: description,
                releaseDate: releaseDate,
                rating: rating,
                platforms: platforms
            }
        })
        
        const genresDb = await Genders.findAll({
            where: {name: genres}
        })
    
        gameCreate[0].addGenders(genresDb)
        res.status(201).send('Video Game created!')
    } catch (error) {
      console.log(error)
    }

  })

module.exports = router