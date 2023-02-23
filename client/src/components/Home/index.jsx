import React,{useEffect,useState} from "react";
import {useDispatch,useSelector} from 'react-redux';
import Filtros from '../Filtros';
import SearchBar from "../SearchBar";
import Card from "../Card";
import { getGames,getGenres} from "../../actions";
import style from './home.module.css'
import { Link } from "react-router-dom";
import Paginated from "../Paginated";


export default function Home(){

        const dispatch = useDispatch()
        const allGames = useSelector((state) => state.videoGames)
        const render = useSelector((state) => state.render)

        
    const [page, setPage] = useState(1)
    const [gamesPage, setGamePage] = useState(6)

    const lastGameIndex = page * gamesPage;
    const firstGameIndex = lastGameIndex - gamesPage;
    var gamePerPage = allGames.slice(firstGameIndex,lastGameIndex)
    
    const paged = function(pageNumber) {
        setPage(pageNumber)
    };

        useEffect(function (){
            dispatch(getGames());
            dispatch(getGenres())
        },[dispatch])  
console.log(allGames)
    return(
        <>
        <div className={style.head}>
            <Link to={'/create'}><button>GAME CREATE</button></Link>

            <SearchBar/>
        </div>
            <Paginated 
            gamesPage={gamesPage} 
            allGames={allGames.length}
            paged={paged}
            />
<div className={style.conteiner}>
            <div className={style.filtros}>
            <Filtros paged={paged}/>
            </div>
        <div>
            <div className={style.grid}>
            {
                
                gamePerPage.length !== 0 ? 
                gamePerPage.map(e => {
                    return <Card
                    key={e.id}
                    id={e.id}
                    name={e.name}
                    image={e.image}
                    genres={e.genres ? e.genres : e.genders.map(a => `${a.name} `)}
                  rating={e.rating}
                />
                
            }) : <div className={style.loading}><img src="https://opengameart.org/sites/default/files/LoadingBarPractice.gif" alt="" /></div>
            }
            </div>
        </div>
        </div>
            <Paginated 
            gamesPage={gamesPage} 
            allGames={allGames.length}
            paged={paged}
            />
            <br />
            <br />
        </>
    )
}