import React from "react";
import styles from "./modal.module.css";
import { Link } from "react-router-dom";

//Este componente Modal se utiliza para mostrar un mensaje al usuario cuando se crea un Pokémon con éxito. El mensaje se muestra en un cuadro modal que tiene un botón "Cerrar" para cerrar el modal y un botón "HOME" que redirige al usuario a la página de inicio de la aplicación cuando se hace clic en él.

const Modal = ({ show, handleClose }) => {
    // Define una clase de estilo dinámica en función del valor de la prop 'show' para mostrar u ocultar el modal
    const showHideClassName = show ? `${styles.modal} ${styles.displayBlock}` : `${styles.modal} ${styles.displayNone}`;

    return (
        <div className={showHideClassName}>
            <section className={styles.modalMain}>
                <p>El pokemon ha sido creado con éxito</p> {/* Mensaje de éxito */}
                <button className={styles.button} onClick={handleClose}>Cerrar</button> {/* Botón para cerrar el modal */}
                <Link to='/home'><button className={styles.button} type="submit"> HOME</button></Link> {/* Botón para ir a la página de inicio */}
            </section>
        </div>
    );
};

export default Modal;

