import { Meteor } from "meteor/meteor"
import { WalletsCollection } from "./WalletsCollection";

Meteor.publish('wallets', function publishWallet(params) {
    return WalletsCollection.find();
})