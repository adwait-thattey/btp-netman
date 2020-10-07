const { exec } = require('child_process')
const path = require('path');
const {spawn} = require('child_process');
const net_path = "../tutorials/fabric-samples/test-network";

const configtxgen_path = "../tutorials/fabric-samples/bin/configtxgen";

process.env.FABRIC_CFG_PATH = path.join(net_path,"configtx");

function execPromise(cmd) {
    // const exec = require('child_process').exec;
    return new Promise((resolve, reject) => {
     exec(cmd, (error, stdout, stderr) => {
      if (error) {
       console.warn(error);
      }
      resolve({error:error, stdout:stdout, stderr:stderr});
     });
    });
   }


/*
let cm = exec("ls -l", (err, stdout, stderr) => {
    console.log("Error", err);
    console.log("STDOUT", stdout);
    console.log("STDERR", stderr);
})

cm.on('exit', code => {
    console.log(code)
})
*/

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
/*
let cm = exec(`${configtxgen_path} -version`, (err, stdout, stderr) => {
    // console.log("Error", err);
    console.log("STDOUT", stdout);
    console.log("STDERR", stderr);
})

cm.on('exit', code => {
    // console.log(code)
})

*/

execPromise(`${configtxgen_path} -version`).then(obj=>console.log(obj))