import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json"

// const instance = new web3.eth.Contract(CampaignFactory.abi, "0x1cD8fEEc39Bf666a8B1AAEB0765A62F9b7C5B3D6");
const instance = new web3.eth.Contract(CampaignFactory.abi, "0x65570822B760dEaa93eC7A989547f5a370536955");
export default instance;