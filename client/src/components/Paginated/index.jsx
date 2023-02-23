import React from "react";
import style from './paginated.module.css'

export default function Paginated({gamesPage, allGames, paged}) {
    const pageNumber = []

    for (let i = 0; i < Math.ceil(allGames/gamesPage); i++) {
      pageNumber.push(i+1)
    }
return (
    <nav>
        <ul className={style.pagination}>
            {
                pageNumber?.map(number =>(
                 
                    <li className={style.page} key={number}>
                        <button onClick={()=> paged(number)}>{number}</button>
                    </li>
                ))
            }
        </ul>
    </nav>
)
}