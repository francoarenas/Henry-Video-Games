import React from "react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getDetail } from '../../actions'
import { Link } from "react-router-dom"

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

    return(
        <div>
            {
            Object.entries(detail).length ?
            <div>
            <h1> { name ? name : detail[0].name } </h1>
            <img src={background_image ? background_image : detail[0].image} alt={'imagen de ' + name ? name : detail[0].name} />
            <h3> Release Date: { released ? released : detail[0].releaseDate } </h3>
            <h3> Rating: { rating ? rating : detail[0].name } </h3>
            <h3> Description: { description ? description.replace(/(<([^>]+)>)/gi, "") : detail[0].description.replace(/(<([^>]+)>)/gi, "") } </h3>
            <h3> Genres: { genresMap ? genresMap : detail[0].genders.map(e => e.name + ' ') } </h3>
            <h3> Platforms: { platformsMap ? platformsMap : detail[0].platforms } </h3>
            <Link to={'/home'}> <button>VOLVER</button> </Link>
            </div>
            :
            <h1>Loading...</h1>
            }
        </div>
    )
}