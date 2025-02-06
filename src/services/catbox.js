import axios from "axios";
import FormData from "form-data";
import { FileSize, MaxFileSize, MimeType } from "./../utils/helper.js";

export async function CatBoxUploader(buffer) {
  if(!Buffer.isBuffer(buffer)) throw Error('Invalid buffer input!');
  if((await FileSize(buffer)) >= MaxFileSize(200)) throw Error('Max size upload for CatBoxCDN is only 200MB!');
  
  const mime = await MimeType(buffer);
  const form = new FormData();
  form.append("fileToUpload", Buffer.from(buffer), {
    filename: "zxn-" + Date.now() + "." + mime.ext,
    contentType: mime.mime
  });
  form.append("userhash", "");
  form.append("reqtype", "fileupload")
  const raw = await axios.post("https://catbox.moe/user/api.php", form, {
    headers: {
      ...form.getHeaders(),
      'origin': 'https://litterbox.catbox.moe',
      'user-agent': 'Postify/1.0.0'
    }
  });
  
  return raw?.data || null;
}