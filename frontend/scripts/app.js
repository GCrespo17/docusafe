const connectButton = document.getElementById('connect-button');
const address = document.getElementById('address');



if(typeof window.ethereum !== 'undefined'){
    console.log('MetaMask is installed!');
}

connectButton.addEventListener('click', async ()=>{

    const avalancheInitialized = await AvalancheService.initialize();
    const ipfsInitialized = await IPFSService.initialize();

    const account= await AvalancheService.getCurrentAccount();
    console.log(account);
    address.textContent=`${account}`;
    if (typeof AvalancheService !== 'undefined' && AvalancheService.web3) {
        console.log(AvalancheService);
    }
});

async function uploadDocument(event){
    //Este prevent default es para que la pagina no recarge o se redireccione a un url, lo que usualmente hace
    event.preventDefault();

    const status=document.getElementById('document-status');
    const file=document.getElementById('document-file');
    const name=document.getElementById('document-name');
    try{
        status.textContent='Subiendo a IPFS';
        const ipfsHash= await IPFSService.uploadDocument(file.files[0]);

        status.textContent='Registrando el documento en avalanche';
        await AvalancheService.addDocument(ipfsHash, name.value);

        status.textContent='Documento subido exitosamente';

        event.target.reset();

    }catch(error){
        console.error('Error al subir el archivo', error);
        status.textContent='Error al subir el archivo';
    }
}

function showAllDocuments(listId, documents){
    const list = document.getElementById(listId);
    list.innerHTML = '';

    if (documents.length === 0) {
        listElement.innerHTML = '<li class="no-docs">No documents found</li>';
        return;
    }

    documents.forEach(doc =>{
        const li=document.createElement('li');
        
        const documentUrl = IPFSService.getDocumentUrl(doc.ipfsHash);

        const name=document.createElement('h3');
        name.textContent=doc.name;
        const url = document.createElement('a');
        url.href = documentUrl;
        url.textContent = 'View Document';
        url.target = '_blank'; // Abrir en una nueva pestaña

        li.appendChild(name);
        li.appendChild(url);

        list.appendChild(li);
    });

}

async function loadDocuments(){
    const documents = await AvalancheService.getAllDocuments();
    showAllDocuments('document-list', documents)
}

document.getElementById('upload-form').addEventListener('submit', uploadDocument);
document.getElementById('refresh-btn').addEventListener('click', loadDocuments);
