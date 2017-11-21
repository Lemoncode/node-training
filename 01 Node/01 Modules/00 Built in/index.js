const os = require('os');

console.log(`Host: ${os.hostname()}`);
console.log(`15 min. load avarage ${os.loadavg()}`);

const toMb = (memory) => (
  Math.round((memory / 1024 / 1024) * 100) / 100
);

console.log(`
  ${toMb(os.freemem())} of ${toMb(os.totalmem())} Mb free
`);
