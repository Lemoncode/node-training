const slowAdd = (a, b) => {
  for (let index = 0; index < 999999999; index++) { }
  return a + b;
};

const a = slowAdd(3, 3);
const b = slowAdd(4, 4);
const c = slowAdd(5, 5);

console.log(a);
console.log(b);
console.log(c);
