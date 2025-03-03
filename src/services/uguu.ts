import axios from "axios";
import FormData from "form-data";
import { FileSize, MaxFileSize, MimeType } from "./../utils/helper";

export async function Uguu(data: Uint8Array) {
  if(!Buffer.isBuffer(data)) throw new Error("Invalid buffer input!");
  if(FileSize(data) >= MaxFileSize(100)) throw new Error("Max file upload for catbox is only 100MB!");
  
  const type = await MimeType(data);
  const form = new FormData();
  form.append("files[]", Buffer.from(data), {
    filename: type ? "uguu-" + Date.now() + "." + type.ext : "",
    contentType: type?.mime || ""
  });
  const raw = await axios.post("https://uguu.se/upload", form, {
    headers: {
      ...form.getHeaders(),
      'origin': 'https://uguu.se',
      'user-agent': 'UguuUploader/1.0.0'
    }
  });
  return raw?.data || null;
}

export default Uguu;