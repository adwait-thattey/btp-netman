
const path = require('path')

exports.fabric_path = "/run/media/coderdude/Adwait/Projects/btp_fabric/tutorials/fabric-samples/"

exports.bin_path = path.join(this.fabric_path, 'bin')
exports.configtxgen = path.join(this.bin_path, "configtxgen")
exports.peer_app = path.join(this.bin_path, "peer")


exports.net_path = path.join(this.fabric_path, 'test-network')
exports.channel_artifacts_path = path.join(this.net_path, "channel-artifacts")
exports.orgs_path = path.join(this.net_path, "organizations")
exports.peer_orgs_path = path.join(this.orgs_path, "peerOrganizations")
exports.orderer_orgs_path = path.join(this.orgs_path, "ordererOrganizations")

exports.peer_path = (orgName, peerName) => {
    return path.join(this.peer_orgs_path, orgName, "peers", peerName)
}

exports.user_path = (orgName, userName) => {
    return path.join(this.peer_orgs_path, orgName, "users", userName)
}

exports.setPeerEnvs = (org, peer, user) => {
    
    process.env.FABRIC_CFG_PATH = path.join(this.net_path, "../config");
    process.env.CORE_PEER_TLS_ENABLED=true
    process.env.CORE_PEER_LOCALMSPID=peer.msp
    process.env.CORE_PEER_TLS_ROOTCERT_FILE=`${this.peer_path(org.name, peer.name)}/tls/ca.crt`
    process.env.CORE_PEER_MSPCONFIGPATH=`${this.user_path(org.name, user.name)}/msp`
    process.env.CORE_PEER_ADDRESS=peeradd
}

