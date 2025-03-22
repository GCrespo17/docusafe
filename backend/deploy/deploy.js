const hre=require("hardhat");

async function main(){
    const DocumentManagement = await hre.ethers.getContractFactory("DocumentManagement");
    const documentManagement = await DocumentManagement.deploy();

    await documentManagement.deployed();

    console.log("Document deployed to: ", documentManagement.address);

    main().catch((error)=>{
        console.error(error);
        process.exitCode=1;
    });
}