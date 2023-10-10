import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { sortAttack } from "../../redux/actions/actions";
import styles from "./Filters.module.css";

const SortAttack = ({ pokemons }) => {
    const dispatch = useDispatch();
    
    // Define un estado local para el orden de clasificación y lo inicializa en "default"
    const [sortingOrder, setSortingOrder] = useState("default");

    // Maneja el cambio en el select para establecer el orden de clasificación y realizar la acción de clasificación
    const handleSort = (order) => {
        setSortingOrder(order);
        dispatch(sortAttack(pokemons, order)); // Realiza un dispatch de la acción 'sortAttack' con los Pokémon y el orden seleccionado
    };

    return (
        <div>
            {/* 
                Renderiza un select con tres opciones:
                - "Filtrar por ataque" (deshabilitado)
                - "Menor a mayor ataque"
                - "Mayor a menor ataque"
            */}
            <select className={styles.select} value={sortingOrder} onChange={(e) => handleSort(e.target.value)}>
                <option value="default" disabled>Filtrar por ataque</option>
                <option value="low-high">Menor a mayor ataque</option>
                <option value="high-low">Mayor a menor ataque</option>
            </select>
        </div>
    );
};

export default SortAttack;

