// deploy code will go here

const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');

const compiledFactory = require('./build/CampaignFactory.json');
const bytecode = compiledFactory.evm.bytecode;
const interface= compiledFactory.abi;

const provider = new HDWalletProvider(
    'senior trumpet before weather project hope vast rotate sleep benefit lady shift',
    //'https://rinkeby.infura.io/v3/db01ea5e21c14579b1da5d201146448d');
    'https://goerli.infura.io/v3/9b3377efa52646a1a173caf657b5268f');

 const web3 = new Web3(provider);

 const deploy = async ()=>{
    const accounts = await web3.eth.getAccounts();
    console.log('Attempting to deploy from account : ',accounts[0]);
    console.log(bytecode.object);
    const result = await new web3.eth.Contract(interface).deploy({
        data: bytecode.object
    })
    .send({gas: '10000000', from: accounts[0]});
    console.log(JSON.stringify(interface));
    console.log('Contract deployed to: ', result.options.address);
    provider.engine.stop();
 };

 deploy();

