const AvalancheService = {
    web3: null,
    contract: null,
    contractAddress: '0x5E16893b88CB26F135976455970692Fa5CeB9E98',
    
    async initialize() {
      // Esto verifica si tienes una wallet instalada
      if (window.ethereum) {
          // Pide acceso a la cuenta
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          this.web3 = new Web3(window.ethereum);

          const contractABI = await fetch('/contractABI/DocumentManagement.json').then(response => response.json())
          .then(data => data.abi);

          this.contract = new this.web3.eth.Contract(contractABI, this.contractAddress);
          return true;
      } else {
          alert('Tienes que tener una wallet instalada')
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

    async addDocument(ipfsHash, name){
        const account = await this.getCurrentAccount();
        return this.contract.methods.addDocument(ipfsHash, name).send({from: account});
    },

    async getDocumentsDetails(docIds, account) {
        const documents = [];
        for (const id of docIds) {
          try {
            const doc = await this.contract.methods.getDocument(id).call({ from: account });
            documents.push({
              id,
              ipfsHash: doc[0],
              owner: doc[1],
              name: doc[2],

            });
          } catch (error) {
            console.error(`Failed to get document ${id}:`, error);
          }
        }
        return documents;
    },

    async getAllDocuments(){
        const account = await this.getCurrentAccount();
        const docIds = await this.contract.methods.getAllDocuments().call({from: account});
        return this.getDocumentsDetails(docIds, account);
   },

   async shareDocument(ipfsCid, address) {
    try {
        const account = await this.getCurrentAccount();
        

        if (typeof ipfsCid !== 'string') {
            throw new Error("El CID debe ser un string");
        }
        const checksumAddress = this.web3.utils.toChecksumAddress(address);
        
        console.log("Enviando transacción con:", {
            ipfsCid: ipfsCid,
            address: checksumAddress,
            account: account
        });

        const tx = await this.contract.methods.giveDocument(ipfsCid, checksumAddress).send({from: account });

        console.log("Transacción exitosa:", tx.transactionHash);
        return tx;

    } catch (error) {
        console.error(" Error completo:", {
            message: error.message,
            data: error.data,
            stack: error.stack
        });
        throw new Error(`Error al compartir: ${error.message}`);
    }
}

}