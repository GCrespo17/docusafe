// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract DocumentManagement{

    struct Document{
        string ipfsHash;
        address owner;
        string name;
        mapping(address => bool) authorizedUsers;
    }


    //Mappeo del documento para poder escoger un documento segun su numero
    mapping(bytes32 => Document) private documents;

    //Mappea el address del usuario con todos los documentos que el posee
    mapping(address => bytes32[]) private userDocuments;


    //Eventos
    event DocumentAdded(bytes32 indexed documentId, address indexed owner, string name);
    event DocumentGiven(bytes32 indexed documentId, address indexed owner, address indexed givenTo);
    

    function addDocument(string memory _ipfsHash, string memory _name) public returns (bytes32){
        bytes32 documentId = keccak256(abi.encodePacked(_ipfsHash, msg.sender));
        Document storage newDoc = documents[documentId];
        newDoc.ipfsHash=_ipfsHash;
        newDoc.owner=msg.sender;
        newDoc.name=_name;
        newDoc.authorizedUsers[msg.sender] = true;

        userDocuments[msg.sender].push(documentId);

        emit DocumentAdded(documentId, msg.sender, _name);
        return documentId;
    }

    function giveDocument(bytes32 _documentId, address _user) public{
        require(documents[_documentId].owner == msg.sender, "Only ther owner can share the document");
        require(_user != address(0), "Invalid user address");

        documents[_documentId].authorizedUsers[_user] = true;
        userDocuments[_user].push(_documentId);
    }



    function getDocument(bytes32 _documentId) public view returns (string memory, address, string memory){
        Document storage doc = documents[_documentId];
        return (doc.ipfsHash, doc.owner, doc.name);

    }

    function getAllDocuments() public view returns (bytes32[] memory){
        return userDocuments[msg.sender];
    }



}