
export const CONSTANTS = {
    "1337-NAME": "Private Ganache",
    "1337-RPC_URL": "HTTP://127.0.0.1:7545",
    "1337-CUSTOMNFT": "0x8B0B092B0e2C3e652cAf9152774eBc3f662dbd3e"

}

export const IMAGE_CONSTANTS = {
    PURCHASE: "https://flipkarbucket.s3.ap-south-1.amazonaws.com/Tokens/WhatsApp+Image+2023-08-20+at+01.53.27.jpeg",
    SELLER: "https://flipkarbucket.s3.ap-south-1.amazonaws.com/Tokens/WhatsApp+Image+2023-08-20+at+01.53.38.jpeg",
    REFERAL: "https://flipkarbucket.s3.ap-south-1.amazonaws.com/Tokens/WhatsApp+Image+2023-08-20+at+01.53.27.jpeg"
}

export const TOKEN_TYPE_MAPPING = {
    "PURCHASE": 0,
    "SELLER": 1,
    "REFERAL": 2,
}

export const chainValue = (chainId, type) => {
    return CONSTANTS[chainId + "-" + type]
}

export const CUSTOMNFT = "CUSTOMNFT"


// module.exports = {
//     CONSTANTS, chainValue, CUSTOMNFT, IMAGE_CONSTANTS, TOKEN_TYPE_MAPPING
// }