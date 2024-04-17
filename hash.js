const bcrypt = require("bcrypt");

async function run() {
  const result = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash("12346", result);
  console.log(result);
  console.log(hash);
}

run();
