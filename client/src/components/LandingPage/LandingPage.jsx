import React from 'react';
import { Link } from 'react-router-dom';
import style from './LandingPage.module.css'

const LandingPage = () => {
    
    return (
        <div className={style.LandingPage}>
            {/* Establece el título de la página */}
            <title>GO POKEMONS!</title>
            <div className={style.container}>
                <br />
                <h1>GO POKEMONS App!</h1> {/* Título principal de la página */}
                <br />
                <p>¡Aquí encontraremos información acerca de nuestros pokemons!</p> {/* Descripción de la aplicación */}
                {/* Renderiza un enlace que lleva a la página de inicio de la aplicación */}
                <Link to="/home">
                    <button>GO POKEMONS!</button> {/* Botón para iniciar la aplicación */}
                </Link>
            </div>
        </div>
    )
}

export default LandingPage;
