import React from "react";
import { Link } from 'react-router-dom';
import styles from './LandingPage.module.css'

export default function LandingPage() {
    return (
        <div className={styles.image}>
            <div>
                <h1 className={styles.titulo}>The Dogs Application</h1>
                    <Link to = '/home'>
                <button className={styles.button}>Ingresar</button>
            </Link>
            </div>
        </div>
    )
}