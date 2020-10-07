let {execPromise, cmd_output, execWrapper, cmd_live_output} = require('../base')
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
    
    let obj = await execPromise(cmd)
    cmd_output(obj)

    // process.env.FABRIC_CFG_PATH = path.join(path_net_base, "configtx");
}

exports.peerChannelJoin = async(org, peer, user, channel) => {
    // process.env.FABRIC_CFG_PATH = path.join(path_net_base, "../config");
    
    // setPeerEnvs(orgname, peername,peermsp,peeradd, username )
    pathmaker.setPeerEnvs(org,peer,user)

    const cmd = `${pathmaker.peer_app} channel join -b ${channel.block_path(0)}`

    let obj = await execPromise(cmd)
    cmd_output(obj)

    // process.env.FABRIC_CFG_PATH = path.join(path_net_base, "configtx");
}


exports.peerChannelGetInfo = async(org, peer, user, channel) => {
    pathmaker.setPeerEnvs(org, peer, user)

    const cmd=`${pathmaker.peer_app} channel getinfo -c ${channel.name}`

    let obj = await execPromise(cmd)
    cmd_output(obj)

    // process.env.FABRIC_CFG_PATH = path.join(path_net_base, "configtx");
}

exports.fetchBlockUsingOrderer = async(org, peer, user, channel, orderer, block_number) => {
    // peer channel fetch 0 ./channel-artifacts/channel_org2.block -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com -c channel1 --tls --cafile ${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem
    // path_net_base = "/run/media/coderdude/Adwait/Projects/btp_fabric/tutorials/fabric-samples/test-network"
    pathmaker.setPeerEnvs(org,peer,user)

    cmd=`${pathmaker.peer_app} channel fetch ${block_number} ${channel.block_path(block_number)} -o ${orderer.address} --ordererTLSHostnameOverride ${orderer.name} -c ${channel.name} --tls --cafile ${pathmaker.orderer_orgs_path}/example.com/orderers/${orderer.name}/msp/tlscacerts/tlsca.example.com-cert.pem`

    let obj = await execPromise(cmd)
    cmd_output(obj)
    
}

exports.deployPrebuiltChainCode = async(channel, initMethod="InitLedger") => {
    // ./network.sh deployCC --ccn basic -c channel1 --cci InitLedger 

    // path_net_base = "/run/media/coderdude/Adwait/Projects/btp_fabric/tutorials/fabric-samples/test-network"
    const code_name = "basic"
    cmd=`cd ${pathmaker.net_path}; ./network.sh deployCC -ccn ${code_name} -ccl javascript -c ${channel.name} -cci ${initMethod}`

    const ex = await execWrapper(cmd)
    cmd_live_output(ex)

    await new Promise((resolve, reject) => {
        ex.on('exit', code => {
            resolve(code);
        })
    });
    // let obj = spawn(cmd)
    // cmd_output(obj)

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