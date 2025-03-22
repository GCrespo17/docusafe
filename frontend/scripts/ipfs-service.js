const IPFSService={
    ipfs: null,
    gateway: 'http://localhost:8080/ipfs/',

    async initialize(){
        this.ipfs = await window.IpfsHttpClient.create({
            host: 'localhost',
            port: '5001',
            protocol: 'http'
        });
        console.log(this.ipfs);
        return true;
    },

    async uploadDocument(file) {
        try {
          const result = await this.ipfs.add(file);
          const cid = result.cid.toString();
          console.log('Documento subido a IPFS. CID:', cid);
          return cid;
        } catch (error) {
            console.error('Error al subir el documento a IPFS:', error);
            throw error;
        }
      },
      
      
      getDocumentUrl(ipfsHash) {
        return `${this.gateway}${ipfsHash}`;
      }
};