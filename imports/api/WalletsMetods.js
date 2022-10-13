import { WalletsCollection } from "./WalletsCollection";
import { Meteor } from "meteor/meteor"
import { check } from "meteor/check"

Meteor.methods({

    'wallet.remove'({ contactId }) {
        check(contactId, String)
        WalletsCollection.remove(contactId);
    },

    'wallet.update'({walletId, walletChange}){
        WalletsCollection.update(walletId, walletChange)
    }
})