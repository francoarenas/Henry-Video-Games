import { Link } from 'react-router-dom'
import style from './landing.module.css'
import img from '../../image/game.png'
import { SiGamejolt } from 'react-icons/si';

export default function landingPage() {
    return (
        <div className={style.landing}>

            <Link to={'/home'}>
                <button className={style.gameButton}>
                    <div className={style.gameButtonInner}>
                        <span className={style.gameIcon}></span>
                        <span className={style.gameText}>PLAY</span>
                    </div>
                </button>
            </Link>

        </div>
    )
}