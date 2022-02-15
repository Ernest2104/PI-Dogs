import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDogDetail } from "../actions";
import { useEffect } from "react";
import styles from './Detail.module.css'

export default function Detail(props){
    //console.log(props)
    const dispatch = useDispatch();
    const myDogs = useSelector(state => state.detail)
    
    useEffect(() => {
        dispatch(getDogDetail(props.match.params.id))
        return () => {
        }
    },[])

    return (
        <div>
            {
                myDogs.length > 0 ?
                <div className={styles.marco}>
                    <h1>{myDogs[0].name}</h1>
                    <img src={myDogs[0].image} alt="img not found" className={styles.image}/>
                    <h3>Temperamentos: {myDogs[0].temperament ? myDogs[0].temperament : myDogs[0].temperaments.map(t => t.name)}</h3>
                    <h4>Peso: {myDogs[0].weight} Kgs.</h4>
                    <h4>Altura: {myDogs[0].height} cms.</h4>
                    <h4>Esperanza de vida: {myDogs[0].life_span}</h4>
                </div> : <p>loading...</p>
            }
            <Link to='/home'>
                <button>Volver al Home</button>
            </Link> 
    </div>
    )

}



