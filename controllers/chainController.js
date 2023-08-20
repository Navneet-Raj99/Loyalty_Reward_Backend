import userReferralModel from "../models/userReferral.js";
import _ from "lodash";

export const setAddr = async (req, res ) =>
{
    try {
        const {signature, address, auth} = req.body;
        
        // Code to unsign and match

        const data = await userReferralModel.find({
            referralCode: auth.user.refCode,
            senderUserId: auth.user._id
        });
        if(!_.isEmpty(data)) {
            const promises = data.map((e) => {
                return userReferralModel.updateMany({
                    referralCode: auth.user.refCode,
                    senderUserId: auth.user._id
                },{
                    senderAddr: address
                })
            })
            await Promise.all(promises);
        }
        const data2 = await userReferralModel.find({
            consumerUserId: auth.user._id
        });
        const promises = data2.map((e) => {
            return userReferralModel.updateMany({
                consumerUserId: auth.user._id
            }, {
                receiverAddr: address 
            })
        });
        await Promise.all(promises);
        res.status(200).send({success: true, message: "Successfully updated addresses"});
    } catch (err) {
        console.log(err);
        res.status(500).send({success: false, message: err});
    }
}