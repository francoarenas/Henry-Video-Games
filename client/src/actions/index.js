import axios from 'axios'
import { GET_GAMES,GET_DETAILS,GET_GENRES,ORDEN_SORT,FILTER_GENRES,GAME_SEARCH } from './variables'


function getGames(){
    return async function(dispatch){
      try {
        const games = await axios.get('/videogames')
        return dispatch({
          type: GET_GAMES,
          payload: games.data
        })

      } catch (error) {
        console.log(error)
      }
    }
}

function getDetail(id){
  return async function(dispatch){
    try {
      const detail = await axios.get('/videogame/' + id)
      return dispatch({
        type: GET_DETAILS,
        payload: detail.data
      })
      
    } catch (error) {
      console.log(error)
    }
  }
}

function getGenres(){
  return async function(dispatch){
    try {
      const genres = await axios.get('/genres')
      return dispatch({
        type: GET_GENRES,
        payload: genres.data
      })
      
    } catch (error) {
      console.log(error)
    }
  }
}

function gameCreate(game){
  return async function(){
    try {

      let response = await axios.post('/videogames/gamecreate', game)
      return response

    } catch (error) {
      console.log(error)
    }
  }
}

function ordenamiento(payload){
    return{
      type: ORDEN_SORT,
      payload
    }
  }

function filterGenres(payload){
    return{
      type: FILTER_GENRES,
      payload
    }
}

function searchGame(name){
  return async function(dispatch){

    try {
      const games = await axios.get(`/videogames?name=${name}`)
      
      return dispatch({
        type: GAME_SEARCH,
        payload: games.data
      })
      
    } catch (error) {
       alert(error.response.data)
      // dispatch(getGames())
    }
  }
}

export {getGames,getDetail,getGenres,ordenamiento,filterGenres,searchGame,gameCreate}