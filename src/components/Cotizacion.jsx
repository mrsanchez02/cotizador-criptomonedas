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

    return (
        <ResultadoDiv>
            <Precio>Actual price: <span>{resultado.PRICE}</span></Precio>
            <Info>Highest price of the day: <span>{resultado.HIGHDAY}</span></Info>
            <Info>Lowest price of the day: <span>{resultado.LOWDAY}</span></Info>
            <Info>Variation last 24 hours: <span>{resultado.CHANGEPCT24HOUR}</span></Info>
            <Info>Last update: <span>{resultado.LASTUPDATE}</span></Info>
            <button
                className='modal__btn'
                onClick={closeCotizacion}
            >Close</button>
        </ResultadoDiv>
    )
}

export default Cotizacion