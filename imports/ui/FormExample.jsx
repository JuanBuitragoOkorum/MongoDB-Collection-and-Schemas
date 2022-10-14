import React, { useState } from "react";
import { ContactsSave } from "../api/ContactsCollection"
import { Meteor } from "meteor/meteor"


export const Form = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [page, setPage] = useState("")
    const [error, setError] = useState("")
    const [succes, setSucces] = useState("")
    const [walletId, setWalletId] = useState("")

    const showError = ({ message }) => {
        setError(message)
        setTimeout(() => setError(""), 2000)
    }

    const showSucces = ({ message }) => {
        setSucces(message)
        setTimeout(() => setSucces(""), 2000)
    }

    const saveContact = () => {

        Meteor.call('contacts.insert', { name, email, page, walletId }, (errorResponse) => {
            if (errorResponse) {
                showError({ message: errorResponse.error })//alert(errorResponse.error)

            }
            else {
                setName("");
                setEmail("");
                setPage("");
                setWalletId("");
                showSucces({ message: "Contact save" })

            }
        })

    }



    return (
        <>
            {error && <h4 className="messageError">{error}</h4>}
            {succes && <h4 className="messageSucces">{succes}</h4>}
            <form>

                <div>
                    <label className="labelForm">
                        Name
                    </label>
                    <input className="inputForm" type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                    <label className="labelForm">
                        Email
                    </label>
                    <input className="inputForm" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label className="labelForm">
                        Web page
                    </label>
                    <input className="inputForm" type="text" value={page} onChange={(e) => setPage(e.target.value)} />
                </div>
                <div>
                    <label className="labelForm">
                        Wallet Id
                    </label>
                    <input className="inputForm" type="text" value={walletId} onChange={(e) => setWalletId(e.target.value)} />
                </div>
                <button type="button" onClick={saveContact}>save </button>

            </form>
        </>
    )
}