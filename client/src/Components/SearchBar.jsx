import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameDogs } from "../actions";
import styles from './SearchBar.module.css'

export default function SearchBar (){
    const dispatch = useDispatch()
    const [name, setName] = useState('')
    const [error, setError] = useState('')

    function handleInputChange(e){
        e.preventDefault()
        setName(e.target.value)
        console.log(name)
    }

    function handleSubmit(e){
        e.preventDefault()
        dispatch(getNameDogs(name))
        setName("")
    }

    return (
        <div>
            <input type="search" placeholder="Buscar..." onChange={e => handleInputChange(e)} value={name} className={styles.search}/>
            <button type="submit" onClick={e => handleSubmit(e)} className={styles.btn_search} title="Buscar x raza"></button>
        </div>
    )
}