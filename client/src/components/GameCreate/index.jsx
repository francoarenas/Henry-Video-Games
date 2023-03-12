import { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Link } from 'react-router-dom'
import {gameCreate, getGames, getGenres} from '../../actions'
import { validate } from './formJS'
import imagen from '../../image/game.png'
import style from './form.module.css'
import { useHistory } from "react-router-dom";

export default function CreateGame(){
    let key
    const genres = useSelector(state => state.genres)
    const allGames = useSelector(state => state.allGames)
    const dispatch = useDispatch()
    const history = useHistory()
    
    const [form, setForm] = useState({
        name: '',
        description: '',
        releaseDate: '',
        rating: 0,
        genres: [],
        platforms: [],
        image: `${imagen}`
    })

    const [errors, setErrors] = useState({
        name: ''
    })

    useEffect(() => {
        dispatch(getGames())
        dispatch(getGenres())
    },[dispatch])

    const aux = allGames?.map(a => a.platforms)
    let platforms = []
    
    for (let i = 0; i < aux.length; i++) {
        for (let j = 0; j < aux[i].length; j++){
            if(!platforms.includes(aux[i][j])){
               platforms.push(aux[i][j])
            }
        }
    }
    
    function handleInput(e){
            setForm({
                ...form,
                [e.target.name] : e.target.value
            })
            setErrors(validate({
                ...form,
                [e.target.name] : e.target.value
            }))
    }

    function handleCheckbox(e){

    if(e.target.name === 'genres'){
        
    if(!form.genres.includes(e.target.value)){
            setForm({
                ...form,
                genres : [...form.genres,e.target.value]
            })
            setErrors(validate({
                ...form,
                genres : [...form.genres,e.target.value]
            }))
        }
    else{
            setForm({
                ...form,
                genres : form.genres.filter(a => a !== e.target.value)
            })
            setErrors(validate({
                ...form,
                genres : form.genres.filter(a => a !== e.target.value)
            }))
        }
    }

    if(e.target.name === 'platforms'){

    if(!form.platforms.includes(e.target.value)){
            setForm({
                ...form,
                platforms : [...form.platforms,e.target.value]
            })
            setErrors(validate({
                ...form,
                platforms : [...form.platforms,e.target.value]
            }))
        }
    else{
            setForm({
                ...form,
                platforms : form.platforms.filter(a => a !== e.target.value)
            })
            setErrors(validate({
                ...form,
                platforms : form.platforms.filter(a => a !== e.target.value)
            }))
        }
    }
    }

    function handleSubmit(e){
        e.preventDefault()
        dispatch(gameCreate(form))
        alert('GAME CREATE successful!')
        history.push("/home")
    }

    return(
        <div className={style.root}>
            
           <h1>Create Games</h1>
           
           <form action="">
            <div className={style.conteiner}>
            <label>NAME <br/>
            <input type="text" name='name' onChange={e => handleInput(e)}/>
            </label>

            {errors.name && <p className={style.errors}>{errors.name}</p>}

            <label>DESCRIPTION <br/>
            <input type="text" name='description' onChange={e => handleInput(e)}/>
            </label>

            {errors.description && <p className={style.errors}>{errors.description}</p>}

            <label>RELEASE DATE <br/>
            <input type="date" name='releaseDate' onChange={e => handleInput(e)}/>
            </label>

            {errors.releaseDate && <p className={style.errors}>{errors.releaseDate}</p>}

            <label>RATING <br/>
            <input type="number" name='rating' min='0' max='5' placeholder='1 a 5' onChange={e => handleInput(e)}/>
            </label>

            {errors.rating && <p className={style.errors}>{errors.rating}</p>}

            <label>IMAGEN LINK <br/>
            <input type="text" name='image' onChange={e => handleInput(e)}/>
            </label>

            {errors.image && <p className={style.errors}>{errors.image}</p>}
            
            <label>GENRES</label>

            {errors.genres && <p className={style.errors}>{errors.genres}</p>}

            <div>
            <div className={style.checkbox}>
            {
                genres?.map(e => {
                    
                    return(
                        <>
                        <input type="checkbox" name='genres' value={e.name} key={e.key} onChange={e => handleCheckbox(e)}/>
                        <label key={key++}>{e.name}</label>
                        </>
                    )
                })
            }
            </div>
            </div>

            <label htmlFor="">PLATFORMS</label>

            {errors.platforms && <p className={style.errors}>{errors.platforms}</p>}

            <div>
            <div className={style.checkbox}>
            {
                platforms?.map(e => {
                    
                    return(
                        <>
                        <input type="checkbox" name='platforms' value={e} onChange={e => handleCheckbox(e)}/>
                        <label >{e}</label>
                        </>
                    )
                })
            }
            </div>
            </div>
            </div>

            <div>
            <br/>
        <button className={Object.entries(errors).length && style.disabled} type="submit" disabled={Object.entries(errors).length} onClick={e => handleSubmit(e)}>CREATE GAME</button>
        <br/>
        <br/>
        <div><Link to='home'><button>VOLVER</button></Link></div>

            </div>

           </form>
        </div>
    )
}