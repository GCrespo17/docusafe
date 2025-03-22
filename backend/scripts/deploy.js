const hre=require("hardhat");

async function main(){
    const DocumentManagement = await hre.ethers.getContractFactory("DocumentManagement");

    console.log('Desplegando contrato');
    const documentManagement = await DocumentManagement.deploy();

    
    const deployTx = await documentManagement.deployTransaction?.wait();
    

    const address = documentManagement.address || 
                    (await documentManagement.getAddress?.()) || 
                    deployTx?.contractAddress;

    console.log(`Document deployed to: , ${address}`);


}

main().catch((error)=>{
    console.error(error);
    process.exitCode=1;
});