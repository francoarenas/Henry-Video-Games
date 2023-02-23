import { GET_GAMES,GET_DETAILS,GET_GENRES,ORDEN_SORT,FILTER_GENRES,GAME_SEARCH } from '../actions/variables'

const initialState = {
videoGames: [],
allGames: [],
detail: [],
genres: [],
render: 0
}

function rootReducer(state=initialState,action){

    switch (action.type) {

        case GET_GAMES:
            return{
                ...state,
                videoGames: action.payload,
                allGames: action.payload
            }

        case GET_DETAILS:
            return{
                ...state,
                detail: action.payload
            }

        case GET_GENRES:
            return{
                ...state,
                genres: action.payload
            }
    
        case ORDEN_SORT: 
             let ordenSort
             let render
            
             if(action.payload === 'DESC'){
                ordenSort = state.videoGames.sort((a,b) => {
                   if(a.rating > b.rating ) return 1
                   if(a.rating < b.rating ) return -1
                   return 0
               })
               state.render ? render = 0 : render = 1
            }
            if(action.payload === 'A-Z'){
                ordenSort = state.videoGames.sort((a,b) => {
                              if(a.name > b.name ) return 1
                              if(a.name < b.name ) return -1
                              return 0
                          })
                          state.render ? render = 0 : render = 1
                       }
            if(action.payload === 'ASC'){
                ordenSort = state.videoGames.sort((a,b) => {
                    if(a.rating < b.rating ) return 1
                    if(a.rating > b.rating ) return -1
                    return 0
                })
                state.render ? render = 0 : render = 1
            }
            if(action.payload === 'Z-A'){
                ordenSort = state.videoGames.sort((a,b) => {
                               if(a.name < b.name ) return 1
                               if(a.name > b.name ) return -1
                               return 0
                           })
                           state.render ? render = 0 : render = 1
                       }

            return{
                ...state,
                videoGames: ordenSort,
                render: render
            }

        case FILTER_GENRES:
            
            if(action.payload === 'ALL'){
                return{
                    ...state,
                    videoGames: state.allGames
                }
            }

            const filterGenres = state.allGames.filter(e => e.genres ? e.genres.includes(action.payload + ' ') : e.genders.filter(e => e.name === action.payload))

            return{
                ...state,
                videoGames: filterGenres
            }

        case GAME_SEARCH:
            console.log(action.payload)
            return{
                ...state,
                videoGames: action.payload
            }
             
        default:
            return state
    }
}

export default rootReducer