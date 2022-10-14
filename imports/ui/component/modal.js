import React from "react"

export const Modal = ({ children, isOpen, closeModal }) => {

 const handleModalContainerClick = e=> e.stopPropagation()  // evita que se cierre al darle click dentro del modal
    return (
        <article className={`modal ${isOpen && "is-open"}`} onClick={closeModal}>
            <div className="modal-container" onClick={handleModalContainerClick}>
               {/*<button className="modal-close" onClick={closeModal}>X</button>*/}
                {children}
            </div>

        </article>
    )
}