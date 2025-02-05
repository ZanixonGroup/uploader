import axios from "axios";
import { LitterBoxUploader } from "./src/index.js";

let video = "https://cdn.videy.co/eawVNAOu1.mp4",
 image = "https://telegra.ph/file/3838948e59859e543df1d.jpg"
const eg = (await axios.get(image, {
  responseType: "arraybuffer"
})).data;

LitterBoxUploader(eg).then(console.log).catch(console.log)