import {Link} from 'react-router-dom'
import style from './landing.module.css'

export default function landingPage (){
    return(
        <div className={style.landing}>
            <div className={style.button} >
            <Link to={'/home'}>
            <button>VAMOS BRO DALE CLICK Y JUGATE UNOS GAMES!</button>
            </Link>
            </div>
        </div>
    )
}