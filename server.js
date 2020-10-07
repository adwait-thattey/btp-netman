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

