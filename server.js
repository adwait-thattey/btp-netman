const { exec } = require('child_process')
const path = require('path');
const {spawn} = require('child_process');
const net_path = "../tutorials/fabric-samples/test-network";

const configtxgen_path = "../tutorials/fabric-samples/bin/configtxgen";


const Peer = require('./models/peer')
const Channel = require('./models/channel')
const Orderer = require('./models/orderer')
const User = require('./models/user');
const Organization = require('./models/org');
const data = require('./data/data');

const channelControllers = require('./channel/controllers')

const orderer = new Orderer("orderer.example.com", "ordererMSP", "localhost:7050")
const org1 = new Organization("org1.example.com", "Org1MSP")
const org2 = new Organization("org2.example.com", "Org2MSP")
const peer1 = new Peer(org1, "peer0.org1.example.com", "Org1MSP", "localhost:7051")
const peer2 = new Peer(org2, "peer0.org2.example.com", "Org2MSP", "localhost:9051")
const channel1 = new Channel("channel1")
const admin1 = new User("Admin@org1.example.com", org1)
const admin2 = new User("Admin@org2.example.com", org2)


data.channels[channel1.name] = channel1
data.orderers[orderer.name] = orderer
data.orgs[org1.name] = org1
data.orgs[org2.name] = org2
data.peers[peer1.name] = peer1
data.peers[peer2.name] = peer2
data.users[admin1.name] = admin1
data.users[admin2.name] = admin2

const this_run = async () => {
    // await channelControllers.createChannel()
    // await channelControllers.peerJoinChannelController()
    // await channelControllers.ordererfetchBlockController()
    // await channelControllers.deployPreBuiltChainCodeController()
}

this_run()

// channel.peerChannelJoin("org1.example.com","peer0.org1.example.com","Org1MSP","localhost:7051", "Admin@org1.example.com")
// channel.peerChannelGetInfo("org1.example.com","peer0.org1.example.com","Org1MSP","localhost:7051", "Admin@org1.example.com")
const join_and_get_info = async () => {
    await channel.createChannelTx()
    await channel.peerCreateChannel()
    await channel.peerChannelJoin({
        params:{
        orgname:"org1.example.com",
        peername:"peer0.org1.example.com",
        peermsp:"Org1MSP",
        peeradd:"localhost:7051",
        username:"Admin@org1.example.com"
        }
    })
    await channel.peerChannelGetInfo({
        orgname:"org1.example.com",
        peername:"peer0.org1.example.com",
        peermsp:"Org1MSP",
        peeradd:"localhost:7051",
        username:"Admin@org1.example.com"
    })

    await channel.peerChannelJoin({
        params:{
        orgname:"org2.example.com",
        peername:"peer0.org2.example.com",
        peermsp:"Org2MSP",
        peeradd:"localhost:9051",
        username:"Admin@org2.example.com"
        }
    })
    await channel.peerChannelGetInfo({
        orgname:"org2.example.com",
        peername:"peer0.org2.example.com",
        peermsp:"Org2MSP",
        peeradd:"localhost:9051",
        username:"Admin@org2.example.com"
    })
}

// join_and_get_info()



// channel.fetchBlock({
//     params:{
//         orgname:"org2.example.com",
//         peername:"peer0.org2.example.com",
//         peermsp:"Org2MSP",
//         peeradd:"localhost:9051",
//         username:"Admin@org2.example.com"
//     },
//     block_no:0,
//     channel_name:"channel1",
//     orderer_details: {
//         name:"orderer.example.com",
//         address:"localhost:7050"
//     }
// })

// channel.deployPrebuiltChainCode("basic", "channel1")
// exports.peer2ChannelJoin = async() => {
//     export CORE_PEER_TLS_ENABLED=true
//     export CORE_PEER_LOCALMSPID="Org2MSP"
//     export CORE_PEER_TLS_ROOTCERT_FILE=${PWD}/organizations/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt
//     export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/org2.example.com/users/Admin@org2.example.com/msp
//     export CORE_PEER_ADDRESS=localhost:9051
// }


