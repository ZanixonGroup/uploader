import axios from "axios";
import FormData from "form-data";
import { FileSize, MimeType } from "./../utils/helper.js";

export async function RyzenUploader(buffer) {
  if(!Buffer.isBuffer(buffer)) throw Error('Invalid buffer input!');
  if((await FileSize(buffer)) >= 104857600) throw Error('Max size upload for RyzenCDN is only 100MB!');
  
  const mime = await MimeType(buffer);
  const form = new FormData();
  form.append("file", Buffer.from(buffer), {
    filename: "zxn-" + Date.now() + "." + mime.ext,
    contentType: mime.mime
  });
  const raw = await axios.post("https://api.ryzendesu.vip/api/uploader/ryzencdn", form, {
    headers: {
      ...form.getHeaders()
    }
  });
  
  return raw?.data?.url || null;
}