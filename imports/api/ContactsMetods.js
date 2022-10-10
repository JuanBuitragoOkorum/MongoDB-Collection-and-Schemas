import { ContactsSave } from "./ContactsCollection";
import { Meteor } from "meteor/meteor"
import { check } from "meteor/check"

Meteor.methods({

    'contacts.remove'({ contactId }) {
        check(contactId, String)
        ContactsSave.remove(contactId);
    },

    'contacts.insert'({ name, email, page }) {
        check(name, String)
        check(email, String)
        check(page, String)
        if (!name) {
            throw new Meteor.Error("Name is required")
        }
        return ContactsSave.insert({ name, email, page, createdAt: new Date() })
    }
})

