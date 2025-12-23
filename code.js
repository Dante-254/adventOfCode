const fs = require("fs");
let dialList = [];
for (let i = 0; i <= 99; i++) {
  dialList.push(i);
}
function checkDialValue(dialvalue) {
  if (dialvalue > 99) {
    dialvalue = dialvalue - 100 * Math.floor(dialvalue / 100);
  } else if (dialvalue < 0) {
    dialvalue = dialvalue + 100;
  }
  return dialvalue;
}
function click(code) {
  let dialValue = 0;
  if (code[0] === "R") {
    dialValue += Number(code.slice(1)) % 100;
    return dialValue;
  } else if (code[0] === "L") {
    dialValue -= Number(code.slice(1)) % 100;
    return dialValue;
  } else {
    return;
  }
}

fs.readFile("output.txt", "utf8", (err, listCode) => {
  if (err) {
    console.error(err);
    return;
  }

  function hundredthPasses() {
    var hundredthCount = 0;
    for (let i = 0; i < listCode.split("\n").length; i++) {
      // console.log(splitCode);
      let code = Number(listCode.split("\n")[i].slice(1));
      // console.log(code);
      let hundredths = Number((Number(code) / 100).toString().slice(0, 1));
      hundredthCount += hundredths;
    }
    console.log(hundredthCount);
  }

  function main() {
    let dialValue = 50;
    let zeroPasses = 0;
    let checkDialValuecount = 0;
    for (let i = 0; i < listCode.split("\n").length; i++) {
      dialValue += click(listCode.split("\n")[i]);
      let checkedDialValue1 = dialValue;
      dialValue = checkDialValue(dialValue);
      let checkedDialValue2 = dialValue;
      if (checkedDialValue1 !== checkedDialValue2) {
        checkDialValuecount++;
      }

      if (dialValue === 0) zeroPasses++;
      // console.log(zeroPasses, dialValue, listCode.split("\n")[i]);
    }
    console.log(`CheckDialValue called ${checkDialValuecount} times`);
    return zeroPasses;
  }
  console.log(main());
  hundredthPasses();
});
