import React from 'react';
import './modal.css';

const Modal = ({isOpen,closeCotizacion,children}) => {

    const handleClick = e => {
        e.stopPropagation();
    }

  return (
    <div className={`modal ${isOpen&&"modal-open"}`} onClick={closeCotizacion}>
        <div className="modal__dialog" onClick={handleClick}>
            {children}
        </div>
    </div>
  )
}

export default Modal
