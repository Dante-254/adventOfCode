const fs = require("fs");
function checkDialValue(v) {
  return ((v % 100) + 100) % 100;
}

function click(code) {
  if (!code) return 0;
  const dir = code[0];
  const n = Number(code.slice(1));
  if (Number.isNaN(n)) return 0;
  return dir === "R" ? n : dir === "L" ? -n : 0;
}

fs.readFile("output.txt", "utf8", (err, listCode) => {
  if (err) {
    console.error(err);
    return;
  }
  const lines = listCode.split(/\r?\n/).filter(Boolean);
  let dialValue = 50;
  let zeroPasses = 0;
  for (let i = 0; i < lines.length; i++) {
    const cmd = lines[i].trim();
    const delta = click(cmd);
    if (delta === 0 && cmd[0] !== "R" && cmd[0] !== "L") continue; // skip invalid/blank

    if (delta > 0) {
      zeroPasses += Math.floor((dialValue + delta) / 100);
    } else if (delta < 0) {
      const steps = -delta;
      if (steps >= dialValue) {
        zeroPasses += 1 + Math.floor((steps - dialValue) / 100);
      }
    }

    dialValue = checkDialValue(dialValue + delta);
    if (dialValue === 0) zeroPasses++;
  }
  console.log(zeroPasses);
});
