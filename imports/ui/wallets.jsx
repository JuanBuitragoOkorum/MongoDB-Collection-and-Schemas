import React from "react";
import { useState} from "react";
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
    const [state, setState] = useState(false)
    const [isOpenModal1, openModal1, closeModal1] = useModal(false);
    const [isOpenModal2, openModal2, closeModal2] = useModal(false);
    const [number2, setNumber2] = useState(0)
    const [number, setNumber] = useState(0)
    const [data, setData] = useState("")
    const [isTransfering, setIsTransfering] = useState(true)
    const [error, setError] = useState("")
    const [succes, setSucces] = useState("")





    const contacts = useFind(() => { return ContactsSave.find({}, { sort: { createdAt: -1 } }) })

    const showError = ({ message }) => {
        setError(message)
        setTimeout(() => setError(""), 2000)
    }

    const showSucces = ({ message }) => {
        setSucces(message)
        setTimeout(() => setSucces(""), 2500)
    }


    const addTransation = () => {

        const destinationWallet = contacts.find((elem) => elem.name == data)

        if (contacts.length === 0) { showError({ message: "Don't have user" }) }
        else {
            Meteor.call('wallet.update', {
                walletId: "4MMku9JroS2fByPbG",
                balance: Number(-number),
                compare: Number(y)
            }, (errorResponse) => {
                if (errorResponse) {
                    showError({ message: errorResponse.error })
                }
            }

            )


            Meteor.call('transactions.insert', {
                isTransfering,
                sourceWalletId: wallet._id,
                destinationWalletId: destinationWallet,
                amount: Number(number)
            }),
                setData(""),
                setNumber(0)
                showSucces({ message: "Transaction done!!!!" })
        }
        closeModal2()
        


    }

    const captureAdd = () => {

        Meteor.call('wallet.update', {
            walletId: "4MMku9JroS2fByPbG",
            balance: Number(number2),
            compare: Number(y)
        })


        setNumber2(0)
        showSucces({ message: "Add done!!!!" })
        closeModal1()
    }

    return (
        <div className="head">
            <div className="head-2">
                <div className="head-1">
                    <h1 className="fontWalletH1"> Main account </h1>
                    <h2 className="fontWalletH1-2"> wallet Id: </h2>
                    <h2 className="fontWalletH2">{wallet && wallet._id}</h2>
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
                        <label className="labelForm-2">
                            {error && <h4 className="messageError">{error}</h4>}
                            Destination contact
                        </label>
                        <select className='selectContact' value={data} onChange={(e) => setData(e.target.value)}>

                            {contacts.length > 0 ? contacts.map(contact => (<option key={contact._id}>{contact.name}</option>)) : (<option>user no found ...</option>)}
                        </select>
                        <label className="labelForm-2">
                            Amount
                        </label>
                        <input className="inputForm" type="number" value={number} onChange={(e) => setNumber(e.target.value)} />
                        <button className="button-tranfer" onClick={addTransation}>Transfer</button>

                    </div>

                </Modal>

            </div>
            {succes && <h4 className="messageSucces">{succes}</h4>}
        </div>
    )
}