import React from "react";
import { useDispatch } from "react-redux";
import { sortAz } from "../../redux/actions/actions";
import styles from "./Filters.module.css";

const SortAz = ({ pokemons }) => {
    const dispatch = useDispatch();

    // Define una función para manejar el cambio en el select y realizar la acción de orden alfabético
    const handleFilter = (event) => {
        const value = event.target.value;
        dispatch(sortAz(pokemons, value)); // Realiza un dispatch de la acción 'sortAz' con los Pokémon y el valor seleccionado
    };

    return (
        <select className={styles.select} value="default" onChange={handleFilter}>
            {/* 
                Renderiza un select con tres opciones:
                - "Orden alfabético" (deshabilitado)
                - "ASC" (ascendente)
                - "DESC" (descendente)
            */}
            <option disabled value="default">Orden alfabético</option>
            <option value="ASC">ASC</option>
            <option value="DESC">DESC</option>
        </select>
    );
}

export default SortAz;
