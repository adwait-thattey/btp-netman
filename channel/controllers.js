const data = require('../data/data')
const channelUtils = require('./channel')

exports.createChannel = async () => {
    let channel_name = "channel1"
    let peer_name = "peer0.org1.example.com"
    let orderer = data.orderers["orderer.example.com"]
    let admin1 = data.users["Admin@org1.example.com"]
    let org1 = data.orgs["org1.example.com"]

    const new_channel = data.channels[channel_name]
    const peer = data.peers[peer_name]

    // await channelUtils.createChannelTx(new_channel)
    await channelUtils.peerCreateChannel(org1,peer,admin1,orderer,new_channel)
}

exports.peerJoinChannelController = async () => {
    let channel_name = "channel1"
    let peer1_name = "peer0.org1.example.com"
    let peer2_name = "peer0.org2.example.com"
    let orderer = data.orderers["orderer.example.com"]
    let admin1 = data.users["Admin@org1.example.com"]
    let admin2 = data.users["Admin@org2.example.com"]
    let org1 = data.orgs["org1.example.com"]
    let org2 = data.orgs["org2.example.com"]

    const new_channel = data.channels[channel_name]
    const peer1 = data.peers[peer1_name]
    const peer2 = data.peers[peer2_name]

    await channelUtils.peerChannelJoin(org1, peer1,admin1,new_channel);
    await channelUtils.peerChannelGetInfo(org1, peer1, admin1, new_channel);
    
    await channelUtils.peerChannelJoin(org2, peer2,admin2,new_channel);
    await channelUtils.peerChannelGetInfo(org2, peer2, admin2, new_channel);

}

exports.ordererfetchBlockController = async () => {
    let channel_name = "channel1"
    let peer1_name = "peer0.org1.example.com"
    let peer2_name = "peer0.org2.example.com"
    let orderer = data.orderers["orderer.example.com"]
    let admin1 = data.users["Admin@org1.example.com"]
    let admin2 = data.users["Admin@org2.example.com"]
    let org1 = data.orgs["org1.example.com"]
    let org2 = data.orgs["org2.example.com"]

    const new_channel = data.channels[channel_name]
    const peer1 = data.peers[peer1_name]
    const peer2 = data.peers[peer2_name]

    await channelUtils.fetchBlockUsingOrderer(org1,peer1,admin1,new_channel,orderer,0)
}

exports.deployPreBuiltChainCodeController = async () => {
    let channel_name = "channel1"
    let peer1_name = "peer0.org1.example.com"
    let peer2_name = "peer0.org2.example.com"
    let orderer = data.orderers["orderer.example.com"]
    let admin1 = data.users["Admin@org1.example.com"]
    let admin2 = data.users["Admin@org2.example.com"]
    let org1 = data.orgs["org1.example.com"]
    let org2 = data.orgs["org2.example.com"]

    const new_channel = data.channels[channel_name]
    const peer1 = data.peers[peer1_name]
    const peer2 = data.peers[peer2_name]

    await channelUtils.deployPrebuiltChainCode(new_channel)
}