const fs = require('fs');
const text = 'NavigationTree.json';

fs.readFile('NavigationTree.json', (err, data) => {
    if (err) throw err;
    let arr = data.toString();
    let json = JSON.parse(arr);
    console.log(json);
  });

