const AvalancheService = {
    web3: null,
    contract: null,
    contractAddress: '',
    
    async initialize() {
      // Check if MetaMask is installed
      if (window.ethereum) {
          // Request account access
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          this.web3 = new Web3(window.ethereum);
          return true;
      }
    },
    
    async switchToFujiTestnet() {
        try {
            await window.ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [{
                    chainId: '0xA869', // 43113 en hexadecimal (Fuji Testnet)
                    chainName: 'Avalanche Fuji C-Chain', // Nombre de la red
                    nativeCurrency: {
                        name: 'AVAX', // Nombre de la moneda nativa
                        symbol: 'AVAX', // Símbolo de la moneda nativa
                        decimals: 18 // Decimales de la moneda nativa
                    },
                    rpcUrls: ['https://api.avax-test.network/ext/bc/C/rpc'], // URL del RPC de Fuji
                    blockExplorerUrls: ['https://testnet.snowtrace.io/'] // URL del explorador de bloques
                }],
            });
            console.log('Cambiado a Avalanche Fuji Testnet');
        } catch (error) {
            console.error("Error al cambiar a la red de Fuji:", error);
            throw error;
        }
    },
    
    async getCurrentAccount() {
      const accounts = await this.web3.eth.getAccounts();
      return accounts[0];
    },
}