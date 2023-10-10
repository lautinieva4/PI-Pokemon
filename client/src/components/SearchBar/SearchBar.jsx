// import React from "react";
// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import {fetchPokemons} from "../../redux/actions/actions";
// import styles from './SearchBar.module.css'

// const SearchBar = () => {
//   const dispatch = useDispatch();
//   const [name, setName] = useState("");

//   const handleInputChange = (e) => {
//     e.preventDefault();
//     setName(e.target.value);
//     //console.log(name);
//   };
//   const handleSubmit = (e) => {
//     //console.log(name);
//     e.preventDefault();
//     dispatch(fetchPokemons(name));
//   };
//   return (
//     <div className={styles.searchBox}>

//             <input className={styles.searchInput}  type="text" placeholder="¡Busca tu pokemon!" onChange={(e) => handleInputChange(e)} />
//             <button className={styles.button} type="submit" onClick={(e) => handleSubmit(e)}>GO POKEMONS!</button>
//     </div>
//   );
// };

// export default SearchBar;
