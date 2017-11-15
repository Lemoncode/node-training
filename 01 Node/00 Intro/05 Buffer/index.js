const buffer = Buffer.alloc(8);
console.log(buffer);

const buffer2 = Buffer.allocUnsafe(8);
console.log(buffer2);

buffer2.fill();
console.log(buffer2);

const string = 'touché';
const buffer3 = Buffer.from(string, 'ascii');

console.log(string, string.toString(), string.length);
console.log(buffer3, buffer3.toString(), string.length);
