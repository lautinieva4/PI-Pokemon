import React from "react";
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPokemons } from "../../redux/actions/actions";
import { NavLink } from "react-router-dom";
import styles from "./Home.module.css"
import FilterByTy from "../Filtros/FilterByTy";
import SortAz from "../Filtros/SortAz";
import SortAttack from "../Filtros/SortAttack";
import From from "../Filtros/From"
import CardsContainer from "../CardContainer/CardContainer";

export default function Home() {
    const dispatch = useDispatch();
    const pokemons = useSelector(state => state.pokemons);
    
    useEffect(() => {
        dispatch(fetchPokemons()); // Realiza una llamada para obtener los datos de los Pokémon al cargar la página
    }, [dispatch]);

    // Función para manejar el clic en el botón "¡Vuelvan pokemons!"
    function handleClick(e) {
        e.preventDefault();
        dispatch(fetchPokemons()); // Realiza una llamada para obtener los datos de los Pokémon nuevamente
    }

    return (
        <div className={styles.container}>
            {/* Renderiza una imagen y un botón para crear un nuevo Pokémon */}
            <img className={styles.img} src={"https://i.pinimg.com/564x/de/ce/2f/dece2f5a82efd12543b381adf519b1ba.jpg"} alt="GoPokemon" />
            <NavLink to='/create'><button className={styles.button53}>¡Creá tu pokemon!</button></NavLink>
            
            {/* Renderiza varios componentes de filtros */}
            <div className={styles.filtersContainer}>
                <FilterByTy className={styles.filter} /> {/* Componente para filtrar por tipos */}
                <SortAz pokemons={pokemons} className={styles.filter}/> {/* Componente para ordenar alfabéticamente */}
                <SortAttack className={styles.filter} pokemons={pokemons}/> {/* Componente para ordenar por ataque */}
                <From className={styles.filter}/> {/* Componente para seleccionar la fuente de datos */}
                <button className={styles.button} onClick={handleClick}>¡Vuelvan pokemons!</button> {/* Botón para recargar los Pokémon */}
            </div>

            {/* Renderiza el contenedor de tarjetas de Pokémon */}
            <div>
                <CardsContainer className={styles.cardsContainer} pokemons={pokemons} /> {/* Contenedor de tarjetas de Pokémon */}
            </div>
        </div>
    )
}
