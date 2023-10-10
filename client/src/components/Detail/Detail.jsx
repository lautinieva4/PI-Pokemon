import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemonsById } from "../../redux/actions/actions";
import { useParams, Link } from "react-router-dom";
import styles from "./Detail.module.css";

const Detail = () => {
  // Utiliza el hook useSelector para obtener el estado del Redux store
  const pokemon = useSelector((state) => state.pokemons.pokemon) || {};

  // Utiliza useDispatch para obtener la función para despachar acciones
  const dispatch = useDispatch();

  // Obtiene el parámetro 'id' de la URL utilizando el hook useParams de React Router
  const { id } = useParams();

  // Utiliza useEffect para despachar una acción cuando el componente se monta y cuando 'id' cambia
  useEffect(() => {
    dispatch(getPokemonsById(id));
  }, [dispatch, id]);

  // Renderiza la información del Pokémon en una estructura 
  return (
    <div className={styles.card}>
      <div className={styles.container}>
        <img className={styles.img} src={pokemon.image} alt={pokemon.name} />
        <h1 className={styles.name}>{pokemon.name}</h1>

        <h4 className={styles.height}>Altura:</h4>
        <span className={styles.span}>{pokemon.height}</span>

        <h4 className={styles.weight}>Peso:</h4>
        <span className={styles.span}>{pokemon.weight}</span>

        <h4 className={styles.speed}>Velocidad:</h4>
        <span className={styles.span}>{pokemon.speed}</span>

        <h4 className={styles.defense}>Defensa:</h4>
        <span className={styles.span}>{pokemon.defense}</span>

        <h4 className={styles.hp}>Hp:</h4>
        <span className={styles.span}>{pokemon.hp}</span>

        <h4 className={styles.attack}>Ataque:</h4>
        <span className={styles.span}>{pokemon.attack}{pokemon.minAttack}</span>

        <h4 className={styles.types}>Tipos:</h4>
        <span className={styles.span} >{pokemon.types}</span>
        <br />

        {/* Agrega un enlace de retorno a la página de inicio */}
        <Link to="/home">
          <button className={styles.button}>Home</button>
        </Link>
      </div>
    </div>
  );
};

export default Detail;

