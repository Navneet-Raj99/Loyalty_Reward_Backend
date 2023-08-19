const { ethers } = require("ethers");
const { CONSTANTS } = require("../constants");
const { ABI } = require("../contracts/abis/customNFT");

async function issueNFT(wallet, imageUrl, nftType, value, sellerId) {
    console.log("entered");

    const provider = new ethers.providers.JsonRpcProvider(CONSTANTS["1337-RPC_URL"]);
    const contractABI = ABI.CUSTOMNFT;

    const contractAddress = CONSTANTS["1337-CUSTOMNFT"];

    const contract = new ethers.Contract(contractAddress, contractABI, provider);

    const signer = provider.getSigner();
    const contractWithSigner = contract.connect(signer);

    const gasLimit = await contractWithSigner.estimateGas.issueNFT(wallet, imageUrl, nftType, value, sellerId);
    const tx = await contractWithSigner.issueNFT(wallet, imageUrl, nftType, value, sellerId, { gasLimit });
    console.log(tx);
}

async function getNFTDataByWallet(wallet) {

    const provider = new ethers.providers.JsonRpcProvider(CONSTANTS["1337-RPC_URL"]);
    const contractABI = ABI.CUSTOMNFT;

    const contractAddress = CONSTANTS["1337-CUSTOMNFT"];


    const contract = new ethers.Contract(contractAddress, contractABI, provider);


    const nftData = await contract.getNFTsByWallet(wallet);
    console.log({ nftData });
    return nftData;
}

async function getNFTDataByWalletExp(wallet) {

    const provider = new ethers.providers.JsonRpcProvider(CONSTANTS["1337-RPC_URL"]);
    const contractABI = ABI.CUSTOMNFT;

    const contractAddress = CONSTANTS["1337-CUSTOMNFT"];


    const contract = new ethers.Contract(contractAddress, contractABI, provider);

    const nftDataExp = await contract.getNFTsByWalletExp(wallet);
    console.log({ nftDataExp });
    return nftDataExp;
}
async function expireNFT(tokenID, wallet) {

    const provider = new ethers.providers.JsonRpcProvider(CONSTANTS["1337-RPC_URL"]);
    const contractABI = ABI.CUSTOMNFT;

    const contractAddress = CONSTANTS["1337-CUSTOMNFT"];


    const contract = new ethers.Contract(contractAddress, contractABI, provider);

    const signer = provider.getSigner();
    const contractWithSigner = contract.connect(signer);
    await contractWithSigner.expireNFT(tokenID, wallet);

}
module.exports = { issueNFT, getNFTDataByWallet, getNFTDataByWalletExp, expireNFT }