import { useState } from "react";
import React from "react";
import { ContactsSave } from "../../api/ContactsCollection"
import { useSubscribe, useFind } from "meteor/react-meteor-data"
import { Meteor } from "meteor/meteor"
import { Wallet } from "../wallets";

export const TransferMoney = ({number2}) => {
    const [number, setNumber] = useState(0)
    const [data, setData] = useState("")
    const [isTransfering, setIsTransfering] = useState(true)


    useSubscribe('allContacts');


    const contacts = useFind(() => {
        return ContactsSave.find({}, { sort: { createdAt: -1 } })

    })
    console.log("number", number)


    const addTransation = () => {

        const destinationWallet = contacts.find((elem) => elem.name == data)
        console.log(isTransfering, wallet._id, destinationWallet, number)
        Meteor.call('transactions.insert', {
            isTransfering,
            sourceWalletId: wallet._id,
            destinationWalletId: wallet._id,
            amount: Number(number)

        }),
            setData(""),
            setNumber(0)

    }


    return (

        <div className="transferMoney">

            <h2>Transfer money to other wallet</h2>
            <label>
                Destination contact
            </label>
            <select className='selectContact' value={data} onChange={(e) => setData(e.target.value)}>

                {contacts.length > 0 ? contacts.map(contact => (<option key={contact._id}>{contact.name}</option>)) : (<option>user no found ...</option>)}
            </select>
            <label>
                Name
            </label>
            <input className="transferMoney-value" type="number" value={number} onChange={(e) => setNumber(e.target.value)} />
            <button className="button-tranfer" onClick={addTransation}>Transfer</button>
        </div>
    )
} 