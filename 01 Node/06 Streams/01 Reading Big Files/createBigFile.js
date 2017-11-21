const fs = require('fs');

const file = fs.createWriteStream('./big.file');

for (let index = 0; index < 1e6; index++) {
  file.write(`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ac scelerisque massa, sit amet consectetur enim.
  Aenean sit amet justo arcu. Fusce porttitor ipsum erat, quis aliquam diam congue id. Mauris maximus iaculis velit a faucibus.
  Quisque cursus a mauris sit amet ullamcorper. Morbi malesuada nibh sem, sit amet porta mauris dignissim ac.
  Donec euismod vitae felis at rhoncus.`);
}

file.end();
