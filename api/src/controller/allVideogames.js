require('dotenv').config();
const axios = require('axios')
const {Genders, Videogame} = require('../db')
const {API_KEY} = process.env

const allVideoGames = async () => {
    
    try {

        let infoAPi

        const primerGet = axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=1`)
        const segundoGet = axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=2`)
        const tercerGet = axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=3`)
        const cuartoGet = axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=4`)
        const quintoGet = axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=5`)
 
        await Promise.all([primerGet,segundoGet,tercerGet,cuartoGet,quintoGet])
         .then(value => infoAPi = value[0].data.results.concat(value[1].data.results.concat(value[2].data.results.concat(value[3].data.results.concat(value[4].data.results)))))

        const gamesApi = infoAPi.map(e => {
            return {
                id: e.id,
                name: e.name,
                image: e.background_image,
                genres: e.genres.map(e => e.name + ' '),
                released: e.released,
                rating: e.rating,
                platforms: e.platforms.map(e => e.platform.name)
            }
        })
        const gamesDb = await Videogame.findAll({
            include: {
                model: Genders,
                attributes: ['name'],
                through: {
                    attributes: []
                }
            }
        })

        const gamesTotal = gamesDb.concat(gamesApi)
        
      return gamesTotal
      
    } catch (error) {
        console.log(error)
    }
}

module.exports = {allVideoGames}