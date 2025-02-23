import axios from "axios";
import { RyzenUploader } from "./../src/index.ts";

let video = "https://cdn.videy.co/eawVNAOu1.mp4"
let image = "https://telegra.ph/file/3838948e59859e543df1d.jpg"

async function getBuffer(type: number): Promise<buffer> {
  const raw = await axios.get((type === 1) ? image : video, {
    responseType: "arraybuffer"
  });
  return raw.data;
}

RyzenUploader(await getBuffer(1))
  .then(console.log)
  .catch(console.log)