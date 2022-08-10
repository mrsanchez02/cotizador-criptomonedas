import React,{useState,useEffect} from 'react';
import styled from '@emotion/styled';
import axios from 'axios';
import imagen from './cryptomonedas.png';
import Formulario from './components/Formulario';
import Cotizacion from './components/Cotizacion';
import Spinner from './components/Spinner';
import useModal from './hooks/useModal';
import Modal from './components/Modal';

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  @media (min-width: 992px){
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`

const Imagen = styled.img`
  max-width: 100%;
  margin-top: 5rem;
`;

const Heading = styled.h1`
  font-family: 'Bebas Neue', cursive;
  color: #fff;
  text-align: left;
  font-weight: 700;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top: 80px;

  &::after{
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66a2fe;
    display: block;
  }
`

function App() {

  const [moneda, setMoneda]=useState('');
  const [criptomoneda, setCriptomoneda]=useState('');
  const [resultado, setResultado]=useState({});
  const [loading,setLoading]=useState(false);
  const [isOpenCotizacion, openCotizacion, closeCotizacion]=useModal();

  useEffect(()=>{

    const cotizarCriptomoneda = async () => {
        // Avoiding first time.
        if(moneda==='')return;

        // Api querry to get data.
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}&api_key=${process.env.REACT_APP_APIKEY}`;

        const resultado = await axios.get(url);

        //Open modal
        // openCotizacion();

        // Show the spinner
        setLoading(true);

        // Hide spinner and show the result.
        setTimeout(()=>{
          // changing back state.
          setLoading(false);
          setResultado(resultado.data.DISPLAY[criptomoneda][moneda]);
      },2500)
    }

    cotizarCriptomoneda();

  },[moneda,criptomoneda]);


  // Show spinner or result.
  const componente = (loading)? <Spinner/> : <Cotizacion resultado={resultado} closeCotizacion={closeCotizacion}/>
  
  return (
    <Contenedor>
      <div>
        <Heading>Cryptocurrency Exchange Rates!</Heading>
        <Formulario
          {...{
            setMoneda,
            setCriptomoneda,
            openCotizacion
          }}
        />
      </div>
      <div>
        <Imagen 
          src={imagen}
          alt={'Imagen Kripto'}
        />
      </div>
      <Modal
          isOpen={isOpenCotizacion}
          closeCotizacion={closeCotizacion}
        >
          {componente}
        </Modal>
    </Contenedor>
  );
}

export default App;
