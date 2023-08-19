const cron = require('node-cron');
const orders = require('./models/orderModel');
const userSellerCollection = require('./models/userSellerSum')
const { issueNFT } = require('./helpers/contractHelper');
const { IMAGE_CONSTANTS, TOKEN_TYPE_MAPPING } = require('./constants');

const generatePURCHASEToken = async () => {
    console.log("Started process for Generating PURCHASETOKEN")
    const task = cron.schedule('* * * * *', async () => {
        try {
            const filterObj = {

                status: "done",
                payment: {
                    razorpay_order_id: { $exists: true },
                    razorpay_payment_id: { $exists: true },
                    razorpay_signature: { $exists: true }
                },
                tokenTransID: { $exists: false }

            }
            const orderArray = await orders.find(filterObj);
            for (let i = 0; i < orderArray.length; i++) {
                issueNFT(orderArray[i]?.addr, IMAGE_CONSTANTS.PURCHASE, TOKEN_TYPE_MAPPING.PURCHASE, orderArray[i]?.nftTokenValue, "abcdefghijk1234")
            }
        } catch (error) {
            console.log(error)
        }
    })
    task.start()
}

const generateSELLERCUSTOMERToken = async () => {
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


const generateREFERALToken = async () => {
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

module.exports={generatePURCHASEToken}
