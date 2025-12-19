import axios from "axios";
import FormData from "form-data";
import { FileSize, MaxFileSize, MimeType } from "./../utils/helper";

export async function Picsur(data: Uint8Array) {
  if(!Buffer.isBuffer(data)) throw new Error("Invalid buffer input!");
  if(FileSize(data) >= MaxFileSize(256)) throw new Error("Max file upload for catbox is only 256MB!");
  
  const mime = await MimeType(data);
  const form = new FormData();
  form.append("image", Buffer.from(data), {
    filename: mime ? "zxn-" + Date.now() + "." + mime?.ext : "",
    contentType: mime?.mime || ""
  });
  const raw = await axios.post("https://picsur.org/api/image/upload", form, {
    headers: {
      ...form.getHeaders(),
      'origin': 'https://picsur.org',
      'user-agent': 'Postify/1.0.0'
    }
  });
  
  if(!raw?.data?.success) throw new Error(raw.data)
  return ("https://picsur.org/i/" + raw?.data?.data?.id + "." + mime?.ext) || null;
}

export default Picsur;