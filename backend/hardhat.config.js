require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    fuji: {
      url: "https://api.avax-test.network/ext/bc/C/rpc", // Fuji Testnet
      chainId: 43113,
      accounts: [process.env.PRIVATE_KEY], // Add your private key in .env
      gasPrice: 25000000000,
    },
  },
};
