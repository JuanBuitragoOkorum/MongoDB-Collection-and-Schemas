import React from "react";
import { useState} from "react";
import { ContactsSave } from "../api/ContactsCollection"
import { useSubscribe, useFind } from "meteor/react-meteor-data"
import { Meteor } from "meteor/meteor"



export const ContactList = () => {

    const [succes, setSucces] = useState("")

    const showSucces = ({ message }) => {
        setSucces(message)
        setTimeout(() => setSucces(""), 2500)
    }


    const isLoading = useSubscribe('allContacts');
    const contact = useFind(() => {
        return ContactsSave.find({}, { sort: { createdAt: -1 } })
    })


    const removeContact = (event, _id) => {
        event.preventDefault()
        Meteor.call('contacts.remove', { contactId: _id });
        showSucces({ message: "Remove done!!!!" })
    }

    if (isLoading()) {
        return <p>Loading ...</p>
    }

    return (
        <>
            <h3>CONTACT LIST</h3>
            {succes && <h4 className="messageSucces">{succes}</h4>}
            <table>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Web Page</th>
                    <th>Wallet Id</th>
                    <th></th>
                </tr>
                {contact.map(contact => (<tr key={contact.email}><td>{contact.name}</td><td>{contact.email}</td><td>{contact.page}</td><td>{contact.walletId}</td><td><button className="remove" onClick={(event) => removeContact(event, contact._id)}> remove</button></td></tr>))}
            </table>

        </>
    )
}