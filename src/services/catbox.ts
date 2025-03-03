import axios from "axios";
import FormData from "form-data";
import { FileSize, MaxFileSize, MimeType } from "./../utils/helper";

export async function Catbox(data: Uint8Array) {
  if(!Buffer.isBuffer(data)) throw new Error("Invalid buffer input!");
  if(FileSize(data) >= MaxFileSize(200)) throw new Error("Max file upload for catbox is only 200MB!");
  
  const type = await MimeType(data);
  const form = new FormData();
  form.append("fileToUpload", Buffer.from(data), {
    filename: "zxn-" + Date.now() + "." + type?.ext,
    contentType: type?.mime || ""
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

export default Catbox;