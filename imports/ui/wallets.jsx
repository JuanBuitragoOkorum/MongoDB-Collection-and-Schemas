import React from "react";



export const Wallet = () => {
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
<button type="button" className="button-wallet" >Add money</button>
<button type="button" className="button-wallet">Transfer money</button>
</div>
</div>
    )
}