// const cron = require('node-cron');
import cron from 'node-cron'
import orders from './models/orderModel.js';
import userSeller from './models/userSellerSum.js'

import loyaltyModel from './models/loyaltyModel.js'

import { issueNFT } from './helpers/contractHelper.js';

import { IMAGE_CONSTANTS, TOKEN_TYPE_MAPPING } from './constants.js';
import _ from 'lodash';
import e from 'express';

export const generatePURCHASEToken = async () => {
    console.log("Started process for Generating PURCHASETOKEN")
    const task = cron.schedule('* * * * *', async () => {
        try {
            const filterObj = {

                status: "done",
                'payment.razorpay_order_id': { $exists: true },
                'payment.razorpay_payment_id': { $exists: true },
                'payment.razorpay_signature': { $exists: true },
                tokenTransID: { $exists: false },
                nftTokenValue: { $exists: true },
                addr: { $exists: true }

            }
            const orderArray = await orders.find(filterObj);
            console.log(orderArray);
            for (let i = 0; i < orderArray.length; i++) {
                issueNFT(orderArray[i]?.addr, IMAGE_CONSTANTS.PURCHASE, TOKEN_TYPE_MAPPING.PURCHASE, orderArray[i]?.nftTokenValue, "abcdefghijk1234", orderArray[i]?._id, true)
            }
        } catch (error) {
            console.log(error)
        }
    })
    task.start()
}

export const generateSELLERCUSTOMERToken = async () => {
    console.log("Started process for Generating SELLERCUSTOMER Token")
    const task = cron.schedule('* * * * *', async () => {
        try {

            const filterObj = {

                sellerId: { $exists: true },
                userId: { $exists: true },
                amount: { $exists: true },
                // tokenTransID: { $exists: false },
                addr: { $exists: true }

            }
            const userSellerArray = await userSeller.find(filterObj);
            const loyaltyArray = await loyaltyModel.find();
            console.log("reached here")
            for (let i = 0; i < userSellerArray.length; i++) {
                for (let j = 0; j < loyaltyArray.length; j++) {
                    let check = true;
                    userSellerArray[i].rewardsArray.map((e) => {
                        if (e.amount == loyaltyArray[j].purchaseAmount)
                            check = false;
                    });
                    if (userSellerArray[i]?.amount >= loyaltyArray[j]?.purchaseAmount &&
                        (_.isEmpty(userSellerArray[i].rewardsArray) ||
                            (check) ||
                            (userSellerArray[i].rewardsArray.some((obj) => {
                                ((obj.amount == loyaltyArray[j]?.purchaseAmount) && obj.given == false);
                            })))) {
                        console.log("reached here too")
                         issueNFT(userSellerArray[i].addr, IMAGE_CONSTANTS.SELLER, TOKEN_TYPE_MAPPING.SELLER, loyaltyArray[j]?.loyaltyRewardAmount, userSellerArray[i]?.sellerId, userSellerArray[i]?._id, false)
                        await userSeller.findByIdAndUpdate(userSellerArray[i]?._id, {
                            $push:
                            {
                                rewardsArray: {
                                    amount: loyaltyArray[j]?.purchaseAmount,
                                    given: true
                                }
                            }
                        })

                    }
                }
            }
        } catch (error) {
            console.log(error)
        }
    })
    task.start()
}


export const generateREFERALToken = async () => {
    console.log("Started process for Generating REFERAL Token")
    const task = cron.schedule('* * * * *', async () => {
        try {
            const filterObj = {
                kind: TOKENS.KYC,
                docCaptured: true,
                certCreated: false
            }
            const order = await orders.find(filterObj);
            for (let i = 0; i < users.length; i++) {
                // generateKYCPDF(users[i]?.toObject())
            }
        } catch (error) {
            console.log(error)
        }
    })
    task.start()
}

// export default generatePURCHASEToken;
