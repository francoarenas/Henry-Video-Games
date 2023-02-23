import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getGenres,ordenamiento,filterGenres, getGames } from "../../actions"
import style from './filtros.module.css'


export default function Filtros({paged}){
    const dispatch = useDispatch()
    const genres = useSelector(state => state.genres)
    const genress = useSelector(state => state.videoGames)
console.log(genress)
    useEffect(function () {
        dispatch(getGenres())
    },[])

    function handleSelect(e){
    
    if(e.target.value === 'ASC' || e.target.value === 'DESC' || e.target.value === 'A-Z' || e.target.value === 'Z-A') {
        dispatch(ordenamiento(e.target.value))
    }
    
    else{
        dispatch(filterGenres(e.target.value))
        paged(1)
    }
    }
    
    function handeClick(e){
        dispatch(getGames())
    }

    return(
        <div className={style.conteiner}>
<div className={style.btnColumn}>
        <button onClick={e => handeClick(e)}>Clean Filters</button>
        </div>
        <h1 className={style.titulos}>RATING</h1>

        <div className={style.btnColumn}>
        <button value="ASC" onClick={e => handleSelect(e)}>Mayor a Menor</button>
        <button value="DESC" onClick={e => handleSelect(e)}>Menor a Mayor</button>
        </div>

        <h1 className={style.titulos}>ALPHABETIC</h1>

        <div className={style.btnColumn}>
        <button value="A-Z" onClick={e => handleSelect(e)}>A-Z</button>
        <button value="Z-A" onClick={e => handleSelect(e)}>Z-A</button>
        </div>

        <h1 className={style.titulos}>GENEROS</h1>
        <div className={style.btnColumn}>
        <button value="ALL" onClick={e => handleSelect(e)}>ALL</button>
        {
            genres?.map(e => {
                return <button value={e.name} key={e.id} onClick={e => handleSelect(e)}>{e.name}</button>
            })
        }

        </div>

        </div>
    )
}