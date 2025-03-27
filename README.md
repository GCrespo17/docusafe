# DOCUSAFE MVP Digitalización de Documentos de forma descentralizada.

Docusafe es una plataforma descentralizada para almacenar y gestionar documentos, usando contratos inteligentes desplegados en la C-Chain de Avalanche, en este caso su Testnet. También se implementó el uso de IPFS para el almacenamiento de los documentos.

## Tecnologías Usadas
- **Blockchain**: Fuji Testnet.
- **Almacenamiento**: IPFS.
- **Contratos Inteligentes**: Solidity, desplegado con hardhat.
- **Frontend**: Vanilla Javascript, importando la librería Web3.js.

## Instalación
Usar el comando
git clone git@github.com:GCrespo17/docusafe.git
en la carpeta de preferencia.

## Instalación de Dependencias
- Se necesita algún gestionador de paquetes como NPM o Yarn.
- Se ejecutan los siguientes comandos para instalar dependencias en caso de modificar el contrato:
npm install --save-dev hardhat
npm install --save-dev @nomicfoundation/hardhat-toolbox
npm install dotenv --save

## Despliegue del contrato
- Se requiere la creación de un .env, en el cual existirá la siguiente variable de entorno la cual contendrá la private address de la wallet: PRIVATE_KEY:"private_address_sin_0x"

- Se ejecutan los siguientes comandos:
npx hardhat compile
npx hardhat run scripts/deploy.js --network fuji

## Conexión del frontend con el contrato
- El despliegue del contrato generó un archivo .JSON en la carpeta /artifacts/contracts el cual debe ser colocado en la carpeta /frontend/contractABI cada vez que se realice un nuevo despliegue del contrato.
- El address del contrato debe ser colocado en la variable contractAddress dentro del archivo avalanche-service.js

## Link de despliegue del MVP
https://docusafe.vercel.app/


