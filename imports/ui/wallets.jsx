import React from "react";
import {Modal} from "./component/modal"
import {useModal} from "./hooks/useModal"


export const Wallet = () => {
    const [isOpenModal1, openModal1, closeModal1] = useModal(false);
    const [isOpenModal2, openModal2, closeModal2] = useModal(false);
    const wallet ={
        _id: 1234,
        balance: 5,
        currenci: "Main account"
    }
    return(
<div className="head">
<div className="head-2">  
<div className="head-1">
<h1> {wallet.currenci} </h1>
<h2> wallet Id: {wallet._id}</h2>
</div>
<h2 className="currenci">{wallet.balance}USD </h2>
</div>  
<div className="box-buttons">
<button type="button" className="button-wallet" onClick={openModal1} >Add money</button>
<Modal isOpen={isOpenModal1} closeModal={closeModal1} >
    <h4>modal 1</h4>
    <p>contenido de modal 1</p>
    <img src="https://placeimg.com/400/400/animals" alt="animals"></img>
</Modal>
<button type="button" className="button-wallet" onClick={openModal2}>Transfer money</button>
<Modal isOpen={isOpenModal2} closeModal={closeModal2}>
    <h4>modal 2</h4>
    <p>contenido de modal 2</p>
    <img src="https://placeimg.com/400/400/nature" alt="nature"></img>
</Modal>

</div>
</div>
    )
}