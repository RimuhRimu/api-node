const os = require('os');
const repl = require('repl');

console.log(os.cpus())
console.log(os.userInfo())
console.log(os.arch())
console.log(os.type())
console.log(os.tmpdir())
console.log(os.uptime())
console.log(os.freemem())
console.log(os.homedir())
console.log(os.loadavg())
console.log(os.release())
console.log(os.version())
console.log(os.hostname())
console.log(os.platform())
console.log(os.totalmem())
console.log(os.endianness())
console.log(os.networkInterfaces())
console.log(os.getPriority())
repl.writer = '$ Date()'
console.log(repl.start())
