import React from "react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getDetail } from '../../actions'
import { Link } from "react-router-dom"
import style from "./detail.module.css"
import game from "../../image/game.png"
import { AiFillStar } from 'react-icons/ai';

export default function Detail(props){

    const id = props.match.params.id
    const dispatch = useDispatch()
    const detail = useSelector(state => state.detail)

        let {
            name,
            background_image,
            description,
            released,
            rating,
            genresMap,
            platformsMap
        } = detail

    useEffect(() => {
        dispatch(getDetail(id))
    },[])

    let img = background_image ? background_image : detail[0]?.image

    return(
        <div className={style.main}>
            {
            Object.entries(detail).length ?
            <div className={style.card}>
            <img src={img ? img : game} alt={'imagen de ' + name ? name : detail[0].name} />
            <div className={style.conteiner}>
            <h1> { name ? name : detail[0].name } </h1>
            <h3> Release Date: <br /> { released ? released : detail[0].releaseDate } </h3>
            <h3> Rating: <br /> <AiFillStar/> { rating ? rating : detail[0]?.rating } </h3>
            <h3> Description: <br /> { description ? description.replace(/(<([^>]+)>)/gi, "") : detail[0].description.replace(/(<([^>]+)>)/gi, "") } </h3>
            <h3> Genres: <br /> { genresMap ? genresMap : detail[0].genders.map(e => e.name + ' ') } </h3>
            <h3> Platforms: <br /> { platformsMap ? platformsMap : detail[0].platforms } </h3>
            </div>
            <Link to={'/home'}> <button>VOLVER</button> </Link>
            </div>
            :
            <div className={style.loading}><img src="https://opengameart.org/sites/default/files/LoadingBarPractice.gif" alt="" /></div>
            }
        </div>
    )
}