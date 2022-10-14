import { WalletsCollection } from "./WalletsCollection";
import { Meteor } from "meteor/meteor"
import { check } from "meteor/check"

Meteor.methods({
    'wallet.update'({ walletId, balance, compare }) {
        check(walletId, String)
        check(balance, Number)
        check(compare, Number)
        
        if(compare - (-balance) < 0){
            throw new Meteor.Error("Insufficient funds!!")
        }

        WalletsCollection.update({_id:walletId}, {$inc:{balance:balance}})
    }
})

