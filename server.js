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

orderer = Orderer("")
org1 = Organization("org1.example.com", "Org1MSP")
org2 = Organization("org2.example.com", "Org2MSP")
peer1 = Peer()
peer2 = Peer()
channel1 = Channel("channel1")


data.channels["channel1"] = channel1

const this_run = async () => {
    await channelControllers.createChannel()
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


