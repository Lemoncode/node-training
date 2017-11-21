const fs = require('fs');

const conversionMap = {
  '88': '65',
  '89': '66',
  '90': '67',
};

fs.readFile(__filename, (err, buffer) => {
  let tags = buffer.slice(-5, -1);
  tags.forEach(
    (value, index) => tags[index] = conversionMap[value]
  );
  console.log(buffer.toString());
});

// TAG: XYZ
