import userReferralModel from "../models/userReferral.js";
import _ from "lodash";

export const setAddr = async (req, res ) =>
{
    const {signature, address, auth} = req.body;
    console.log(signature, address, auth);
    
    // Code to unsign and match

    const data = await userReferralModel.findAll({
        referralCode: auth.user.refCode
    });
    if(!_.isEmpty(data)) {
        const promises = data.map((e) => {
            return userReferralModel.findOneAndUpdate({
                referralCode: auth.user.refCode
            },{
                senderAddr: address
            })
        })
        await Promise.all(promises);
    }
}