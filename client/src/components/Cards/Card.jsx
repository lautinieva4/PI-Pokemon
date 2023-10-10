import style from './Card.module.css'; // Importa estilos CSS desde un archivo llamado 'Card.module.css'
import { Link } from 'react-router-dom'; // Importa el componente Link de React Router

const Card = (props) => {
return (
    <div className={style.card}>
      {/* Muestra la imagen del Pokémon */}
    <img className={style.img} src={props.image} alt={props.name} />
    
      {/* Muestra el nombre del Pokémon */}
    <h2 className={style.name}>{props.name}</h2>
    
      {/* Muestra los tipos del Pokémon */}
    <p className={style.types}>{props.types}</p>
    
      {/* Muestra el valor de ataque del Pokémon */}
    <p className={style.attackProps}>Ataque: {props.attack}</p>
    
    {/* 
        Condición para mostrar el enlace a los detalles del Pokémon.
        Si 'props.id' es igual a "no-info", muestra un mensaje en su lugar.
        De lo contrario, muestra un enlace a la página de detalles del Pokémon.
      */}
    {props.id === "no-info" ? (
        <><p>No hay detalles para mostrar</p></>) :
        <Link to={`/detail/${props.id}`}>
        <p className={style.enlace}>Detalles</p>
        </Link>
    }
    </div>
);
}

export default Card;
