import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTypes, createPokemons } from "../../redux/actions/actions";
import { NavLink } from 'react-router-dom';
import styles from "./CreatePokemon.module.css";
import Modal from '../Modal/Modal';

const regexURL = /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/;
const regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚú\s]+$/;

const PokemonForm = () => {
    // Utiliza el hook useDispatch para obtener la función para despachar acciones
    const dispatch = useDispatch();
    
    // Utiliza el hook useSelector para obtener el estado del Redux store
    const types = useSelector(state => state.types);

    // Define estados locales para manejar los datos del formulario y mostrar errores
    const [errors, setErrors] = useState({});
    const [showModal, setShowModal] = useState(false);

    const [pokemonsData, setpokemonsData] = useState({
        name: '',
        image: '',
        attack: '',
        weight: '',
        height: '',
        hp: '',
        speed: '',
        defense:'',
        types: []
    });

    // Utiliza useEffect para obtener los tipos de Pokémon al cargar el componente
    useEffect(() => {
        dispatch(getTypes());
    }, [dispatch]);

    // Maneja el cambio de input en el formulario
    const handleInputChange = event => {
        const { name, value } = event.target;
        setpokemonsData(prevPokemonsData => ({
            ...prevPokemonsData,
            [name]: value,
        }));
    }
    
    // Maneja el cambio de tipos de Pokémon seleccionados
    const handleTypesChange = event => {
        const types = event.target.value;
        setpokemonsData(prevPokemonsData => {
            if (prevPokemonsData.types.includes(types)) {
                return {
                    ...prevPokemonsData,
                    types: prevPokemonsData.types.filter(ty => ty !== types)
                };
            } else {
                return {
                    ...prevPokemonsData,
                    types: [...prevPokemonsData.types, types]
                };
            }
        });
    };

    // Maneja el envío del formulario
    const handleSubmit = e => {
        e.preventDefault();
        const error = onValidate(pokemonsData);
        if (!error) {
            try {
                dispatch(createPokemons(pokemonsData));
                setShowModal(true);
                setErrors({});
            } catch (err) {
                setErrors({ message: "Error al crear el pokemon." });
            }
        } else {
            setErrors(error);
        }
    };

    // Función para validar los datos del formulario
    const onValidate = pokemonsData => {
        let isError = false;
        let error = {}

        if (pokemonsData.name.length < 3 || pokemonsData.name.length > 35) {
            error.name = "El nombre debe tener entre 3 y 35 caracteres";
            isError = true;
        } else if (!regexName.test(pokemonsData.name)) {
            error.name = "El nombre solo puede contener letras y espacios";
            isError = true;
        }
        if (!regexURL.test(pokemonsData.image)) {
            error.image = "La imagen debe tener la extensión .jpg o .png";
            isError = true;
        }
        if (pokemonsData.types.length < 1 || pokemonsData.types.length > 2) {
            error.types = "Elige entre 1 y 2 tipos de Pokémon";
            isError = true;
        }
        if (!/^(?!160$)([1-3]?[0-9]{1,2}|500)$/.test(pokemonsData.weight)) {
            error.weight = "El peso del pokemon debe ser de números y menor a 500"
            isError = true;
        }
        if (!/^(?:[1-9]|[1-9][0-9]|1[0-9]{2}|200)$/.test(pokemonsData.height)) {
            error.height = "La altura del pokemon debe ser de números y menor a 200"
            isError = true;
        }
        if (!/^(?!300$)([1-2]?[0-9]{1,2}|300)$/.test(pokemonsData.hp)) {
            error.hp = "La salud del pokemon debe ser de números y menor a 300";
            isError = true;
        }
        if (!/^(?!500$)([1-4]?[0-9]{1,2}|500)$/.test(pokemonsData.attack)) {
            error.attack = "El ataque del pokemon debe ser de números y menor a 500"
            isError = true;
        }
        if (!/^(?!400$)([1-3]?[0-9]{1,2}|400)$/.test(pokemonsData.defense)) {
            error.defense = "La defensa del pokemon debe ser de números y menor a 400"
            isError = true;
        }
        if (!/^(?!160$)([1-3]?[0-9]{1,2}|160)$/.test(pokemonsData.speed)) {
            error.speed = "La velocidad del pokemon debe ser de números y menor a 160"
            isError = true;
        }
        return isError ? error : null;
    };

    // Mapea los tipos de Pokémon para mostrar checkboxes en el formulario
    const showTy = types.map(types => ( 
        <div className={styles.checkbox}  key={types.id}>
            <label className={styles.checkboxLabel}>
                <input
                    type="checkbox"
                    name={types.name}
                    value={types.name}
                    checked={pokemonsData.types.includes(types.name)}
                    onChange={handleTypesChange} 
                />
                <span>{types.name}</span>
            </label>
        </div>
    ));
     // Función para cerrar el modal
    const handleCloseModal = () => {
        setShowModal(false);
    };
    // Renderiza el formulario y la información del Pokémon creado
    return (<div>
        <form onSubmit={handleSubmit} className={styles.formcontainer}>
            <div  className={styles.name}>
                <label>
                    <h1>Nombre: </h1>

                    <input type="text" name="name" value={pokemonsData.name} onChange={handleInputChange} />
                    <br />
                    {errors && errors.name ? <p>{errors.name}</p> : null}
                </label>
                <div className={styles.weight}>
                <label>
                    Imagen URL:
                    <input placeholder='.jpg o .png' type="text" name="image" value={pokemonsData.image} onChange={handleInputChange} />
                    <br />
                    {errors && errors.image ? <p>{errors.image}</p> : null}
                </label>
                </div>
                <div className={styles.weight}>
                    <label>
                        Peso:
                        <input placeholder='peso' type="number" name="weight" value={pokemonsData.weight} onChange={handleInputChange} />
                    </label>
                    {errors && errors.weight ? <p>{errors.weight}</p> : null}
                </div>
                <div className={styles.weight}>
                <label>
                    Altura :
                    <input placeholder='altura' type="number" name="height" value={pokemonsData.height} onChange={handleInputChange} />
                </label>
                    {errors && errors.height ? <p>{errors.height}</p> : null}
                    
                </div>
                <div className={styles.weight}>
                <label>
                    Hp: 
                    <input placeholder='hp' type="number" name="hp" value={pokemonsData.hp} onChange={handleInputChange}/>
                    </label>
                    {errors && errors.hp ? <p>{errors.hp}</p> : null}
                </div>
                <div className={styles.weight}>
                <label>
                    Velocidad:
                    <input placeholder='velocidad' type="number" name="speed" value={pokemonsData.speed} onChange={handleInputChange}/>
                </label>
                    {errors && errors.speed ? <p>{errors.speed}</p> : null}
                </div>
                <div className={styles.weight}>
                <label>
                    Ataque:
                    <input placeholder='ataque' type="number" name="attack" value={pokemonsData.attack} onChange={handleInputChange}/>
                </label>
                    {errors && errors.attack ? <p>{errors.attack}</p> : null}
                </div>
                <div className={styles.weight}>
                <label>
                    Defensa:
                    <input placeholder='defensa' type="number" name="defense" value={pokemonsData.defense} onChange={handleInputChange}/>
                </label>
                    {errors && errors.defense ? <p>{errors.defense}</p> : null}
                </div>
                
                <h3 >
                    Tipos
                </h3>

                <div className={styles.types}>

                    {showTy}
                    {errors && errors.types ? <p>{errors.types}</p> : null}
                </div>


                </div><div>
                <button className={styles.button53} type="submit">Crear Pokemon</button>
                </div>
        </form>
        <div className={styles.container}>
            <div className={styles.card}>   
            {pokemonsData.image && pokemonsData.image.length > 20 ? (
                <img src={pokemonsData.image} alt={pokemonsData.name} className={styles.img} />
            ) : (<img className={styles.img} src={"https://i.pinimg.com/564x/c9/5f/a1/c95fa12ae9897a2f578e7e452005aa3f.jpg"} alt={pokemonsData.name} />)}        
            <div className={styles.name2}>
                <h1 >Nombre: <br />
                    {pokemonsData.name}</h1></div>
                <h4 className={styles.weight}>Peso:</h4><div>
                <span className={styles.span}>{pokemonsData.weight}</span>
                </div>
                <h4 className={styles.height}>Altura:</h4><div>
                <span className={styles.span}>{pokemonsData.height}</span></div>

                <h4 className={styles.hp}>Hp:</h4>
                <span className={styles.span}>{pokemonsData.hp}</span>

                <h4 className={styles.attack}>Ataque:</h4>
                <span className={styles.span}>{pokemonsData.attack}</span>

                <h4 className={styles.defense}>Defensa:</h4><div>
                <span className={styles.span}>{pokemonsData.defense}</span></div>

                <h4 className={styles.speed}>Velocidad:</h4><div>
                <span className={styles.span}>{pokemonsData.speed}</span></div>

                <h4 className={styles.types}>Tipos:</h4>
                <span className={styles.span}>{pokemonsData.types}</span>
                <br />
            </div>

            <div>
                <NavLink to="/home"><button className={styles.button52}>Home</button></NavLink></div>

        </div> 
        <Modal show={showModal} handleClose={handleCloseModal}>
                <h2>El pokemon fue creado con éxito</h2>
        </Modal>
    </div>
    
    );
};

export default PokemonForm;