import React,{useEffect,useState} from 'react'
import Error from './Error';
import styled from '@emotion/styled';
import useMoneda from '../hooks/useMoneda';
import useCriptomoneda from '../hooks/useCriptomoneda';
import axios from 'axios';

const Boton = styled.input`
    margin-top: 20px;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    background-color: #66a2fe;
    border: none;
    width: 100%;
    border-radius: 10px;
    color: #fff;
    transition: background-color .3s ease;

    &:hover{
        background-color: #326ac0;
        cursor: pointer;
    }
`

const Formulario = ({setMoneda,setCriptomoneda,openCotizacion}) => {

    // State del listado de Criptomonedas
    const [listaCripto, setListaCripto ] = useState([]);
    const [error, setError] = useState(false);

    const MONEDAS = [
        {codigo: 'USD', nombre: 'Dolar de Estados Unidos'},
        {codigo: 'DOP', nombre: 'Peso Dominicano'},
        {codigo: 'MXN', nombre: 'Peso mexicano'},
        {codigo: 'EUR', nombre: 'Euro'},
        {codigo: 'GBP', nombre: 'Libra Esterlina'}
    ]

    // Utilizar useMoneda (custom Hook).
    const [ moneda, SelectMonedas ] = useMoneda('Elige tu Moneda','',MONEDAS);

    // Utilizar useCriptomoneda (custom hook).
    const [criptomoneda,SelectCripto ] = useCriptomoneda('Elige tu CriptoMoneda','',listaCripto);

    // Ejecutra llamado a la API.
    useEffect(()=>{
        const consultarAPI = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';

            const resultado = await axios.get(url);
            setListaCripto(resultado.data.Data);
        }
        consultarAPI();
    },[]);

    // Cuando el usuario hac Submit.
    const hanldeSubmit = e => {
        e.preventDefault();

        // Validar si ambos campos estan llenos.
        if(moneda===''||criptomoneda===''){
            setError(true);
            return
        };
        
        // Pasar los datos al componente principal.
        setError(false);
        setMoneda(moneda);
        setCriptomoneda(criptomoneda);
        openCotizacion()
    };

    return (
        <form
            onSubmit={hanldeSubmit}
        >
            {error ? <Error mensaje='Todos los campos son obligatorios'/> : null }

            <SelectMonedas />

            <SelectCripto />

            <Boton
                type='submit'
                value='calcular'
            />
        </form>
    );
};

export default Formulario;