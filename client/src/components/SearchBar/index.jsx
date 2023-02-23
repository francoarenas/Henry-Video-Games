import { useState } from "react"
import { useDispatch } from "react-redux"
import { searchGame } from "../../actions"
import style from './searchbar.module.css'

export default function SearchBar({game}){

    const dispatch = useDispatch()
    const [input, setInput] = useState('')

    function handleChange(e){
    console.log(input)
    setInput(e.target.value)
    }
    
    function handleClick(){
        console.log(input)
        dispatch(searchGame(input))
        setInput('')
        }
        
    return(
        <div className={style.search}>
            <label><input type="text" placeholder="Buscar..." value={input} onChange={e => handleChange(e)}/><button onClick={handleClick}>BUSCAR</button></label>
            <h2>{game}</h2>
        </div>
    )
}