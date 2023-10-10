import { useDispatch } from 'react-redux';
import { fromFilter } from '../../redux/actions/actions';
import styles from "./Filters.module.css"

const From = () => {
    const dispatch = useDispatch();

    return (
        <div>
            {/* 
                Renderiza un select con tres opciones:
                - "Extraer desde: Api o BDD" (deshabilitado)
                - "Extraer desde la Api"
                - "Extraer de la Base de Datos"
            */}
            <select
                className={styles.select}
                value="default" // Establece el valor predeterminado como "default"
                onChange={(event) => {
                    const value = event.target.value;
                    dispatch(fromFilter(value)); // Realiza un dispatch de la acción 'fromFilter' con el valor seleccionado
                }}
            >
                <option disabled value="default">Extraer desde: Api o BDD</option>
                <option value="API">Extraer desde la Api</option>
                <option value="DataBase">Extraer de la Base de Datos</option>
            </select>
        </div>
    );
}

export default From;

