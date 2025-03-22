const AvalancheService = {
    web3: null,
    
    async initialize() {
      // Esto verifica si tienes una wallet instalada
      if (window.ethereum) {
          // Pide acceso a la cuenta
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
                    chainName: 'Avalanche Fuji C-Chain', 
                    nativeCurrency: {
                        name: 'AVAX', 
                        symbol: 'AVAX', 
                        decimals: 18 
                    },
                    rpcUrls: ['https://api.avax-test.network/ext/bc/C/rpc'], 
                    blockExplorerUrls: ['https://testnet.snowtrace.io/'],
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