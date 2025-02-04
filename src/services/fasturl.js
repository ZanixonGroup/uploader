import axios from "axios";
import FormData from "form-data";
import { FileSize, MimeType } from "./../utils/helper.js";

export async function FastUrlUploader(buffer) {
  if(!Buffer.isBuffer(buffer)) throw Error('Invalid buffer input!');
  if((await FileSize(buffer)) >= 104857600) throw Error('Max size upload for FastUrlCDN is only 100MB!');
  
  const mime = await MimeType(buffer);
  const form = new FormData();
  form.append("file", Buffer.from(buffer), {
    filename: "zxn-" + Date.now() + "." + mime.ext,
    contentType: mime.mime
  });
  const raw = await axios.post("https://fastrestapis.fasturl.cloud/downup/uploader-v2", form, {
    headers: {
      ...form.getHeaders()
    }
  });
  
  return raw?.data?.result || null;
}