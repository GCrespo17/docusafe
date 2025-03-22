require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();


/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    fuji: {
      url: "https://api.avax-test.network/ext/bc/C/rpc", // Fuji Testnet
      chainId: 43113,
      accounts: [process.env.PRIVATE_KEY], 
      gasPrice: 25000000000,
    },
  },
};
