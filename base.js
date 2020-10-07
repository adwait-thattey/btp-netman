const { exec } = require('child_process')
const path = require('path');
const { spawn } = require('child_process');
const net_path = "../tutorials/fabric-samples/test-network";

const bin_path = "../tutorials/fabric-samples/bin/"
const configtxgen_path = "../tutorials/fabric-samples/bin/configtxgen";

process.env.FABRIC_CFG_PATH = path.join(net_path, "configtx");

exports.execPromise = function execPromise(cmd) {
    // const exec = require('child_process').exec;
    return new Promise((resolve, reject) => {
        exec(cmd, (error, stdout, stderr) => {
            if (error) {
                console.warn(error);
            }
            resolve({ error: error, stdout: stdout, stderr: stderr });
        });
    });
}

exports.cmd_output = output => {
    console.log("----------STDOUT---------")
    console.log(output.stdout)
    console.log("\n-----------------LOGS-----------")
    console.log(output.stderr)
}

exports.path_configtxgen = configtxgen_path
exports.path_net_base = net_path
exports.bin_path = bin_path
