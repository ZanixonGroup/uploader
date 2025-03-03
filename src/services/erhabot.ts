import axios from "axios";
import FormData from "form-data";
import { FileSize, MaxFileSize, MimeType } from "./../utils/helper";

export async function Erhabot(data: Uint8Array) {
  if(!Buffer.isBuffer(data)) throw new Error("Invalid buffer input!");
  if(FileSize(data) >= MaxFileSize(5)) throw new Error("Max file upload for catbox is only 5MB!");
  
  const type = await MimeType(data);
  if(!type || !["jpg","jpeg","png"].includes(type?.ext)) throw Error('Only support image!');
  
  const form = new FormData();
  form.append("file", Buffer.from(data), {
    filename: type ? "erha-" + Date.now() + "." + type?.ext : "",
    contentType: type?.mime || ""
  });
  const raw = await axios.post("https://cdn.erhabot.com/upload", form, {
    headers: {
      ...form.getHeaders(),
      'origin': 'https://litterbox.catbox.moe',
      'user-agent': 'Postify/1.0.0'
    }
  });
  return raw?.data?.data?.url || null;
}

export default Erhabot;