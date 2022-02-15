import React from "react";
import styles from "./Paginado.module.css";

export default function Paginado ({dogsPerPage, allDogs, paginado}){
    const pageNumbers = [];

    for (let i=1; i <= Math.ceil(allDogs/dogsPerPage); i++){
        pageNumbers.push(i)
    }
    return (
        <nav >
            <ul >
                { pageNumbers && pageNumbers.map(n => (
                    <li  key={n} className={styles.nav_li}>
                        <a className={styles.nav_a} onClick={() =>  paginado(n)}>{n}</a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}