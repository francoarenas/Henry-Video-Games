import { Link } from "react-router-dom"
import style from './card.module.css'
import imagen from '../../image/gameover.png'

export default function Card({name,image,genres,rating,id}){

    return(

        <div className={style.card}>
        <Link to={'/videogame/' + id}>
        <img src={image ? image : imagen} alt="Game" width={'500px'} height={'400px'} />
        </Link>
        <h1>{name}</h1>
        <h3>Rating: {rating}</h3>
        <h3>Genres: {genres}</h3>
        <Link to={'/videogame/' + id}><button>Mas Informacion</button></Link>
        </div>

    )
}