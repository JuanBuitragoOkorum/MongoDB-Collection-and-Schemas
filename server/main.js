import { Meteor } from 'meteor/meteor'
import simpleSchema from 'simpl-schema'
import "../imports/api/ContactsCollection"
import "../imports/api/ContactsMetods"
import "../imports/api/ContactsPublications"
import "../imports/api/TransactionsCollection"
import "../imports/api/WalletsCollection"
import "../imports/api/TransactionMethods"
import "../imports/api/WalletsPublications"
import "../imports/api/WalletsMetods"
import { WalletsCollection } from '../imports/api/WalletsCollection';

/*const walletSchema = new simpleSchema({
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
})*/


Meteor.startup(() => {

 /*   const walletData = {
        balance: 80,
        createdAt: new Date(),
    }
    const cleanWallet = walletSchema.clean(walletData)
    walletSchema.validate(cleanWallet)
    WalletsCollection.insert(cleanWallet)*/
 
});
