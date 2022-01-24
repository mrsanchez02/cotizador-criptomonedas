import React from 'react'
import styled from '@emotion/styled';

const ResultadoDiv = styled.div`
    color: #FFF;
    font-family: Arial, Helvetica, sans-serif;
`;

const Info = styled.p`
    font-size: 18px;
    span {
        font-weight: bold;
    }
`;

const Precio = styled.p`
    margin: 0;
    font-size: 30px;
    span {
        font-weight: bold;
    }
`;

const Cotizacion = ({resultado,closeCotizacion}) => {

    if(Object.keys(resultado).length===0)return null;

    console.log(resultado)

    return (
        <ResultadoDiv>
            <Precio>El precio es: <span>{resultado.PRICE}</span></Precio>
            <Info>precio mas alto del dia: <span>{resultado.HIGHDAY}</span></Info>
            <Info>precio mas bajo del dia: <span>{resultado.LOWDAY}</span></Info>
            <Info>Variacion ultimas 24 horas: <span>{resultado.CHANGEPCT24HOUR}</span></Info>
            <Info>Ultima actualizacion: <span>{resultado.LASTUPDATE}</span></Info>
            <button
                className='modal__btn'
                onClick={closeCotizacion}
            >Cerrar</button>
        </ResultadoDiv>
    )
}

export default Cotizacion