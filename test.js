import axios from "axios";
import cdn from "./index.js";

async function start() {
  let buffer = await axios.get("https://cdn.sazumi.moe/file/mrwwgf.jpg", {
    responseType: "arraybuffer"
  });
  buffer = buffer.data;
  const up = await cdn.sazumi(buffer);
  if(!up.status) throw up;
  return up;
};

start()
  .then(console.log)
  .catch(console.log)