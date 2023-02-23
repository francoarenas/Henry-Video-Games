const { default: axios } = require('axios')
const express = require('express')
const router = express.Router()
const {Genders} = require('../db')
const {API_KEY} = process.env

router.get('/', async (req,res) => {
try {
     const infoAPi = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)

     infoAPi.data.results.forEach(e => {
        Genders.findOrCreate({
            where: {name: e.name}
         })
     })

     const genres = await Genders.findAll({
        attributes: ['name','id'],
        through: {
            attributes: []
        }
     })
    
     genres.length ?
     res.status(200).send(genres) :
     res.status(404).send('algo salio mal')

} catch (error) {
    console.log(error)
}
})

module.exports = router