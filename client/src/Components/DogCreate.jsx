import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { getTemperaments, postDog } from '../actions/index';
import { useDispatch, useSelector} from 'react-redux';
import styles from './DogCreate.module.css'

function validate(input){
    let errors = {};
    if (!input.name) {
        errors.name = 'Ingrese un nombre!!';
    }
    else if (/^([0-9])*$/.test(input.name)){
        errors.name = 'Solo caracteres!!'
    }

    if (!input.weight) {
        errors.weight = 'Ingrese un peso!!';
    }
    else if (!(/^\d{1,2} - \d{1,2}$/.test(input.weight))) {
        errors.weight = 'Incorrecto!! - el formato debe ser = min - max';
    }
    else if (parseInt(input.weight.substr(4,5)) < parseInt(input.weight.substr(0,2))) {
        errors.weight = 'Incorrecto!! - el máximo debe ser mayor al mínimo'
    }

    if (!input.height) {
        errors.height = 'Ingrese la altura!!';
    }
    else if (!(/^\d{1,2} - \d{1,2}$/.test(input.height))) {
        errors.height = 'Incorrecto!! - el formato debe ser = min - max';
    }
    else if (parseInt(input.height.substr(4,5)) < parseInt(input.height.substr(0,2))) {
        errors.height = 'Incorrecto!! - el máximo debe ser mayor al mínimo'
    }

    if (!input.life_span) {
        errors.life_span = 'Ingrese la esperanza de vida!!';
    }
    else if (!(/^\d{1,2} - \d{1,2}$/.test(input.life_span))) {
        errors.life_span = 'Incorrecto!! - el formato debe ser = min - max';
    }
    else if (parseInt(input.life_span.substr(4,5)) < parseInt(input.life_span.substr(0,2))) {
        errors.life_span = 'Incorrecto!! - el máximo debe ser mayor al mínimo'
    }
    return errors;
}

export default function DogCreate() {
    const dispatch = useDispatch()
    const history = useHistory()
    const temperaments = useSelector(state => state.temperaments)
    const [errors, setErrors] = useState({})

    const [input, setInput] = useState({
        name:"",
        height: "",
        weight: "",
        life_span: "",
        temperament: []
    })

    useEffect(() => {
        dispatch(getTemperaments());
    }, [dispatch]);

    function handleChange(e){
        // if (e.target.name === 'life_span'){
        //     setInput({
        //         ...input,
        //         [e.target.name]: e.target.value 
        //     })    
        // } else {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
        console.log(input)
    }

    function handleSelect(e){
        setInput({
            ...input,
            temperament:[...input.temperament, e.target.value]
        })
    }

    function handleSubmit(e){
        e.preventDefault();
        console.log(input)
        dispatch(postDog(input));
        alert("Perro creado")
        setInput({
            name:"",
            height: "",
            weight: "",
            life_span: "",
            temperament: []
        })
        history.push('/home')
    }
    
    return (
        <div>
            <h1 className={styles.titulo}>Crea tu perro</h1>
            <form onSubmit={e => handleSubmit(e)} className={styles.form}>
                <div>
                    <label >Nombre:</label>
                    <input type="text" value={input.name} name="name" onChange={handleChange} placeholder='Ingrese el nombre...' className={styles.input}></input>
                    {errors.name && <p className={styles.danger}>{errors.name}</p>}
                </div>
                <div>
                    <label>Peso (formato min - max):</label>
                    <input type="text" value={input.weight} name="weight" onChange={handleChange} placeholder='Ingrese el peso...'className={styles.input}></input>
                    {errors.weight && <p className={styles.danger}>{errors.weight}</p>}
                </div>
                <div>
                    <label>Altura (formato min - max):</label>
                    <input type="text" value={input.height} name="height" onChange={handleChange} placeholder='Ingrese la altura...'className={styles.input}></input>
                    {errors.height && <p className={styles.danger}>{errors.height}</p>}
                </div>
                <div>
                    <label>Esperanza de vida (formato min - max):</label>
                    <input type="text" value={input.life_span} name="life_span" onChange={handleChange} placeholder='Ingrese la esperanza de vida...'className={styles.input}></input>
                    {errors.life_span && <p className={styles.danger}>{errors.life_span}</p>}
                </div>
                    <label>Temperamento (seleccione uno o mas...):</label>
                    <select onChange={e => handleSelect(e)} placeholder='Temperamentos...' className={styles.input}>
                        {temperaments.map(t => (
                            <option value={t.name}>{t.name}</option>
                        ))}
                    </select>
                <ul className={styles.li_temp}>
                    <li >{input.temperament.map(t => t + ", ")}</li>
                </ul>
                <div className={styles.link}>
                    <button 
                        type="submit" 
                        disabled={
                            !input.name || !input.weight || !input.height ? true : false
                        }
                        className={styles.submit_btn}>
                        Crear perro
                    </button>
                </div>
                <div className={styles.link}>
                    <Link to='/home'>
                        <button type="submit" className={styles.submit_btn}>Volver al home</button>
                    </Link>
                </div>
            </form>
        </div>
    )
    
}
