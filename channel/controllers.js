const data = require('../data/data')
const channelUtils = require('./channel')

exports.createChannel = async () => {
    let channel_name = "channel1"
    let peer_name = "peer0.org1.example.com"

    const new_channel = data.channels[channel_name]

    await channelUtils.createChannelTx(new_channel)
}