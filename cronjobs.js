// const cron = require('node-cron');
import cron from 'node-cron'
import orders from './models/orderModel.js';

import { issueNFT } from './helpers/contractHelper.js';

import { IMAGE_CONSTANTS,TOKEN_TYPE_MAPPING } from './constants.js';

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
                nftTokenValue: { $exists: true }

            }
            const orderArray = await orders.find(filterObj);
            console.log(orderArray);
            for (let i = 0; i < orderArray.length; i++) {
                issueNFT(orderArray[i]?.addr, IMAGE_CONSTANTS.PURCHASE, TOKEN_TYPE_MAPPING.PURCHASE, orderArray[i]?.nftTokenValue, "abcdefghijk1234", orderArray[i]?._id)
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

                sellerId:{ $exists: true },
                userId:{ $exists: true },
                amount:{ $exists: true },
                tokenTransID: { $exists: false }

            }
            const orderArray = await orders.find(filterObj);
            for (let i = 0; i < orderArray.length; i++) {
                issueNFT(orderArray[i].addr, IMAGE_CONSTANTS.SELLER, TOKEN_TYPE_MAPPING.SELLER, orderArray[i]?.nftTokenValue, "123")
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
