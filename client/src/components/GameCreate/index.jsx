import { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Link } from 'react-router-dom'
import {gameCreate, getGames, getGenres} from '../../actions'
import { validate } from './formJS'
import imagen from '../../image/gameover.png'
import style from './form.module.css'

export default function CreateGame(){
    let key
    const genres = useSelector(state => state.genres)
    const allGames = useSelector(state => state.allGames)
    const dispatch = useDispatch()
    
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
    }
    console.log(form.image.slice(0,-4))
    return(
        <div className={style.root}>

           <h1 className={style.conteiner}>Create Games</h1>
           
           <div className={style.button}><Link to='home'><button>HOME</button></Link></div>

           <form action="">
            <label className={style.conteiner}>NAME
            <input type="text" name='name' onChange={e => handleInput(e)}/>
            </label>

            {errors.name && <p className={style.errors}>{errors.name}</p>}

            <label className={style.conteiner}>DESCRIPTION
            <input type="text" name='description' onChange={e => handleInput(e)}/>
            </label>

            {errors.description && <p className={style.errors}>{errors.description}</p>}

            <label className={style.conteiner}>RELEASE DATE
            <input type="date" name='releaseDate' onChange={e => handleInput(e)}/>
            </label>

            {errors.releaseDate && <p className={style.errors}>{errors.releaseDate}</p>}

            <label className={style.conteiner}>RATING
            <input type="number" name='rating' placeholder='1 a 5' onChange={e => handleInput(e)}/>
            </label>

            {errors.rating && <p className={style.errors}>{errors.rating}</p>}

            <label className={style.conteiner}>IMAGEN LINK
            <input type="text" name='image' onChange={e => handleInput(e)}/>
            </label>

            {errors.image && <p className={style.errors}>{errors.image}</p>}
            
            <label className={style.conteiner}>GENRES</label>

            {errors.genres && <p className={style.errors}>{errors.genres}</p>}

            <div className={style.conteiner}>
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

            <label htmlFor="" className={style.conteiner}>PLATFORMS</label>

            {errors.platforms && <p className={style.errors}>{errors.platforms}</p>}

            <div className={style.conteiner}>
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

            <div className={style.button}>
        <button type="submit" disabled={Object.entries(errors).length} onClick={e => handleSubmit(e)}>CREATE GAME</button>
            </div>

           </form>
        </div>
    )
}