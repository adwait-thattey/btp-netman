const pathmaker = require('./pathmaker')
const path = require('path')

class Channel {
    constructor(name) {
        this.name = name
    }

    block_path = block_number => {
        return path.join(pathmaker.channel_artifacts_path, this.name+ "_" + block_number + ".block")
    }

    tx_path = tx_number => {
        return path.join(pathmaker.channel_artifacts_path, this.name+ "_" + block_number + ".tx")
    
    }
}

module.exports = Channel