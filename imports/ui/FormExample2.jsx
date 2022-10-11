import React from "react";
import { ContactsSave } from "../api/ContactsCollection"
import { useSubscribe, useFind } from "meteor/react-meteor-data"
import { Meteor } from "meteor/meteor"



export const ContactList = () => {
    const isLoading = useSubscribe('allContacts');
    const contact = useFind(() => {
        return ContactsSave.find({}, { sort: { createdAt: -1 } })
    })


    const removeContact = (event, _id) => {
        event.preventDefault()
        Meteor.call('contacts.remove', { contactId: _id });
    }

    if (isLoading()) {
        return <p>Loading ...</p>
    }

    return (
        <>
            <h3>Example List</h3>

            <table>{contact.map(contact => (<tr key={contact.email}><td>{contact.name}</td><td>{contact.email}</td><td>{contact.page}</td><td>{contact.walletId}</td><td><button className="remove" onClick={(event) => removeContact(event, contact._id)}> remove</button></td></tr>))}</table>

        </>
    )
}