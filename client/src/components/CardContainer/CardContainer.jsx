import React, { useState, useEffect } from 'react';
import Card from '../Cards/Card'; // Importa el componente Card desde otro archivo
import styles from './Container.module.css'; // Importa estilos CSS desde un archivo llamado 'Container.module.css'

const CardsContainer = ({ pokemons }) => {
  // Define constantes y estados iniciales
  const ITEMS_PER_PAGE = 13; // Número de tarjetas por página
  const [currentPage, setCurrentPage] = useState(1); // Estado para el número de página actual
  const [filteredPokemons, setFilteredPokemons] = useState([]); // Estado para los Pokémon filtrados
  const [searchName, setSearchName] = useState(''); // Estado para el nombre de búsqueda

  // useEffect se utiliza para ejecutar efectos secundarios cuando cambian ciertos valores
  useEffect(() => {
    if (Array.isArray(pokemons)) { // Verifica si 'pokemons' es un array
      // Filtra la lista de pokémons en función del nombre de búsqueda
      const filtered = pokemons.filter((pokemon) => {
        const nameMatch = !searchName || pokemon.name.toLowerCase().includes(searchName.toLowerCase());
        return nameMatch;
      });
      setFilteredPokemons(filtered); // Actualiza el estado de 'filteredPokemons' con los resultados del filtro
      setCurrentPage(1); // Restablece la página actual a 1 cuando cambias el filtro
    }
  }, [searchName, pokemons]); // Este efecto se ejecutará cuando cambie 'searchName' o 'pokemons'

  // Calcula los índices para mostrar solo un subconjunto de tarjetas en la página actual
  const lastIndex = currentPage * ITEMS_PER_PAGE;
  const firstIndex = lastIndex - ITEMS_PER_PAGE;
  const currentPokemons = filteredPokemons.slice(firstIndex, lastIndex);

  // Funciones para manejar la paginación
  const firstPageHandler = () => {
    setCurrentPage(1);
  };

  const lastPageHandler = () => {
    const totalPages = Math.ceil(filteredPokemons.length / ITEMS_PER_PAGE);
    setCurrentPage(totalPages);
  };

  const prevHandler = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextHandler = () => {
    if (currentPokemons.length === ITEMS_PER_PAGE) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div>
      <div>
        {/* Input para buscar Pokémon */}
        <input
          type="text"
          placeholder="Buscar Pokémon"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          className={styles.button}
        />
        {/* Botones para la paginación */}
        <button className={styles.button} onClick={firstPageHandler}>
          First
        </button>
        <button className={styles.button} onClick={prevHandler}>
          Prev
        </button>
        <span className={styles.button}>{currentPage}</span>
        <button className={styles.button} onClick={nextHandler}>
          Next
        </button>
        <button className={styles.button} onClick={lastPageHandler}>
          Last
        </button>
      </div>
      <div>
        {/* Renderiza las tarjetas de Pokémon */}
        {currentPokemons.length > 0 ? (
          <>
            {currentPokemons.map((pokemon) => {
              return (
                <Card
                  key={pokemon.id}
                  id={pokemon.id}
                  name={pokemon.name}
                  image={pokemon.image}
                  attack={pokemon.attack}
                  types={pokemon.types}
                />
              );
            })}
          </>
        ) : (
          // Si no hay resultados, muestra una tarjeta con un mensaje de "El Pokémon no existe"
          <>
            <Card
              key="no-info"
              id="no-info"
              name="El Pokémon no existe"
              image=""
              attack="no-info"
              types="no-info"
            />
          </>
        )}
      </div>
    </div>
  );
};

export default CardsContainer;

