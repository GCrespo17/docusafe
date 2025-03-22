const connectButton = document.getElementById('connect-button');
const address = document.getElementById('address');

if(typeof window.ethereum !== 'undefined'){
    console.log('MetaMask is installed!');
}

connectButton.addEventListener('click', async ()=>{

    const avalancheInitialized = await AvalancheService.initialize();

    // console.log('Connecting');
    // const accounts=await window.ethereum.request({method: 'eth_requestAccounts'});

    // const account=accounts[0];
    const account= await AvalancheService.getCurrentAccount();
    console.log(account);
    address.textContent=`${account}`;

});