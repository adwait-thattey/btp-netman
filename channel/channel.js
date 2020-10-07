let {execPromise, path_configtxgen, path_net_base, bin_path, cmd_output} = require('../base')
const path = require('path')
const pathmaker = require('../models/pathmaker')

// const {spawn} = require('child_process')
exports.createChannelTx = async (channel) => {
    process.env.FABRIC_CFG_PATH=`${pathmaker.net_path}/configtx`
    let obj = await execPromise(`${pathmaker.configtxgen} -profile TwoOrgsChannel -outputCreateChannelTx ${channel.tx_path(0)} -channelID ${channel.name}`)

    cmd_output(obj)
}



exports.peerCreateChannel = async (org, peer, user, orderer, channel) => {

    pathmaker.setPeerEnvs(org, peer, user)

    const cmd = `${pathmaker.peer_app} channel create -o ${orderer.address}  --ordererTLSHostnameOverride ${orderer.name} -c ${channel.name} -f ${channel.tx_path(0)} --outputBlock ${channel.block_path(0)} --tls --cafile ${pathmaker.orderer_orgs_path}/example.com/orderers/${orderer.name}/msp/tlscacerts/tlsca.example.com-cert.pem`
    
    cmd_output(obj)

    // process.env.FABRIC_CFG_PATH = path.join(path_net_base, "configtx");
}

exports.peerChannelJoin = async({params,channel_block_path}) => {
    // process.env.FABRIC_CFG_PATH = path.join(path_net_base, "../config");
    
    // setPeerEnvs(orgname, peername,peermsp,peeradd, username )
    setPeerEnvs(params)
    
    if(channel_block_path === undefined)
        channel_block_path = path.join(path_net_base, '/channel-artifacts/channel1.block')

    const cmd = `${bin_path}/peer channel join -b ${channel_block_path}`

    let obj = await execPromise(cmd)
    console.log("STDOUT", obj.stdout)
    console.log("\n STDERR", obj.stderr)

    process.env.FABRIC_CFG_PATH = path.join(path_net_base, "configtx");
}


exports.peerChannelGetInfo = async(params) => {
    setPeerEnvs(params)

    const cmd=`${bin_path}/peer channel getinfo -c channel1`

    let obj = await execPromise(cmd)
    console.log("STDOUT", obj.stdout)
    console.log("\n STDERR", obj.stderr)

    process.env.FABRIC_CFG_PATH = path.join(path_net_base, "configtx");
}

exports.fetchBlock = async({params, block_no, orderer_details, channel_name}) => {
    // peer channel fetch 0 ./channel-artifacts/channel_org2.block -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com -c channel1 --tls --cafile ${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem
    path_net_base = "/run/media/coderdude/Adwait/Projects/btp_fabric/tutorials/fabric-samples/test-network"
    setPeerEnvs(params)
    cmd=`${bin_path}/peer channel fetch ${block_no} ${path_net_base}/channel-artifacts/channel_${channel_name}_${block_no}.block -o ${orderer_details.address} --ordererTLSHostnameOverride ${orderer_details.name} -c ${channel_name} --tls --cafile ${path_net_base}/organizations/ordererOrganizations/example.com/orderers/${orderer_details.name}/msp/tlscacerts/tlsca.example.com-cert.pem`

    let obj = await execPromise(cmd)
    console.log("STDOUT", obj.stdout)
    console.log("\n STDERR", obj.stderr)
    
}

exports.deployPrebuiltChainCode = async(ccname, channel_name, initMethod="InitLedger") => {
    // ./network.sh deployCC --ccn basic -c channel1 --cci InitLedger 

    path_net_base = "/run/media/coderdude/Adwait/Projects/btp_fabric/tutorials/fabric-samples/test-network"
    cmd=`cd ${path_net_base}; ./network.sh deployCC -ccn ${ccname} -ccl javascript -c ${channel_name} -cci ${initMethod}`

    let obj = await execPromise(cmd)
    // let obj = spawn(cmd)
    console.log("STDOUT", obj.stdout)
    console.log("\n STDERR", obj.stderr)

    /*
        const ll = spawn('ls', ['-l', '.']);

        ll.stdout.on('data', data=>{
            console.log("STDOUT:\n", data.toString());
        })

        ll.stderr.on('data', data=>{
            console.log("STDERR:\n", data.toString());
        })

        ll.stdout.on('close', code=>{
            console.log("Exitcode:\n",code );
        })
        */
}