import { useState } from "react";
import React from "react";


export const TransferMoney = () => {
    const [number, setNumber] = useState(0)
    const [name, setName] = useState("")
    const addTransation = () => {
        console.log(number, name)
    }
    return (
        <div className="transferMoney">
            <h2>Add money to your wallet</h2>
            <label>
                Destination wallet
            </label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            <label>
                Name
            </label>
            <input className="transferMoney-value" type="number" value={number} onChange={(e) => setNumber(e.target.value)} />
            <button className="button-tranfer" onClick={addTransation}>Transfer</button>
        </div>
    )
} 