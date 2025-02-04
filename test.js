import axios from "axios";
import { RyzenUploader } from "./src/index.js";

const eg = (await axios.get("https://telegra.ph/file/3838948e59859e543df1d.jpg", {
  responseType: "arraybuffer"
})).data;

RyzenUploader(eg).then(console.log).catch(console.log)