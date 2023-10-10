import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getTypes, filterPokemonsByTypes } from "../../redux/actions/actions"
import styles from "./Filters.module.css"

const FilterByTy = () => {
    const dispatch = useDispatch();

    // Obtiene los tipos y los Pokémon del estado global utilizando el hook useSelector
    const types = useSelector(state => state.types);
    const pokemons = useSelector(state => state.pokemons);

    // Maneja el evento de cambio en el select para filtrar por tipos
    const handleFilterByTypes = (event) => {
        const types = event.target.value;
        dispatch(filterPokemonsByTypes(types, pokemons));
    };

    // Utiliza useEffect para obtener los tipos de Pokémon al cargar el componente
    useEffect(() => {
        dispatch(getTypes());
    }, [dispatch]);

    // Define la variable 'showTy' que representa el select con las opciones de tipos
    const showTy = (
        <select className={styles.select} value="default" onChange={handleFilterByTypes}>
            <option disabled value="default">Filtrar por tipo</option>
            {types.map((types) => (
                <option key={types.id} value={types.name}>
                    {types.name}
                </option>
            ))}
        </select>
    );

    // Renderiza el select que permite filtrar por tipos
    return (
        <div>
            {showTy}
        </div>
    );
}

export default FilterByTy;
