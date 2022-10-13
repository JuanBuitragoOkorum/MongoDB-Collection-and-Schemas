import React from "react";
import { useState, useEffect } from "react";
import { Modal } from "./component/modal"
import { useModal } from "./hooks/useModal"
//import { AddMoney } from "./component/addMoney";
//import { TransferMoney } from "./component/transferMoney";
import { WalletsCollection } from "../api/WalletsCollection"
import { useSubscribe, useFind } from "meteor/react-meteor-data"
import { ContactsSave } from "../api/ContactsCollection"
import { Meteor } from "meteor/meteor"
import simpleSchema from 'simpl-schema'


export const Wallet = () => {
    useSubscribe('wallets');
    useSubscribe('allContacts');
    const [wallet] = useFind(() => WalletsCollection.find({ _id: "4MMku9JroS2fByPbG" }))
    let x = wallet
    let y = 0
    if (x) {
        console.log("result", x.balance)
        y = x.balance
    }

    const [isOpenModal1, openModal1, closeModal1] = useModal(false);
    const [isOpenModal2, openModal2, closeModal2] = useModal(false);
    const [number2, setNumber2] = useState(0)
    const [number, setNumber] = useState(0)
    const [data, setData] = useState("")
    const [isTransfering, setIsTransfering] = useState(true)
    const [error, setError] = useState("")





    const contacts = useFind(() => { return ContactsSave.find({}, { sort: { createdAt: -1 } }) })



    if (!wallet) {
        const walletSchema = new simpleSchema({
            balance: {
                type: Number,
                min: 0,
                defaultValue: 0
            },
            currency: {
                type: String,
                allowedValues: ['USD'],
                defaultValue: 'USD'
            },
            createdAt: {
                type: Date
            }
        })

        const walletData = {
            balance: 100,
            createdAt: new Date(),
        }

        const cleanWallet = walletSchema.clean(walletData)
        walletSchema.validate(cleanWallet)
        WalletsCollection.insert(cleanWallet)
    }

    const showError = ({ message }) => {
        setError(message)
        setTimeout(() => setError(""), 2000)
    }

    const addTransation = () => {

        const destinationWallet = contacts.find((elem) => elem.name == data)
        //console.log(isTransfering, wallet._id, destinationWallet, Number(number))
        if (Number(y) - Number(number) < 0) {
            showError({ message: "insufficient funds !!!" })

        }
        else if (contacts.length === 0) { showError({ message: "Don't have user" }) }
        else {
            WalletsCollection.update({ _id: "4MMku9JroS2fByPbG" }, { balance: Number(y) - Number(number) })

            Meteor.call('transactions.insert', {
                isTransfering,
                sourceWalletId: wallet._id,
                destinationWalletId: wallet._id,
                amount: Number(number)

            }),
                setData(""),
                setNumber(0)
        }

    }

    const captureAdd = () => {
        WalletsCollection.update({ _id: "4MMku9JroS2fByPbG" }, { balance: Number(y) + Number(number2) })
        setNumber2(0)
    }

    return (
        <div className="head">
            <div className="head-2">
                <div className="head-1">
                    <h1> Main account </h1>
                    <h2> wallet Id: {wallet && wallet._id}</h2>
                </div>
                <h2 className="currenci">{wallet && wallet.balance} USD </h2>
            </div>
            <div className="box-buttons">
                <button type="button" className="button-wallet" onClick={openModal1} >Add money</button>
                <Modal isOpen={isOpenModal1} closeModal={closeModal1} >

                    <div className="addMoney">
                        <h2>Add money to your wallet</h2>

                        <input className="addMoney-value" type="number" value={number2} onChange={(e) => setNumber2(e.target.value)} />
                        <button className="button-add" onClick={captureAdd}>Add</button>
                    </div>
                </Modal>
                <button type="button" className="button-wallet" onClick={openModal2}>Transfer money</button>
                <Modal isOpen={isOpenModal2} closeModal={closeModal2}>

                    <div className="transferMoney">

                        <h2>Transfer money to other wallet</h2>
                        <label>
                            {error && <h4 className="messageError">{error}</h4>}
                            Destination contact
                        </label>
                        <select className='selectContact' value={data} onChange={(e) => setData(e.target.value)}>

                            {contacts.length > 0 ? contacts.map(contact => (<option key={contact._id}>{contact.name}</option>)) : (<option>user no found ...</option>)}
                        </select>
                        <label>
                            Amount
                        </label>
                        <input className="transferMoney-value" type="number" value={number} onChange={(e) => setNumber(e.target.value)} />
                        <button className="button-tranfer" onClick={addTransation}>Transfer</button>
                    </div>

                </Modal>

            </div>
        </div>
    )
}