import React from "react";
//importo los hooks que voy a usar de react
import { useState, useEffect } from 'react';
//importo los hooks de react-redux (previamente los instalo npm i react-redux)
import { useDispatch, useSelector } from 'react-redux';
//importo las actions que me interesa usar en este componente
import { getDogs, getTemperaments, filterDogsByTemperament, filterCreated, order} from "../actions";
import { Link } from "react-router-dom";
//importo los componentes que voy a usar 
import Card from "./Card";
import Paginado from "./Paginado";
import styles from './Home.module.css'
import SearchBar from "./SearchBar";

export default function Home(){
    const dispatch = useDispatch()
    const allDogs = useSelector((state) => state.dogs)
    const allTemperaments = useSelector((state) => state.temperaments)
    const [orden, setOrden] = useState('')
    const [currentPage, setCurrentPage] = useState(1) // mi página actual -> siempre arranca en 1
    const [dogsPerPage, setdogsPerPage] = useState(8) // mis perros por pagina siempre van a ser 8
    const indexOfLastDog = currentPage * dogsPerPage // 8
    const indexOfFirstDog = indexOfLastDog - dogsPerPage // 0
    const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog)
    //P.1 -> 0-----8
    //P.2 -> 8-----16
    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    useEffect (()=> {
        dispatch(getDogs())
    }, [dispatch])

    useEffect (()=> {
        dispatch(getTemperaments())
    }, [dispatch])

    function handleClick(e){
        e.preventDefault();
        dispatch(getDogs());
        setCurrentPage(1);
    }

    function handleFilterTemperament(e){
        dispatch(filterDogsByTemperament(e.target.value))
    }

    function handleFilterCreated(e){
        dispatch(filterCreated(e.target.value))
    }

    function handleSort (e) {
        e.preventDefault();
        dispatch(order(e.target.value));
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`);
    }

    return (
        <div >
            <div className={styles.color_section}>
            <h1 className={styles.title}>My Dogs Application</h1>
                <div>
                    <Link to='/dog'><button className={styles.btn_grad} title="Crear nuevo perro">Crear nuevo</button></Link>
                    <button onClick={e => {handleClick(e)}} className={styles.btn_grad}>Todas las razas</button>
                </div>
                                
                    <select onChange={e => handleSort(e)} className={styles.option}>
                        <optgroup label="Nombre">
                            <option value='asc_name'>Ascendente</option>
                            <option value='desc_name'>Descendente</option>
                        </optgroup>
                        <optgroup label="Peso">
                            <option value='asc_weight'>Ascendente</option>
                            <option value='desc_weight'>Descendente</option>
                        </optgroup>
                    </select>
                    <select onChange={e => handleFilterTemperament(e)} className={styles.option}>
                        {allTemperaments && allTemperaments.map((t) => {
                            return (
                            <option key={t.id} value={t.name}>
                                {t.name}
                            </option>
                            );
                        })}

                    </select>
                    <select onChange={e => handleFilterCreated(e)} className={styles.option}>
                        <option value='all'>Todos</option>
                        <option value='created'>Creados</option>
                        <option value='api'>Existente</option>
                    </select>
                    <SearchBar />

                </div>
                <div className={styles.image}>
                    
                    <Paginado 
                        dogsPerPage={dogsPerPage} 
                        allDogs={allDogs.length}
                        paginado={paginado}
                    />
                
                    {currentDogs && currentDogs.map(d => {
                        return(
                            <>
                            <Link to={`/home/${d.id}`} style={{cursor: 'default'}}>
                                <Card name={d.name} image={d.image} temperament={d.temperament ? d.temperament : d.temperaments && d.temperaments.map(t => t.name + ' ')} weight={d.weight}></Card>
                            </Link>
                            </>
                        )
                    })}
                </div>
        </div>
    )

}

