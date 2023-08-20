// const { ethers } = require("ethers");
import { ethers } from "ethers";
import { CONSTANTS } from '../constants.js'
import { ABI } from '../contracts/abis/customNFT.js'
import orders from '../models/orderModel.js';
// const { ABI } = require("../contracts/abis/customNFT");

export async function issueNFT(wallet, imageUrl, nftType, value, sellerId, order_id) {
    try {
        console.log("entered");

        const provider = new ethers.providers.JsonRpcProvider(CONSTANTS["1337-RPC_URL"]);
        const contractABI = ABI.CUSTOMNFT;

        const contractAddress = CONSTANTS["1337-CUSTOMNFT"];

        const contract = new ethers.Contract(contractAddress, contractABI, provider);

        const signer = provider.getSigner();
        const contractWithSigner = contract.connect(signer);

        const gasLimit = await contractWithSigner.estimateGas.issueNFT(wallet, imageUrl, nftType, value, sellerId);
        const tx = await contractWithSigner.issueNFT(wallet, imageUrl, nftType, value, sellerId, { gasLimit });
        console.log(tx?.hash);

        await orders.findOneAndUpdate({_id:order_id},{tokenTransID:tx?.hash})

    } catch (error) {
        console.log(error)
    }

}

export async function getNFTDataByWallet(wallet) {

    try {
        const provider = new ethers.providers.JsonRpcProvider(CONSTANTS["1337-RPC_URL"]);
        const contractABI = ABI.CUSTOMNFT;

        const contractAddress = CONSTANTS["1337-CUSTOMNFT"];


        const contract = new ethers.Contract(contractAddress, contractABI, provider);


        const nftData = await contract.getNFTsByWallet(wallet);
        console.log({ nftData });
        return nftData;

    } catch (error) {
        console.log(error)
        return [];
    }

}

export async function getNFTDataByWalletExp(wallet) {
    try {
        const provider = new ethers.providers.JsonRpcProvider(CONSTANTS["1337-RPC_URL"]);
        const contractABI = ABI.CUSTOMNFT;

        const contractAddress = CONSTANTS["1337-CUSTOMNFT"];


        const contract = new ethers.Contract(contractAddress, contractABI, provider);

        const nftDataExp = await contract.getNFTsByWalletExp(wallet);
        console.log({ nftDataExp });
        return nftDataExp;

    } catch (error) {
        console.log(error)
        return []
    }


}
export async function expireNFT(tokenID, wallet) {
    try {
        const provider = new ethers.providers.JsonRpcProvider(CONSTANTS["1337-RPC_URL"]);
        const contractABI = ABI.CUSTOMNFT;

        const contractAddress = CONSTANTS["1337-CUSTOMNFT"];


        const contract = new ethers.Contract(contractAddress, contractABI, provider);

        const signer = provider.getSigner();
        const contractWithSigner = contract.connect(signer);
        await contractWithSigner.expireNFT(tokenID, wallet);

    } catch (error) {
        console.log(error);
    }



}

export async function autoEXPIRENFT(tokenID) {
    try {
        const provider = new ethers.providers.JsonRpcProvider(CONSTANTS["1337-RPC_URL"]);
        const contractABI = ABI.CUSTOMNFT;

        const contractAddress = CONSTANTS["1337-CUSTOMNFT"];


        const contract = new ethers.Contract(contractAddress, contractABI, provider);

        const signer = provider.getSigner();
        const contractWithSigner = contract.connect(signer);
        await contractWithSigner.autoExpireNFT(tokenID);

    } catch (error) {
        console.log(error);
    }



}
// module.exports = { issueNFT, getNFTDataByWallet, getNFTDataByWalletExp, expireNFT, autoEXPIRENFT }