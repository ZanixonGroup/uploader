import axios from "axios";
import FormData from "form-data";
import { FileSize, MaxFileSize, MimeType } from "./../utils/helper.js";

export async function TmpRhbotUploader(buffer) {
  if(!Buffer.isBuffer(buffer)) throw Error('Invalid buffer input!');
  if((await FileSize(buffer)) >= MaxFileSize(100)) throw Error('Max size upload for TmpRhbot is only 100MB!');
  
  const mime = await MimeType(buffer);
  const form = new FormData();
  form.append("someFiles", Buffer.from(buffer), {
    filename: "zxn-" + Date.now() + "." + mime.ext,
    contentType: mime.mime
  });
  const raw = await axios.post("https://tmp.erhabot.xyz/api/upload", form, {
    headers: {
      ...form.getHeaders()
    }
  });
  
  return raw?.data?.data?.url || null;
}