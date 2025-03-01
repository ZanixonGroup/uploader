import axios from "axios";
import FormData from "form-data";
import { FileSize, MaxFileSize, MimeType } from "./../utils/helper.js";

export async function PomfUploader(buffer) {
  if(!Buffer.isBuffer(buffer)) throw Error('Invalid buffer input!');
  if((await FileSize(buffer)) >= MaxFileSize(1000)) throw Error('Max size upload for PomfCDN is only 1GiB!');
  
  const mime = await MimeType(buffer);
  const form = new FormData();
  form.append("files[]", Buffer.from(buffer), {
    filename: "zxn-" + Date.now() + "." + mime.ext,
    contentType: mime.mime
  });
  const raw = await axios.post("https://pomf.lain.la/upload.php", form, {
    headers: {
      ...form.getHeaders(),
      'origin': 'https://pomf.lain.la',
      'user-agent': 'Postify/1.0.0'
    }
  });
  
  return raw?.data?.files[0]?.url || null;
}