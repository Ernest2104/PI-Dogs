import React from "react";
import styles from './Card.module.css'

export default function Card({ name, image, temperament, weight}) {
    return (
        <div className={styles.card}>
            <h3>{name}</h3>
            <img src={image} alt="img not found" className={styles.image}/>
            <div className={styles.temp_width}>
                <h5>{temperament}</h5>
            </div>
            <h5>De {weight} Kgs.</h5>
        </div>
    )
};

//