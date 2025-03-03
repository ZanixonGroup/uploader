import axios from "axios";
import FormData from "form-data";
import { FileSize, MaxFileSize, MimeType } from "./../utils/helper";

export async function Litterbox(data: Uint8Array) {
  if(!Buffer.isBuffer(data)) throw new Error("Invalid buffer input!");
  if(FileSize(data) >= MaxFileSize(1000)) throw new Error("Max file upload for Litterbox is only 1GB!");
  
  const type = await MimeType(data);
  const form = new FormData();
  form.append("fileToUpload", Buffer.from(data), {
    filename: type ? "zxn-" + Date.now() + "." + type?.ext : "",
    contentType: type?.mime || ""
  });
  form.append("userhash", "");
  form.append("reqtype", "fileupload")
  const raw = await axios.post("https://litterbox.catbox.moe/resources/internals/api.php", form, {
    headers: {
      ...form.getHeaders(),
      'origin': 'https://litterbox.Litterbox.moe',
      'user-agent': 'Postify/1.0.0'
    }
  });
  return raw?.data || null;
}

export default Litterbox;