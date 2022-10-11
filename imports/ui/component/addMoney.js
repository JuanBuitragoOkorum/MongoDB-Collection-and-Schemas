import { useState } from "react";
import React from "react";


export const AddMoney = () => {
const [number, setNumber] = useState(0)
const captureAdd = () =>{
    console.log(number)
}

    return (
        <div className="addMoney">
            <h2>Add mone to your wallet</h2>
            <label>
                Name
            </label>
            <input className="addMoney-value" type="number" value={number} onChange={(e) => setNumber(e.target.value)} />
            <button className="button-add" onClick={captureAdd}>Add</button>
        </div>
    )
} 