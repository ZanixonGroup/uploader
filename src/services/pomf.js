import axios from "axios";
import FormData from "form-data";
import { FileSize, MimeType } from "./../utils/helper.js";

export async function PomfUploader(buffer) {
  if(!Buffer.isBuffer(buffer)) throw Error('Invalid buffer input!');
  if((await FileSize(buffer)) >= 1024576000) throw Error('Max size upload for RyzenCDN is only 1GiB!');
  
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