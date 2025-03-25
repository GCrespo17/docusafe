const IPFSService = {
  pinataJwt: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI5NzgzOGU3NS1iYzlhLTQyMmUtOWU0Mi0wNmIyYWRmN2JiMjQiLCJlbWFpbCI6ImdjcmVzcG8xNzA1QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6IkZSQTEifSx7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6Ik5ZQzEifV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiJjN2E0NjRhMjJmMTNmZjJhNmJmMSIsInNjb3BlZEtleVNlY3JldCI6IjliYmM5N2RhMDBjZTYzZDFhYWFiMTE5YjVjMGMzZTljZTMwZmNlZmE1NDY5ODczYTZjMWVlZTI5MWNiY2RhZGUiLCJleHAiOjE3NzQ0NzYxMzl9.YqENg-0D8ketAqOROa8gKnp3MbcHxeGZ1T_xBEN4syw",
  gateway: "https://gateway.pinata.cloud/ipfs/",

  async uploadDocument(file) {
      try {
          const formData = new FormData();
          formData.append('file', file);

          //Agregar metadatos
          const metadata = {
              name: file.name,
              keyvalues: {
                  app: "Docusafe",
              }
          };
          formData.append('pinataMetadata', JSON.stringify(metadata));


          // Enviar a Pinata
          const response = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
              method: 'POST',
              headers: {
                  'Authorization': this.pinataJwt
              },
              body: formData
          });

          if (!response.ok) {
              const errorData = await response.json();
              console.error("Error details:", errorData);
              throw new Error(errorData.error || "Error al subir");
          }

          const result = await response.json();
          return result.IpfsHash; // Retorna el CID

      } catch (error) {
          console.error("Error en IPFSService:", error);
          throw new Error(`Falló la subida: ${error.message}`);
      }
  },

  getDocumentUrl(ipfsHash) {
      return `${this.gateway}${ipfsHash}`;
  }
};